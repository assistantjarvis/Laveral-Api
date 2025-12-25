# Quick Start Guide

This guide will help you get the entire BeyondChats Article Management System up and running.

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** (PHP package manager)
- **MySQL** >= 8.0
- **Node.js** >= 18.x
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd assignment
```

### 2. Set Up Laravel Backend

```bash
# Navigate to Laravel directory
cd laravel-api

# Install PHP dependencies
composer install

# Create environment file
copy .env.example .env

# Edit .env and configure your database
# DB_DATABASE=beyondchats_articles
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Generate application key
php artisan key:generate

# Create database
mysql -u root -p
CREATE DATABASE beyondchats_articles;
exit;

# Run migrations
php artisan migrate

# Seed articles from BeyondChats
php artisan db:seed --class=ArticleSeeder

# Start Laravel server
php artisan serve
```

Laravel API will be running at: `http://localhost:8000`

### 3. Set Up NodeJS Script

```bash
# Open a new terminal
cd nodejs-script

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env and add your API keys (optional for demo)
# LARAVEL_API_URL=http://localhost:8000/api
# OPENAI_API_KEY=your_key_here
# GOOGLE_API_KEY=your_key_here
# GOOGLE_CSE_ID=your_cse_id_here

# Note: The script works with fallback data if API keys are not configured

# Run the script (make sure Laravel is running first)
npm start
```

### 4. Set Up React Frontend

```bash
# Open another new terminal
cd react-frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# The default configuration should work
# REACT_APP_API_URL=http://localhost:8000/api

# Start React development server
npm start
```

React app will open automatically at: `http://localhost:3000`

## Verification

1. **Laravel API**: Visit `http://localhost:8000/api/health` - should return JSON with status "ok"
2. **React Frontend**: Visit `http://localhost:3000` - should display articles
3. **NodeJS Script**: Check terminal output for successful article optimization

## Common Issues

### Laravel Issues

**Issue**: Database connection error
**Solution**: Check your `.env` file has correct database credentials

**Issue**: Class not found errors
**Solution**: Run `composer dump-autoload`

**Issue**: Migration errors
**Solution**: Drop database and recreate: `php artisan migrate:fresh --seed`

### NodeJS Issues

**Issue**: Cannot connect to Laravel API
**Solution**: Make sure Laravel server is running on port 8000

**Issue**: Puppeteer installation fails
**Solution**: Run `npm install puppeteer --unsafe-perm=true`

### React Issues

**Issue**: Cannot fetch articles
**Solution**: Check that Laravel API is running and CORS is enabled

**Issue**: Blank page
**Solution**: Check browser console for errors, ensure all dependencies are installed

## Testing the Full Workflow

1. **Check Articles**: Open React frontend and verify articles are displayed
2. **Run Optimization**: Execute NodeJS script to optimize latest article
3. **View Updated Article**: Refresh React frontend and look for AI-Optimized badge
4. **Check Citations**: Click on optimized article to see references

## API Endpoints Quick Reference

- `GET /api/articles` - Get all articles
- `GET /api/articles/latest` - Get latest article
- `GET /api/articles/{id}` - Get specific article
- `POST /api/articles` - Create article
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

## Next Steps

- Configure API keys for Google Search and OpenAI for full functionality
- Deploy to production (see DEPLOYMENT.md)
- Customize the UI theme
- Add more features

## Support

If you encounter any issues:
1. Check the logs in each component
2. Verify all services are running
3. Review the README files in each directory
4. Contact: support@beyondchats.com
