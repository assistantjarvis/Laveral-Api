# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    React Frontend (Port 3000)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Article Grid │  │ Filter Chips │  │ Detail Modal │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API LAYER                          │
│                   Laravel API (Port 8000)                       │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              ArticleController                        │      │
│  │  • index()   • show()    • store()                   │      │
│  │  • update()  • destroy() • latest()                  │      │
│  └──────────────────────────────────────────────────────┘      │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────┐       │
│  │              Article Model (Eloquent)                │       │
│  │  • Fillable fields  • Casts  • Relationships        │       │
│  └──────────────────────────────────────────────────────┘      │
└────────────────────────────┬────────────────────────────────────┘
                             │ MySQL Connection
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                             │
│                    MySQL Database                               │
│  ┌──────────────────────────────────────────────────────┐      │
│  │                  articles Table                       │      │
│  │  • id (PK)           • title                         │      │
│  │  • content           • url                           │      │
│  │  • author            • published_at                  │      │
│  │  • is_updated        • citations (JSON)              │      │
│  │  • created_at        • updated_at                    │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                             ▲
                             │ Read/Write Operations
                             │
┌─────────────────────────────────────────────────────────────────┐
│                   AUTOMATION LAYER                              │
│              NodeJS Optimization Script                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │            ArticleOptimizer (Main)                    │      │
│  └──────────────────────────────────────────────────────┘      │
│         │            │            │            │                │
│         ▼            ▼            ▼            ▼                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Laravel  │ │  Google  │ │   Web    │ │   LLM    │          │
│  │   API    │ │  Search  │ │ Scraper  │ │ Service  │          │
│  │ Service  │ │ Service  │ │ Service  │ │ (OpenAI) │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│       │            │            │            │                  │
│       ▼            ▼            ▼            ▼                  │
│  Laravel API   Google API   Puppeteer    OpenAI API            │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Phase 1: Article Storage (Laravel CRUD)

```
1. Web Scraper → BeyondChats Blog
2. Extract Articles → Parse HTML
3. Store in Database → MySQL
4. Expose via API → REST Endpoints
```

### Phase 2: Article Optimization (NodeJS Automation)

```
1. Fetch Latest Article
   └─→ GET /api/articles/latest

2. Google Search
   └─→ Search article title
   └─→ Filter blog/article results

3. Web Scraping
   └─→ Scrape top 2 results
   └─→ Extract main content

4. LLM Optimization
   └─→ Send to OpenAI GPT-4
   └─→ Generate optimized content
   └─→ Match style of top-ranking articles

5. Update Article
   └─→ PUT /api/articles/{id}
   └─→ Add citations
   └─→ Set is_updated = true
```

### Phase 3: Display Articles (React Frontend)

```
1. Component Mount
   └─→ GET /api/articles

2. Display Grid
   └─→ Map articles to cards
   └─→ Show AI-optimized badges

3. User Interaction
   └─→ Click article
   └─→ Open detail modal
   └─→ Display citations
```

## Component Breakdown

### Laravel Backend

**Files**:
- `app/Models/Article.php` - Eloquent model
- `app/Http/Controllers/ArticleController.php` - API controller
- `database/migrations/..._create_articles_table.php` - Schema
- `database/seeders/ArticleSeeder.php` - Data seeder
- `routes/api.php` - API routes

**Responsibilities**:
- CRUD operations
- Data validation
- Database management
- API responses

### NodeJS Script

**Files**:
- `src/index.js` - Entry point
- `src/ArticleOptimizer.js` - Main orchestrator
- `src/services/LaravelAPIService.js` - API client
- `src/services/GoogleSearchService.js` - Search integration
- `src/services/WebScraperService.js` - Content extraction
- `src/services/LLMService.js` - AI optimization

**Responsibilities**:
- Fetch articles from API
- Search Google
- Scrape web content
- Optimize with AI
- Update articles

### React Frontend

**Files**:
- `src/App.js` - Main component
- `src/components/Header.js` - Navigation
- `src/components/ArticleCard.js` - Article preview
- `src/components/ArticleDetail.js` - Full article view
- `src/services/api.js` - API client
- `src/styles/*.css` - Styling

**Responsibilities**:
- Display articles
- Filter and search
- User interactions
- Responsive design

## Technology Stack

### Backend
- **Framework**: Laravel 10
- **Language**: PHP 8.1+
- **Database**: MySQL 8.0+
- **HTTP Client**: Guzzle

### Automation
- **Runtime**: Node.js 18+
- **Web Scraping**: Puppeteer + Cheerio
- **HTTP Client**: Axios
- **AI**: OpenAI GPT-4
- **Search**: Google Custom Search API

### Frontend
- **Framework**: React 18
- **HTTP Client**: Axios
- **Styling**: CSS3 (Custom Properties, Grid, Flexbox)
- **Fonts**: Google Fonts (Inter)

## Security Considerations

1. **API Security**
   - Input validation
   - SQL injection prevention (Eloquent ORM)
   - CORS configuration

2. **Environment Variables**
   - API keys stored in .env
   - Never committed to repository

3. **Data Sanitization**
   - HTML escaping
   - XSS prevention
   - JSON validation

## Scalability

### Current Limitations
- Single server architecture
- Synchronous processing
- No caching layer

### Future Improvements
- Queue system for article processing
- Redis caching
- Load balancing
- CDN for frontend
- Database replication

## Performance Optimizations

1. **Database**
   - Indexed columns (created_at, is_updated)
   - Efficient queries

2. **Frontend**
   - Code splitting
   - Lazy loading
   - Optimized images
   - CSS minification

3. **API**
   - Response caching
   - Pagination support
   - Gzip compression
