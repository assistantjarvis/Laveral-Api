const OpenAI = require('openai');

class LLMService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        
        if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
            console.log('   ⚠️  OpenAI API key not configured, using mock optimization');
            this.useMock = true;
        } else {
            this.openai = new OpenAI({ apiKey: this.apiKey });
            this.useMock = false;
        }
    }

    async optimizeArticle(originalArticle, referenceArticles) {
        if (this.useMock) {
            return this.mockOptimization(originalArticle, referenceArticles);
        }

        try {
            const prompt = this.buildPrompt(originalArticle, referenceArticles);
            
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert content writer and SEO specialist. Your task is to rewrite articles to match the style, formatting, and quality of top-ranking content while maintaining the original message.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            });

            return response.choices[0].message.content;

        } catch (error) {
            console.error('   Error calling OpenAI API:', error.message);
            console.log('   Falling back to mock optimization...');
            return this.mockOptimization(originalArticle, referenceArticles);
        }
    }

    buildPrompt(originalArticle, referenceArticles) {
        let prompt = `I need you to rewrite and optimize the following article to match the style and quality of top-ranking articles on Google.\n\n`;
        
        prompt += `ORIGINAL ARTICLE:\n`;
        prompt += `Title: ${originalArticle.title}\n`;
        prompt += `Content: ${originalArticle.content}\n\n`;
        
        prompt += `TOP-RANKING REFERENCE ARTICLES:\n\n`;
        
        referenceArticles.forEach((article, index) => {
            prompt += `Reference ${index + 1}:\n`;
            prompt += `Title: ${article.title}\n`;
            prompt += `Content: ${article.content.substring(0, 1000)}...\n\n`;
        });
        
        prompt += `INSTRUCTIONS:\n`;
        prompt += `1. Analyze the formatting, structure, and writing style of the reference articles\n`;
        prompt += `2. Rewrite the original article to match that style and quality\n`;
        prompt += `3. Maintain the core message and key points of the original article\n`;
        prompt += `4. Improve readability, SEO optimization, and engagement\n`;
        prompt += `5. Use proper headings, subheadings, and formatting\n`;
        prompt += `6. Make it comprehensive and valuable to readers\n`;
        prompt += `7. Return ONLY the optimized article content, no explanations\n\n`;
        prompt += `OPTIMIZED ARTICLE:`;
        
        return prompt;
    }

    mockOptimization(originalArticle, referenceArticles) {
        // Create a mock optimized version for demonstration
        let optimized = `# ${originalArticle.title}\n\n`;
        
        optimized += `## Introduction\n\n`;
        optimized += `${originalArticle.content.substring(0, 200)}...\n\n`;
        
        optimized += `## Key Insights\n\n`;
        optimized += `Based on analysis of top-ranking articles, here are the key insights:\n\n`;
        
        optimized += `### Understanding the Fundamentals\n\n`;
        optimized += `${originalArticle.content.substring(200, 400)}...\n\n`;
        
        optimized += `### Best Practices\n\n`;
        optimized += `Following industry best practices, we recommend:\n`;
        optimized += `- Focus on quality content\n`;
        optimized += `- Optimize for user experience\n`;
        optimized += `- Follow SEO guidelines\n\n`;
        
        optimized += `## Conclusion\n\n`;
        optimized += `This article has been optimized based on top-ranking content to provide maximum value to readers.\n\n`;
        
        optimized += `---\n\n`;
        optimized += `*Note: This article was automatically optimized using AI to match the style and quality of top-ranking content.*`;
        
        return optimized;
    }
}

module.exports = LLMService;
