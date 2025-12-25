# Installing Composer on Windows

## Method 1: Download Installer (Easiest)

1. **Download Composer Installer**
   - Visit: https://getcomposer.org/Composer-Setup.exe
   - Run the installer
   - Follow the setup wizard
   - It will automatically detect PHP and add Composer to PATH

2. **Verify Installation**
   ```bash
   composer --version
   ```

## Method 2: Manual Installation

1. **Download composer.phar**
   ```bash
   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php composer-setup.php
   php -r "unlink('composer-setup.php');"
   ```

2. **Move to global location**
   ```bash
   move composer.phar C:\composer.phar
   ```

3. **Create batch file** (C:\composer.bat)
   ```batch
   @echo OFF
   php "C:\composer.phar" %*
   ```

## If You Don't Have PHP Installed

### Install PHP First

1. **Download PHP**
   - Visit: https://windows.php.net/download/
   - Download "VS16 x64 Thread Safe" ZIP
   - Extract to C:\php

2. **Add to PATH**
   - Search "Environment Variables" in Windows
   - Edit System PATH
   - Add: C:\php

3. **Verify**
   ```bash
   php --version
   ```

## Quick Alternative: Use XAMPP

XAMPP includes PHP, MySQL, and Apache:

1. Download from: https://www.apachefriends.org/
2. Install XAMPP
3. Add to PATH: C:\xampp\php
4. Then install Composer

## After Installing Composer

```bash
# Navigate to Laravel directory
cd laravel-api

# Install dependencies
composer install

# Continue with setup
copy .env.example .env
php artisan key:generate
```
