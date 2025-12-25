# Quick Start Without Composer/PHP

If you don't have PHP/Composer installed, you can still demonstrate the project!

## Option A: Start with React Frontend (Works Now!)

The React frontend can work with mock data or a deployed API.

### 1. Install React Dependencies

```bash
cd react-frontend
npm install
```

### 2. Create Mock API (Temporary)

Create `react-frontend/src/services/mockApi.js`:

```javascript
// Mock data for demonstration
export const mockArticles = [
  {
    id: 1,
    title: "The Future of AI-Powered Customer Support",
    content: "Artificial Intelligence is revolutionizing how businesses interact with their customers...",
    author: "BeyondChats Team",
    published_at: "2024-12-24T10:00:00Z",
    is_updated: false,
    citations: null,
    url: "https://beyondchats.com/blogs/ai-customer-support"
  },
  {
    id: 2,
    title: "Building Scalable Chat Solutions",
    content: "Enterprise chat solutions require careful planning and robust architecture...",
    author: "BeyondChats Engineering",
    published_at: "2024-12-22T10:00:00Z",
    is_updated: true,
    citations: JSON.stringify([
      {
        title: "Chat Architecture Best Practices",
        url: "https://example.com/article1",
        source: "example.com"
      }
    ]),
    url: "https://beyondchats.com/blogs/scalable-chat"
  }
];

export const fetchArticles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockArticles), 500);
  });
};
```

### 3. Update App.js to use mock data

Change import in `src/App.js`:
```javascript
// Change this:
import { fetchArticles } from './services/api';

// To this (temporarily):
import { fetchArticles } from './services/mockApi';
```

### 4. Run React App

```bash
npm start
```

Visit: http://localhost:3000

## Option B: Use Online Laravel Playground

Deploy Laravel to a free service:

1. **Railway.app** (Free tier)
   - Sign up at railway.app
   - Deploy from GitHub
   - Get API URL

2. **Use the deployed API** in React
   - Update `.env` with Railway URL

## Option C: Install PHP/Composer (15 minutes)

### Quick Install with Chocolatey

If you have Chocolatey (Windows package manager):

```bash
# Install Chocolatey first (if needed)
# Run PowerShell as Administrator:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Then install PHP and Composer
choco install php composer -y

# Restart terminal and verify
composer --version
```

### Manual Install (Recommended)

1. **Download Composer Installer**
   - Go to: https://getcomposer.org/Composer-Setup.exe
   - Run the installer
   - It will install PHP if needed

2. **Restart your terminal**

3. **Verify**
   ```bash
   composer --version
   ```

## Option D: Focus on NodeJS & React (Skip Laravel for now)

You can demonstrate 2 out of 3 phases:

### 1. NodeJS Script (Works without Laravel)

Modify `nodejs-script/src/services/LaravelAPIService.js` to use mock data:

```javascript
async getLatestArticle() {
    // Return mock article for demo
    return {
        id: 1,
        title: "Sample Article for Demo",
        content: "This is sample content...",
        author: "Demo Author"
    };
}
```

### 2. React Frontend

Use mock data as shown in Option A.

### 3. Document the situation

Add to README:
```
Note: Laravel backend requires PHP/Composer installation.
For quick demo, React frontend uses mock data.
Full setup instructions in INSTALL_COMPOSER.md
```

## Recommended Path Forward

### For Immediate Demo (5 minutes):
1. ✅ Install React dependencies: `cd react-frontend && npm install`
2. ✅ Use mock data (Option A above)
3. ✅ Run React app: `npm start`
4. ✅ Show beautiful UI working

### For Complete Submission (20 minutes):
1. 📥 Install Composer from: https://getcomposer.org/Composer-Setup.exe
2. 🔄 Restart terminal
3. ✅ Run `composer install` in laravel-api
4. ✅ Complete full setup
5. 🚀 Submit with all 3 phases

## What to Do Right Now

**Choose your path:**

**Path 1: Quick Demo (React Only)**
```bash
cd react-frontend
npm install
# Use mock data
npm start
```

**Path 2: Full Installation**
1. Download: https://getcomposer.org/Composer-Setup.exe
2. Install Composer
3. Restart terminal
4. Continue with full setup

**Path 3: Deploy & Skip Local Laravel**
1. Push to GitHub
2. Deploy Laravel to Railway
3. Use deployed API URL in React

## My Recommendation

**Install Composer** - It's quick (5 minutes) and you'll need it for Laravel development anyway. The installer handles everything automatically.

Download here: **https://getcomposer.org/Composer-Setup.exe**

After installation, just restart your terminal and run:
```bash
cd laravel-api
composer install
```

Then you'll have the complete project running! 🚀
