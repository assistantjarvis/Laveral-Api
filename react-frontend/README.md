# React Frontend

Modern, responsive React application for viewing and managing articles.

## Features

- ✨ **Beautiful UI**: Modern dark theme with smooth animations
- 🎨 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🔍 **Filtering**: Filter articles by all, original, or AI-optimized
- 📖 **Article Detail View**: Full-screen modal for reading articles
- 📚 **Citations Display**: Shows reference articles for AI-optimized content
- ⚡ **Fast Performance**: Optimized React components
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML

## Setup

## Default Mode (No Laravel Required)

This frontend is configured to run using the built-in mock API by default, so you can demo the UI immediately without PHP/Composer.

1. Install dependencies:

```bash
cd react-frontend
npm install
```

2. Configure environment:

```bash
copy .env.example .env
```

3. Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

> Note: `REACT_APP_API_URL` is only needed when you switch the app to the real Laravel API.

4. Start development server:

```bash
npm start
```

App will open at: `http://localhost:3000`

## Switching to Real Laravel API (Optional)

When Laravel is running locally, switch the import in `src/App.js`:

- Use mock (default): `./services/mockApi`
- Use real API: `./services/api`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── ArticleCard.js
│   └── ArticleDetail.js
├── services/
│   └── api.js
├── styles/
│   ├── index.css
│   ├── App.css
│   ├── Header.css
│   ├── ArticleCard.css
│   └── ArticleDetail.css
├── App.js
└── index.js
```

## Design System

### Colors

- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Background**: Dark slate (#0f172a)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, 800 weight
- **Body**: Regular, 400 weight

### Components

- **Cards**: Hover effects with elevation
- **Buttons**: Gradient backgrounds with glow effects
- **Modals**: Backdrop blur with smooth animations
- **Badges**: Pulsing AI-optimized indicators

## Technologies

- React 18
- Axios for API calls
- CSS Modules
- Modern CSS (Grid, Flexbox, Custom Properties)
- Responsive Design
- Smooth Animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
