import React, { useState } from 'react';
import { Play, Image as ImageIcon, Download, Eye, Loader2 } from 'lucide-react';
import { Post, getProxiedUrl } from '@/lib/instagram-api';
import './MediaGrid.css';

interface MediaGridProps {
  posts: Post[];
  onMediaClick: (post: Post) => void;
  isLoading?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ posts, onMediaClick, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="media-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="media-grid__skeleton"
          />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="media-grid__empty text-center">
        <div className="media-grid__empty-icon">
          <ImageIcon className="media-grid__empty-icon-svg" />
        </div>
        <p className="media-grid__empty-text">Keine Inhalte verfügbar</p>
      </div>
    );
  }

  return (
    <div className="media-grid">
      {posts.map((post, index) => (
        <MediaItem key={post.id || index} post={post} onClick={() => onMediaClick(post)} />
      ))}
    </div>
  );
};

interface MediaItemProps {
  post: Post;
  onClick: () => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ post, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  const media = post.mediaUrls?.[0];
  if (!media) return null;

  const isVideo = media.type === 'video';
  const thumbnailUrl = media.thumbnailUrl || media.url;
  
  const urlOptions = [
    thumbnailUrl,
    getProxiedUrl(thumbnailUrl),
    media.url,
    getProxiedUrl(media.url),
  ].filter(Boolean);

  const currentUrl = urlOptions[currentUrlIndex] || '';

  const handleImageError = () => {
    if (currentUrlIndex < urlOptions.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div
      onClick={onClick}
      className="media-grid__item"
    >
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="media-grid__loading">
          <Loader2 className="media-grid__loading-spinner" />
        </div>
      )}

      {/* Image */}
      {!imageError && (
        <img
          src={currentUrl}
          alt="Instagram Beitrag"
          className={`media-grid__image ${imageLoaded ? 'is-visible' : ''}`}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="media-grid__error">
          <ImageIcon className="media-grid__error-icon" />
          <span className="media-grid__error-text">Fehler beim Laden</span>
        </div>
      )}

      {/* Video Indicator */}
      {isVideo && (
        <div className="media-grid__video">
          <Play className="media-grid__video-icon" />
        </div>
      )}

      {/* Hover Overlay */}
      <div className="media-grid__overlay">
        <div className="media-grid__overlay-content">
          <Eye className="media-grid__overlay-icon" />
          <span className="media-grid__overlay-text">Ansehen</span>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="media-grid__download"
      >
        <Download className="media-grid__download-icon" />
      </button>
    </div>
  );
};

export default MediaGrid;
