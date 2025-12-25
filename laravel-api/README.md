# Laravel Article API

RESTful API for managing articles with CRUD operations.

## Features

- ✅ Article CRUD operations
- ✅ Web scraping from BeyondChats blog
- ✅ MySQL database storage
- ✅ RESTful API endpoints
- ✅ CORS enabled for frontend
- ✅ JSON responses

## Setup

### 1. Install Dependencies

```bash
cd laravel-api
composer install
```

### 2. Environment Configuration

```bash
copy .env.example .env
```

Edit `.env`:
```env
APP_NAME="BeyondChats Article API"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=beyondchats_articles
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Create Database

Create a MySQL database named `beyondchats_articles`:

```sql
CREATE DATABASE beyondchats_articles;
```

### 5. Run Migrations

```bash
php artisan migrate
```

### 6. Seed Articles

This will scrape articles from BeyondChats and store them:

```bash
php artisan db:seed --class=ArticleSeeder
```

### 7. Start Server

```bash
php artisan serve
```

API available at: `http://localhost:8000`

## API Endpoints

### Get All Articles
```
GET /api/articles
```

### Get Latest Article
```
GET /api/articles/latest
```

### Get Single Article
```
GET /api/articles/{id}
```

### Create Article
```
POST /api/articles
Content-Type: application/json

{
    "title": "Article Title",
    "content": "Article content...",
    "url": "https://example.com/article",
    "author": "Author Name",
    "published_at": "2024-12-25"
}
```

### Update Article
```
PUT /api/articles/{id}
Content-Type: application/json

{
    "content": "Updated content...",
    "is_updated": true,
    "citations": "[...]"
}
```

### Delete Article
```
DELETE /api/articles/{id}
```

## Database Schema

### Articles Table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| title | varchar(500) | Article title |
| content | text | Article content |
| url | varchar(1000) | Source URL |
| author | varchar(255) | Author name |
| published_at | timestamp | Publication date |
| is_updated | boolean | AI-optimized flag |
| citations | json | Reference articles |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Updated timestamp |

## Testing

```bash
php artisan test
```

## Project Structure

```
laravel-api/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── ArticleController.php
│   └── Models/
│       └── Article.php
├── database/
│   ├── migrations/
│   │   └── create_articles_table.php
│   └── seeders/
│       └── ArticleSeeder.php
├── routes/
│   └── api.php
└── .env
```
