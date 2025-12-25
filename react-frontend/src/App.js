import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';

// Toggle between mock and real API
// Use mockApi for demo without Laravel backend
// Use api when Laravel is running
import { fetchArticles } from './services/mockApi';  // ← Using mock data for now
// import { fetchArticles } from './services/api';   // ← Uncomment when Laravel is ready

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState('all'); // all, original, updated

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please make sure the Laravel API is running.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'original') return !article.is_updated;
    if (filter === 'updated') return article.is_updated;
    return true;
  });

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero">
            <h1 className="hero-title">
              Discover <span className="gradient-text">AI-Optimized</span> Articles
            </h1>
            <p className="hero-subtitle">
              Explore our collection of articles, enhanced with cutting-edge AI technology
            </p>
          </section>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-chips">
              <button 
                className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Articles ({articles.length})
              </button>
              <button 
                className={`filter-chip ${filter === 'original' ? 'active' : ''}`}
                onClick={() => setFilter('original')}
              >
                Original ({articles.filter(a => !a.is_updated).length})
              </button>
              <button 
                className={`filter-chip ${filter === 'updated' ? 'active' : ''}`}
                onClick={() => setFilter('updated')}
              >
                AI-Optimized ({articles.filter(a => a.is_updated).length})
              </button>
            </div>
            
            <button className="refresh-btn" onClick={loadArticles}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading articles...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button className="retry-btn" onClick={loadArticles}>Try Again</button>
            </div>
          )}

          {/* Articles Grid */}
          {!loading && !error && (
            <>
              {filteredArticles.length === 0 ? (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2"/>
                    <polyline points="14 2 14 8 20 8" strokeWidth="2"/>
                  </svg>
                  <h3>No articles found</h3>
                  <p>Try changing your filter or add some articles</p>
                </div>
              ) : (
                <div className="articles-grid">
                  {filteredArticles.map(article => (
                    <ArticleCard 
                      key={article.id} 
                      article={article}
                      onClick={() => setSelectedArticle(article)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail 
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ for BeyondChats Assignment</p>
          <p className="footer-tech">React • Laravel • NodeJS • OpenAI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
