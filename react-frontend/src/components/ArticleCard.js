import React from 'react';
import '../styles/ArticleCard.css';

function ArticleCard({ article, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className="article-card" onClick={onClick}>
      {article.is_updated && (
        <div className="ai-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI-Optimized
        </div>
      )}
      
      <div className="article-header">
        <h3 className="article-title">{article.title}</h3>
        <div className="article-meta">
          <span className="article-author">{article.author || 'Unknown Author'}</span>
          <span className="article-date">{formatDate(article.published_at || article.created_at)}</span>
        </div>
      </div>
      
      <p className="article-excerpt">
        {truncateContent(article.content)}
      </p>
      
      <div className="article-footer">
        <button className="read-more-btn">
          Read More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {article.citations && JSON.parse(article.citations).length > 0 && (
          <div className="citations-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {JSON.parse(article.citations).length} References
          </div>
        )}
      </div>
    </article>
  );
}

export default ArticleCard;
