import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Share2, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Loader2, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import { Post, getProxiedUrl } from '@/lib/instagram-api';
import { toast } from 'sonner';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Media Container */}
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Loading State */}
        {!mediaLoaded && !mediaError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        )}

        {/* Error State */}
        {mediaError && (
          <div className="flex flex-col items-center justify-center py-20 text-white">
            <X className="w-12 h-12 mb-4 text-red-400" />
            <p className="text-lg font-medium">Medium konnte nicht geladen werden</p>
            <p className="text-sm text-gray-400 mt-2">Bitte versuchen Sie es später erneut</p>
          </div>
        )}

        {/* Video Player */}
        {isVideo && !mediaError && (
          <div className="relative">
            <video
              ref={videoRef}
              src={currentUrl}
              className={`max-w-full max-h-[80vh] mx-auto rounded-xl ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-pink-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-pink-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
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
            className={`max-w-full max-h-[80vh] mx-auto rounded-xl ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onLoad={() => setMediaLoaded(true)}
            onError={handleMediaError}
          />
        )}

        {/* Action Buttons */}
        {mediaLoaded && !mediaError && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Herunterladen</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all"
              >
                <Share2 className="w-5 h-5" />
                <span>Teilen</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[200px]">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span>Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5" />
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
