# NodeJS Article Optimizer

This script automatically optimizes articles by:
1. Fetching the latest article from Laravel API
2. Searching Google for the article title
3. Scraping top-ranking blog articles
4. Using LLM to optimize the content
5. Publishing the updated article back to the API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
copy .env.example .env
```

3. Edit `.env` with your API keys:
- `LARAVEL_API_URL`: Your Laravel API endpoint
- `OPENAI_API_KEY`: OpenAI API key for GPT-4
- `GOOGLE_API_KEY`: Google Custom Search API key
- `GOOGLE_CSE_ID`: Google Custom Search Engine ID

## Usage

Run the script:
```bash
npm start
```

Or with auto-reload during development:
```bash
npm run dev
```

## Features

- ✅ Google Custom Search integration
- ✅ Intelligent web scraping with Puppeteer
- ✅ LLM-powered content optimization
- ✅ Automatic citation generation
- ✅ Fallback mechanisms for missing API keys
- ✅ Error handling and logging

## Architecture

```
index.js
  └─ ArticleOptimizer.js
      ├─ GoogleSearchService.js
      ├─ WebScraperService.js
      ├─ LLMService.js
      └─ LaravelAPIService.js
```

## Notes

- The script includes fallback mechanisms if API keys are not configured
- Mock data is used for demonstration when APIs are unavailable
- Scraping respects robots.txt and includes delays to avoid rate limiting
