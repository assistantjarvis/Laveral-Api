import React from 'react';
import '../styles/ArticleDetail.css';

function ArticleDetail({ article, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const citations = article.citations ? JSON.parse(article.citations) : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <article className="article-detail">
          {article.is_updated && (
            <div className="ai-badge-large">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              This article has been AI-optimized
            </div>
          )}

          <header className="detail-header">
            <h1 className="detail-title">{article.title}</h1>
            <div className="detail-meta">
              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeWidth="2"/>
                </svg>
                <span>{article.author || 'Unknown Author'}</span>
              </div>
              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{formatDate(article.published_at || article.created_at)}</span>
              </div>
              {article.url && (
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Source</a>
                </div>
              )}
            </div>
          </header>

          <div className="detail-content">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>

          {citations.length > 0 && (
            <div className="citations-section">
              <h3 className="citations-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                References
              </h3>
              <ul className="citations-list">
                {citations.map((citation, index) => (
                  <li key={index} className="citation-item">
                    <span className="citation-number">{index + 1}</span>
                    <div className="citation-content">
                      <a 
                        href={citation.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="citation-title"
                      >
                        {citation.title}
                      </a>
                      <span className="citation-source">{citation.source}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

export default ArticleDetail;
