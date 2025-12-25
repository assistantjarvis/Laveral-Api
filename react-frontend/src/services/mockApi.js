// Mock API for demonstration without Laravel backend
// Use this temporarily if you don't have PHP/Composer installed

export const mockArticles = [
  {
    id: 1,
    title: "The Future of AI-Powered Customer Support",
    content: "Artificial Intelligence is revolutionizing how businesses interact with their customers. In this comprehensive guide, we explore the latest trends in AI-powered customer support and how companies can leverage these technologies to improve customer satisfaction.\n\nAI chatbots have evolved significantly over the past few years. Modern chatbots can understand context, handle complex queries, and provide personalized responses. They're available 24/7, reducing response times and improving customer experience.\n\nKey benefits include:\n- Instant response times\n- Consistent service quality\n- Cost reduction\n- Scalability\n- Data-driven insights\n\nAs we move forward, the integration of AI in customer support will only deepen, creating more seamless and efficient customer experiences.",
    author: "BeyondChats Team",
    published_at: "2024-12-24T10:00:00Z",
    created_at: "2024-12-24T10:00:00Z",
    is_updated: false,
    citations: null,
    url: "https://beyondchats.com/blogs/ai-customer-support"
  },
  {
    id: 2,
    title: "Building Scalable Chat Solutions for Enterprise",
    content: "Enterprise chat solutions require careful planning and robust architecture. This article discusses best practices for building scalable chat systems that can handle millions of concurrent users.\n\nScalability challenges:\n1. Message delivery at scale\n2. Real-time synchronization\n3. Data persistence\n4. Load balancing\n5. Security and compliance\n\nWe recommend using microservices architecture, implementing proper caching strategies, and choosing the right database solutions. WebSocket connections should be managed efficiently, and horizontal scaling should be planned from the start.\n\nSecurity is paramount in enterprise environments. Implement end-to-end encryption, proper authentication mechanisms, and regular security audits.",
    author: "BeyondChats Engineering",
    published_at: "2024-12-22T10:00:00Z",
    created_at: "2024-12-22T10:00:00Z",
    is_updated: true,
    citations: JSON.stringify([
      {
        title: "Chat Architecture Best Practices - Tech Blog",
        url: "https://techblog.example.com/chat-architecture",
        source: "techblog.example.com"
      },
      {
        title: "Scaling WebSocket Connections",
        url: "https://engineering.example.com/websockets",
        source: "engineering.example.com"
      }
    ]),
    url: "https://beyondchats.com/blogs/scalable-chat"
  },
  {
    id: 3,
    title: "Integrating LLMs into Your Customer Service Workflow",
    content: "Large Language Models (LLMs) are transforming customer service. Learn how to effectively integrate LLMs into your existing workflows for maximum impact.\n\nLLMs like GPT-4 can understand complex customer queries, provide detailed responses, and even handle multi-turn conversations. However, successful integration requires careful planning.\n\nImplementation steps:\n1. Define clear use cases\n2. Prepare training data\n3. Set up proper guardrails\n4. Implement monitoring systems\n5. Establish feedback loops\n\nIt's crucial to maintain human oversight, especially for sensitive or complex issues. LLMs should augment human agents, not replace them entirely.\n\nMeasure success through metrics like response accuracy, customer satisfaction scores, and resolution times.",
    author: "BeyondChats Research",
    published_at: "2024-12-20T10:00:00Z",
    created_at: "2024-12-20T10:00:00Z",
    is_updated: true,
    citations: JSON.stringify([
      {
        title: "LLM Integration Guide - AI Weekly",
        url: "https://aiweekly.example.com/llm-integration",
        source: "aiweekly.example.com"
      }
    ]),
    url: "https://beyondchats.com/blogs/integrating-llms"
  },
  {
    id: 4,
    title: "Best Practices for Chat UI/UX Design",
    content: "Great chat experiences start with thoughtful UI/UX design. This guide covers essential principles for creating intuitive and engaging chat interfaces.\n\nKey design principles:\n- Keep it simple and clean\n- Provide clear visual feedback\n- Support both text and rich media\n- Implement smart suggestions\n- Ensure mobile responsiveness\n\nUser experience considerations:\n1. Message threading and organization\n2. Search functionality\n3. File sharing capabilities\n4. Notification management\n5. Accessibility features\n\nTesting is crucial. Conduct user testing sessions, gather feedback, and iterate on your design. Pay attention to loading states, error messages, and edge cases.\n\nRemember that chat UI should feel natural and conversational while remaining professional and efficient.",
    author: "BeyondChats Design Team",
    published_at: "2024-12-18T10:00:00Z",
    created_at: "2024-12-18T10:00:00Z",
    is_updated: false,
    citations: null,
    url: "https://beyondchats.com/blogs/chat-ui-ux"
  },
  {
    id: 5,
    title: "The ROI of Implementing AI Chatbots",
    content: "Investing in AI chatbots can deliver significant returns. This analysis breaks down the costs, benefits, and ROI of implementing chatbot solutions.\n\nCost factors:\n- Initial development and setup\n- Integration with existing systems\n- Training and maintenance\n- Ongoing improvements\n\nBenefit analysis:\n1. Reduced support costs (up to 30%)\n2. Increased customer satisfaction\n3. 24/7 availability\n4. Faster response times\n5. Better data collection and insights\n\nCase studies show that companies typically see positive ROI within 6-12 months of implementation. The key is to start with clear objectives and measure progress consistently.\n\nCalculate your potential ROI by considering current support costs, expected efficiency gains, and projected customer satisfaction improvements.",
    author: "BeyondChats Business Team",
    published_at: "2024-12-15T10:00:00Z",
    created_at: "2024-12-15T10:00:00Z",
    is_updated: false,
    citations: null,
    url: "https://beyondchats.com/blogs/chatbot-roi"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchArticles = async () => {
  await delay(800); // Simulate network delay
  return mockArticles;
};

export const fetchArticle = async (id) => {
  await delay(500);
  const article = mockArticles.find(a => a.id === parseInt(id));
  if (!article) {
    throw new Error('Article not found');
  }
  return article;
};

export const createArticle = async (articleData) => {
  await delay(600);
  const newArticle = {
    id: mockArticles.length + 1,
    ...articleData,
    created_at: new Date().toISOString(),
    is_updated: false,
    citations: null
  };
  mockArticles.push(newArticle);
  return newArticle;
};

export const updateArticle = async (id, articleData) => {
  await delay(600);
  const index = mockArticles.findIndex(a => a.id === parseInt(id));
  if (index === -1) {
    throw new Error('Article not found');
  }
  mockArticles[index] = {
    ...mockArticles[index],
    ...articleData
  };
  return mockArticles[index];
};

export const deleteArticle = async (id) => {
  await delay(500);
  const index = mockArticles.findIndex(a => a.id === parseInt(id));
  if (index === -1) {
    throw new Error('Article not found');
  }
  mockArticles.splice(index, 1);
  return { success: true };
};

export default {
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle,
  deleteArticle
};
