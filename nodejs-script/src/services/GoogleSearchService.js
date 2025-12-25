const axios = require('axios');

class GoogleSearchService {
    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY;
        this.cseId = process.env.GOOGLE_CSE_ID;
        this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
    }

    async search(query, numResults = 10) {
        try {
            // If API credentials are not configured, use fallback method
            if (!this.apiKey || !this.cseId || 
                this.apiKey === 'your_google_api_key_here' ||
                this.cseId === 'your_custom_search_engine_id_here') {
                console.log('   ⚠️  Google API not configured, using fallback search simulation');
                return this.fallbackSearch(query);
            }

            const response = await axios.get(this.baseUrl, {
                params: {
                    key: this.apiKey,
                    cx: this.cseId,
                    q: query,
                    num: numResults
                }
            });

            return response.data.items.map(item => ({
                title: item.title,
                link: item.link,
                snippet: item.snippet
            }));

        } catch (error) {
            console.error('   Error searching Google:', error.message);
            console.log('   Using fallback search...');
            return this.fallbackSearch(query);
        }
    }

    // Fallback method when Google API is not configured
    fallbackSearch(query) {
        // Return simulated search results for demonstration
        return [
            {
                title: `${query} - Complete Guide`,
                link: 'https://example-blog1.com/article',
                snippet: 'A comprehensive guide about ' + query
            },
            {
                title: `Understanding ${query}`,
                link: 'https://example-blog2.com/post',
                snippet: 'Everything you need to know about ' + query
            },
            {
                title: `${query} Best Practices`,
                link: 'https://medium.com/article-about-topic',
                snippet: 'Best practices and tips for ' + query
            }
        ];
    }
}

module.exports = GoogleSearchService;
