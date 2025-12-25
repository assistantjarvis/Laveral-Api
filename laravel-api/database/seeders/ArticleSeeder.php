<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "🌐 Scraping articles from BeyondChats blog...\n";
        
        try {
            // Scrape articles from BeyondChats
            $articles = $this->scrapeBeyondChatsArticles();
            
            if (empty($articles)) {
                echo "⚠️  No articles scraped. Adding sample data...\n";
                $this->seedSampleArticles();
                return;
            }
            
            // Save articles to database
            foreach ($articles as $articleData) {
                Article::create($articleData);
                echo "✅ Saved: {$articleData['title']}\n";
            }
            
            echo "\n✨ Successfully seeded " . count($articles) . " articles!\n";
            
        } catch (\Exception $e) {
            echo "❌ Error scraping articles: {$e->getMessage()}\n";
            echo "Adding sample data instead...\n";
            $this->seedSampleArticles();
        }
    }

    /**
     * Scrape articles from BeyondChats blog
     */
    private function scrapeBeyondChatsArticles(): array
    {
        $articles = [];
        
        try {
            // Fetch the blogs page
            $response = Http::timeout(30)->get('https://beyondchats.com/blogs/');
            
            if (!$response->successful()) {
                throw new \Exception('Failed to fetch BeyondChats blog page');
            }
            
            $html = $response->body();
            
            // Parse HTML using DOMDocument
            libxml_use_internal_errors(true);
            $dom = new \DOMDocument();
            $dom->loadHTML($html);
            libxml_clear_errors();
            
            $xpath = new \DOMXPath($dom);
            
            // Find article elements (adjust selectors based on actual HTML structure)
            // This is a generic approach - may need adjustment
            $articleNodes = $xpath->query("//article | //div[contains(@class, 'post')] | //div[contains(@class, 'blog')]");
            
            $count = 0;
            $maxArticles = 5;
            
            foreach ($articleNodes as $node) {
                if ($count >= $maxArticles) break;
                
                // Extract title
                $titleNodes = $xpath->query(".//h1 | .//h2 | .//h3", $node);
                $title = $titleNodes->length > 0 ? trim($titleNodes->item(0)->textContent) : null;
                
                // Extract content/excerpt
                $contentNodes = $xpath->query(".//p", $node);
                $content = '';
                foreach ($contentNodes as $p) {
                    $content .= trim($p->textContent) . "\n\n";
                }
                
                // Extract link
                $linkNodes = $xpath->query(".//a[@href]", $node);
                $url = $linkNodes->length > 0 ? $linkNodes->item(0)->getAttribute('href') : null;
                
                if ($url && !str_starts_with($url, 'http')) {
                    $url = 'https://beyondchats.com' . $url;
                }
                
                if ($title && strlen($content) > 50) {
                    $articles[] = [
                        'title' => substr($title, 0, 500),
                        'content' => substr($content, 0, 5000),
                        'url' => $url,
                        'author' => 'BeyondChats',
                        'published_at' => now()->subDays($count),
                        'is_updated' => false,
                        'citations' => null,
                    ];
                    $count++;
                }
            }
            
        } catch (\Exception $e) {
            Log::error('Scraping error: ' . $e->getMessage());
            throw $e;
        }
        
        return $articles;
    }

    /**
     * Seed sample articles if scraping fails
     */
    private function seedSampleArticles(): void
    {
        $sampleArticles = [
            [
                'title' => 'The Future of AI-Powered Customer Support',
                'content' => "Artificial Intelligence is revolutionizing how businesses interact with their customers. In this comprehensive guide, we explore the latest trends in AI-powered customer support and how companies can leverage these technologies to improve customer satisfaction.\n\nAI chatbots have evolved significantly over the past few years. Modern chatbots can understand context, handle complex queries, and provide personalized responses. They're available 24/7, reducing response times and improving customer experience.\n\nKey benefits include:\n- Instant response times\n- Consistent service quality\n- Cost reduction\n- Scalability\n- Data-driven insights\n\nAs we move forward, the integration of AI in customer support will only deepen, creating more seamless and efficient customer experiences.",
                'url' => 'https://beyondchats.com/blogs/future-of-ai-customer-support',
                'author' => 'BeyondChats Team',
                'published_at' => now()->subDays(1),
                'is_updated' => false,
                'citations' => null,
            ],
            [
                'title' => 'Building Scalable Chat Solutions for Enterprise',
                'content' => "Enterprise chat solutions require careful planning and robust architecture. This article discusses best practices for building scalable chat systems that can handle millions of concurrent users.\n\nScalability challenges:\n1. Message delivery at scale\n2. Real-time synchronization\n3. Data persistence\n4. Load balancing\n5. Security and compliance\n\nWe recommend using microservices architecture, implementing proper caching strategies, and choosing the right database solutions. WebSocket connections should be managed efficiently, and horizontal scaling should be planned from the start.\n\nSecurity is paramount in enterprise environments. Implement end-to-end encryption, proper authentication mechanisms, and regular security audits.",
                'url' => 'https://beyondchats.com/blogs/scalable-chat-solutions',
                'author' => 'BeyondChats Engineering',
                'published_at' => now()->subDays(3),
                'is_updated' => false,
                'citations' => null,
            ],
            [
                'title' => 'Integrating LLMs into Your Customer Service Workflow',
                'content' => "Large Language Models (LLMs) are transforming customer service. Learn how to effectively integrate LLMs into your existing workflows for maximum impact.\n\nLLMs like GPT-4 can understand complex customer queries, provide detailed responses, and even handle multi-turn conversations. However, successful integration requires careful planning.\n\nImplementation steps:\n1. Define clear use cases\n2. Prepare training data\n3. Set up proper guardrails\n4. Implement monitoring systems\n5. Establish feedback loops\n\nIt's crucial to maintain human oversight, especially for sensitive or complex issues. LLMs should augment human agents, not replace them entirely.\n\nMeasure success through metrics like response accuracy, customer satisfaction scores, and resolution times.",
                'url' => 'https://beyondchats.com/blogs/integrating-llms',
                'author' => 'BeyondChats Research',
                'published_at' => now()->subDays(5),
                'is_updated' => false,
                'citations' => null,
            ],
            [
                'title' => 'Best Practices for Chat UI/UX Design',
                'content' => "Great chat experiences start with thoughtful UI/UX design. This guide covers essential principles for creating intuitive and engaging chat interfaces.\n\nKey design principles:\n- Keep it simple and clean\n- Provide clear visual feedback\n- Support both text and rich media\n- Implement smart suggestions\n- Ensure mobile responsiveness\n\nUser experience considerations:\n1. Message threading and organization\n2. Search functionality\n3. File sharing capabilities\n4. Notification management\n5. Accessibility features\n\nTesting is crucial. Conduct user testing sessions, gather feedback, and iterate on your design. Pay attention to loading states, error messages, and edge cases.\n\nRemember that chat UI should feel natural and conversational while remaining professional and efficient.",
                'url' => 'https://beyondchats.com/blogs/chat-ui-ux-design',
                'author' => 'BeyondChats Design Team',
                'published_at' => now()->subDays(7),
                'is_updated' => false,
                'citations' => null,
            ],
            [
                'title' => 'The ROI of Implementing AI Chatbots',
                'content' => "Investing in AI chatbots can deliver significant returns. This analysis breaks down the costs, benefits, and ROI of implementing chatbot solutions.\n\nCost factors:\n- Initial development and setup\n- Integration with existing systems\n- Training and maintenance\n- Ongoing improvements\n\nBenefit analysis:\n1. Reduced support costs (up to 30%)\n2. Increased customer satisfaction\n3. 24/7 availability\n4. Faster response times\n5. Better data collection and insights\n\nCase studies show that companies typically see positive ROI within 6-12 months of implementation. The key is to start with clear objectives and measure progress consistently.\n\nCalculate your potential ROI by considering current support costs, expected efficiency gains, and projected customer satisfaction improvements.",
                'url' => 'https://beyondchats.com/blogs/chatbot-roi',
                'author' => 'BeyondChats Business Team',
                'published_at' => now()->subDays(10),
                'is_updated' => false,
                'citations' => null,
            ],
        ];

        foreach ($sampleArticles as $articleData) {
            Article::create($articleData);
            echo "✅ Saved: {$articleData['title']}\n";
        }

        echo "\n✨ Successfully seeded " . count($sampleArticles) . " sample articles!\n";
    }
}
