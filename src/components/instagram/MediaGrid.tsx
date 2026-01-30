import React, { useState } from 'react';
import { Play, Image as ImageIcon, Download, Eye, Loader2 } from 'lucide-react';
import { Post, getProxiedUrl } from '@/lib/instagram-api';

interface MediaGridProps {
  posts: Post[];
  onMediaClick: (post: Post) => void;
  isLoading?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ posts, onMediaClick, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">Keine Inhalte verfügbar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
      className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}

      {/* Image */}
      {!imageError && (
        <img
          src={currentUrl}
          alt="Instagram Beitrag"
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-xs text-gray-500">Fehler beim Laden</span>
        </div>
      )}

      {/* Video Indicator */}
      {isVideo && (
        <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white" />
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Ansehen</span>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
      >
        <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default MediaGrid;
