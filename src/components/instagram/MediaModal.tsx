import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Share2, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Loader2, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import { Post, getProxiedUrl } from '@/lib/instagram-api';
import { toast } from 'sonner';
import './MediaModal.css';

interface MediaModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ post, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMediaLoaded(false);
      setMediaError(false);
      setCurrentUrlIndex(0);
    } else {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const media = post.mediaUrls?.[0];
  if (!media) return null;

  const isVideo = media.type === 'video';
  const mediaUrl = media.url;

  const urlOptions = [
    getProxiedUrl(mediaUrl),
    mediaUrl,
    media.thumbnailUrl ? getProxiedUrl(media.thumbnailUrl) : null,
    media.thumbnailUrl,
  ].filter(Boolean) as string[];

  const currentUrl = urlOptions[currentUrlIndex] || '';

  const handleMediaError = () => {
    if (currentUrlIndex < urlOptions.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setMediaError(true);
    }
  };

  const handleDownload = async () => {
    try {
      toast.info('Download wird gestartet...');
      const downloadUrl = getProxiedUrl(mediaUrl) || mediaUrl;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${post.username}_${post.shortcode || Date.now()}.${isVideo ? 'mp4' : 'jpg'}`;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download gestartet!');
    } catch (error) {
      toast.error('Download fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };

  const handleShare = async (platform: string) => {
    const shareUrl = `https://www.instagram.com/p/${post.shortcode}/`;
    const shareText = `Sieh dir diesen Instagram-Beitrag von @${post.username} an`;

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        toast.success('Link kopiert!');
        setTimeout(() => setLinkCopied(false), 2000);
      } catch {
        toast.error('Kopieren fehlgeschlagen');
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={modalRef}
      className="media-modal"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="media-modal__close"
      >
        <X className="media-modal__close-icon" />
      </button>

      {/* Media Container */}
      <div className="media-modal__content">
        {/* Loading State */}
        {!mediaLoaded && !mediaError && (
          <div className="media-modal__loading">
            <Loader2 className="media-modal__loading-spinner" />
          </div>
        )}

        {/* Error State */}
        {mediaError && (
          <div className="media-modal__error">
            <X className="media-modal__error-icon" />
            <p className="media-modal__error-title">Medium konnte nicht geladen werden</p>
            <p className="media-modal__error-text">Bitte versuchen Sie es später erneut</p>
          </div>
        )}

        {/* Video Player */}
        {isVideo && !mediaError && (
          <div className="media-modal__media-wrapper">
            <video
              ref={videoRef}
              src={currentUrl}
              className={`media-modal__media ${mediaLoaded ? 'is-visible' : ''}`}
              loop
              muted={isMuted}
              playsInline
              crossOrigin="anonymous"
              onLoadedData={() => setMediaLoaded(true)}
              onError={handleMediaError}
              onClick={togglePlay}
            />
            
            {/* Video Controls */}
            {mediaLoaded && (
              <div className="media-modal__controls">
                <button
                  onClick={togglePlay}
                  className="media-modal__control-btn"
                >
                  {isPlaying ? <Pause className="media-modal__control-icon" /> : <Play className="media-modal__control-icon media-modal__control-icon--fill" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="media-modal__control-btn"
                >
                  {isMuted ? <VolumeX className="media-modal__control-icon" /> : <Volume2 className="media-modal__control-icon" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Image */}
        {!isVideo && !mediaError && (
          <img
            src={currentUrl}
            alt="Instagram Beitrag"
            className={`media-modal__media ${mediaLoaded ? 'is-visible' : ''}`}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onLoad={() => setMediaLoaded(true)}
            onError={handleMediaError}
          />
        )}

        {/* Action Buttons */}
        {mediaLoaded && !mediaError && (
          <div className="media-modal__actions">
            <button
              onClick={handleDownload}
              className="media-modal__action-btn media-modal__action-btn--primary"
            >
              <Download className="media-modal__action-icon" />
              <span>Herunterladen</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="media-modal__action-btn media-modal__action-btn--secondary"
              >
                <Share2 className="media-modal__action-icon" />
                <span>Teilen</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="media-modal__share-menu">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="media-modal__share-item"
                  >
                    <Facebook className="media-modal__share-icon media-modal__share-icon--facebook" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="media-modal__share-item"
                  >
                    <svg className="media-modal__share-icon media-modal__share-icon--whatsapp" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="media-modal__share-item"
                  >
                    <Linkedin className="media-modal__share-icon media-modal__share-icon--linkedin" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="media-modal__share-item media-modal__share-item--border"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="media-modal__share-icon media-modal__share-icon--check" />
                        <span>Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="media-modal__share-icon" />
                        <span>Link kopieren</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaModal;
