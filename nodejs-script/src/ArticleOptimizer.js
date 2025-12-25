const axios = require('axios');
const GoogleSearchService = require('./services/GoogleSearchService');
const WebScraperService = require('./services/WebScraperService');
const LLMService = require('./services/LLMService');
const LaravelAPIService = require('./services/LaravelAPIService');

class ArticleOptimizer {
    constructor() {
        this.googleSearch = new GoogleSearchService();
        this.webScraper = new WebScraperService();
        this.llmService = new LLMService();
        this.laravelAPI = new LaravelAPIService();
    }

    async run() {
        try {
            // Step 1: Fetch latest article from Laravel API
            console.log('📥 Step 1: Fetching latest article from Laravel API...');
            const latestArticle = await this.laravelAPI.getLatestArticle();
            
            if (!latestArticle) {
                console.log('⚠️  No articles found in database. Please seed articles first.');
                return;
            }
            
            console.log(`   Found article: "${latestArticle.title}"`);
            console.log(`   Article ID: ${latestArticle.id}\n`);

            // Step 2: Search article title on Google
            console.log('🔍 Step 2: Searching Google for article title...');
            const searchResults = await this.googleSearch.search(latestArticle.title);
            console.log(`   Found ${searchResults.length} search results\n`);

            // Step 3: Filter and get first 2 blog/article links
            console.log('🎯 Step 3: Filtering blog/article results...');
            const blogLinks = this.filterBlogLinks(searchResults, 2);
            
            if (blogLinks.length === 0) {
                console.log('⚠️  No blog articles found in search results.');
                return;
            }
            
            console.log(`   Selected ${blogLinks.length} articles to analyze:`);
            blogLinks.forEach((link, index) => {
                console.log(`   ${index + 1}. ${link}`);
            });
            console.log('');

            // Step 4: Scrape content from the blog links
            console.log('📄 Step 4: Scraping content from selected articles...');
            const scrapedArticles = await this.webScraper.scrapeMultiple(blogLinks);
            console.log(`   Successfully scraped ${scrapedArticles.length} articles\n`);

            // Step 5: Use LLM to optimize the original article
            console.log('🤖 Step 5: Optimizing article using LLM...');
            const optimizedContent = await this.llmService.optimizeArticle(
                latestArticle,
                scrapedArticles
            );
            console.log('   Article optimization complete\n');

            // Step 6: Prepare citations
            const citations = scrapedArticles.map((article, index) => ({
                title: article.title || `Reference Article ${index + 1}`,
                url: article.url,
                source: new URL(article.url).hostname
            }));

            // Step 7: Update article in Laravel API
            console.log('💾 Step 6: Publishing optimized article...');
            const updatedArticle = await this.laravelAPI.updateArticle(
                latestArticle.id,
                {
                    content: optimizedContent,
                    is_updated: true,
                    citations: JSON.stringify(citations)
                }
            );
            
            console.log('   ✅ Article successfully updated!');
            console.log(`   Updated article ID: ${updatedArticle.id}`);
            console.log(`   Citations added: ${citations.length}`);

        } catch (error) {
            console.error('Error in optimization process:', error.message);
            throw error;
        }
    }

    filterBlogLinks(searchResults, limit = 2) {
        const blogKeywords = [
            'blog', 'article', 'post', 'news', 'medium.com', 
            'wordpress', 'blogger', 'substack', 'hashnode'
        ];
        
        const excludeKeywords = [
            'youtube.com', 'facebook.com', 'twitter.com', 
            'instagram.com', 'linkedin.com/posts', 'reddit.com'
        ];

        return searchResults
            .filter(result => {
                const url = result.link.toLowerCase();
                
                // Exclude social media and video platforms
                if (excludeKeywords.some(keyword => url.includes(keyword))) {
                    return false;
                }
                
                // Prefer blog/article URLs
                return blogKeywords.some(keyword => url.includes(keyword)) || 
                       result.title.toLowerCase().includes('blog') ||
                       result.title.toLowerCase().includes('article');
            })
            .slice(0, limit)
            .map(result => result.link);
    }
}

module.exports = ArticleOptimizer;
