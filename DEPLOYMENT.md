# Deployment Guide

This guide covers deploying the BeyondChats Article Management System to production.

## Deployment Options

### Option 1: Traditional VPS (Recommended for Learning)

**Requirements**:
- Ubuntu 20.04+ server
- Root or sudo access
- Domain name (optional)

**Steps**:

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.1
sudo apt install php8.1 php8.1-fpm php8.1-mysql php8.1-xml php8.1-mbstring php8.1-curl -y

# Install MySQL
sudo apt install mysql-server -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Nginx
sudo apt install nginx -y
```

2. **Deploy Laravel**
```bash
# Clone repository
cd /var/www
git clone <your-repo-url> beyondchats

# Setup Laravel
cd beyondchats/laravel-api
composer install --optimize-autoloader --no-dev
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan db:seed --class=ArticleSeeder

# Set permissions
sudo chown -R www-data:www-data /var/www/beyondchats
sudo chmod -R 755 /var/www/beyondchats
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/beyondchats/laravel-api/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

4. **Deploy React Frontend**
```bash
cd /var/www/beyondchats/react-frontend
npm install
npm run build

# Configure Nginx for React
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/beyondchats/react-frontend/build;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 2: Modern Cloud Deployment

#### Laravel API - Railway/Heroku

1. **Create railway.json**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "php artisan serve --host=0.0.0.0 --port=$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Deploy**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### React Frontend - Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd react-frontend
vercel --prod
```

3. **Configure Environment**
- Add `REACT_APP_API_URL` in Vercel dashboard
- Point to your Railway API URL

#### NodeJS Script - Cron Job/Cloud Function

**Option A: Server Cron**
```bash
# Add to crontab
0 */6 * * * cd /path/to/nodejs-script && npm start
```

**Option B: GitHub Actions**
```yaml
name: Optimize Articles
on:
  schedule:
    - cron: '0 */6 * * *'
jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd nodejs-script && npm install && npm start
```

## Environment Variables

### Laravel (.env)
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=production_db
DB_USERNAME=db_user
DB_PASSWORD=secure_password
```

### React (.env.production)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### NodeJS (.env)
```env
LARAVEL_API_URL=https://api.yourdomain.com/api
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIza...
GOOGLE_CSE_ID=...
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Database Backup

```bash
# Create backup script
#!/bin/bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

## Monitoring

### Laravel Logs
```bash
tail -f /var/www/beyondchats/laravel-api/storage/logs/laravel.log
```

### Nginx Logs
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Performance Optimization

1. **Enable OPcache**
```ini
; /etc/php/8.1/fpm/php.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
```

2. **Enable Gzip**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

3. **Cache Laravel Config**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS
- [ ] Configure firewall (UFW)
- [ ] Disable directory listing
- [ ] Set up fail2ban
- [ ] Regular security updates
- [ ] Database backups
- [ ] Rate limiting on API
- [ ] CORS properly configured

## Troubleshooting

**500 Error on Laravel**
- Check storage permissions: `sudo chmod -R 775 storage bootstrap/cache`
- Check logs: `tail -f storage/logs/laravel.log`

**React Not Loading**
- Check API URL in environment
- Verify CORS headers
- Check browser console

**Database Connection Failed**
- Verify credentials in .env
- Check MySQL is running: `sudo systemctl status mysql`
- Test connection: `mysql -u username -p`

## Cost Estimation

### Free Tier Options
- **Railway**: Free tier available
- **Vercel**: Free for personal projects
- **PlanetScale**: Free MySQL database
- **Total**: $0/month for small projects

### Production Setup
- **VPS (DigitalOcean)**: $6-12/month
- **Database**: $15/month
- **Domain**: $12/year
- **Total**: ~$25-30/month

## Live Demo

Once deployed, your live links will be:
- **Frontend**: https://yourdomain.com
- **API**: https://api.yourdomain.com/api
- **Health Check**: https://api.yourdomain.com/api/health
