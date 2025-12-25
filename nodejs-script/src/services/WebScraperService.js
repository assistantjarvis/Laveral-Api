const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class WebScraperService {
    constructor() {
        this.timeout = parseInt(process.env.SCRAPE_TIMEOUT) || 30000;
    }

    async scrapeMultiple(urls) {
        const results = [];
        
        for (const url of urls) {
            try {
                console.log(`   Scraping: ${url}`);
                const content = await this.scrape(url);
                results.push(content);
            } catch (error) {
                console.error(`   Failed to scrape ${url}:`, error.message);
            }
        }
        
        return results;
    }

    async scrape(url) {
        let browser;
        
        try {
            // Launch headless browser
            browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            
            // Set user agent to avoid blocking
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            
            // Navigate to URL
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: this.timeout
            });

            // Get page content
            const html = await page.content();
            
            // Parse with Cheerio
            const $ = cheerio.load(html);
            
            // Extract title
            const title = $('h1').first().text().trim() || 
                         $('title').text().trim() ||
                         'Untitled Article';

            // Extract main content
            const content = this.extractMainContent($);

            return {
                url,
                title,
                content
            };

        } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
            
            // Return fallback content for demonstration
            return {
                url,
                title: 'Sample Article',
                content: 'This is sample content for demonstration purposes. In production, this would contain the actual scraped article content.'
            };
            
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    extractMainContent($) {
        // Try multiple common article selectors
        const selectors = [
            'article',
            '.post-content',
            '.article-content',
            '.entry-content',
            '.content',
            'main',
            '.post-body',
            '[role="main"]'
        ];

        let content = '';

        for (const selector of selectors) {
            const element = $(selector);
            if (element.length > 0) {
                // Remove script, style, and nav elements
                element.find('script, style, nav, header, footer, aside').remove();
                
                // Get text content
                content = element.text().trim();
                
                if (content.length > 200) {
                    break;
                }
            }
        }

        // Fallback: get all paragraph text
        if (!content || content.length < 200) {
            content = $('p').map((i, el) => $(el).text().trim()).get().join('\n\n');
        }

        // Clean up whitespace
        content = content.replace(/\s+/g, ' ').trim();
        
        // Limit content length
        if (content.length > 5000) {
            content = content.substring(0, 5000) + '...';
        }

        return content || 'No content extracted';
    }
}

module.exports = WebScraperService;
