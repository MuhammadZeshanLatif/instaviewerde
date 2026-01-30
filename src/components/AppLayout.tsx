import React, { useState, useCallback, useRef } from 'react';
import { Eye, EyeOff, Download, Shield, Zap, Globe, Lock, Smartphone, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Header from './instagram/Header';
import Footer from './instagram/Footer';
import SearchBar from './instagram/SearchBar';
import ProfileCard from './instagram/ProfileCard';
import MediaGrid from './instagram/MediaGrid';
import MediaModal from './instagram/MediaModal';
import ContentTabs, { TabType } from './instagram/ContentTabs';
import FeatureCard from './instagram/FeatureCard';
import HowItWorks from './instagram/HowItWorks';
import FAQ from './instagram/FAQ';
import PopularProfiles from './instagram/PopularProfiles';
import SEOHead from './instagram/SEOHead';
import {
  Profile,
  Post,
  fetchProfile,
  fetchStories,
  fetchPosts,
  fetchReels,
  fetchHighlights,
  addToRecentSearches,
} from '@/lib/instagram-api';

interface ContentCache {
  stories: Post[];
  posts: Post[];
  reels: Post[];
  highlights: Post[];
}

const AppLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('stories');
  const [contentCache, setContentCache] = useState<ContentCache>({
    stories: [],
    posts: [],
    reels: [],
    highlights: [],
  });
  const [tabLoading, setTabLoading] = useState<Record<TabType, boolean>>({
    stories: false,
    posts: false,
    reels: false,
    highlights: false,
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const currentUsername = useRef<string>('');

  const features = [
    {
      icon: EyeOff,
      title: 'Anonym ansehen',
      description: 'Sehen Sie Stories und Beiträge an, ohne dass der Benutzer es erfährt.',
      gradient: 'from-purple-600 to-purple-400',
    },
    {
      icon: Download,
      title: 'Einfach herunterladen',
      description: 'Laden Sie Bilder und Videos in Originalqualität herunter.',
      gradient: 'from-pink-600 to-pink-400',
    },
    {
      icon: Shield,
      title: 'Sicher & Privat',
      description: 'Ihre Daten werden nicht gespeichert. 100% sichere Verbindung.',
      gradient: 'from-green-600 to-green-400',
    },
    {
      icon: Zap,
      title: 'Blitzschnell',
      description: 'Sofortige Ergebnisse ohne Wartezeit oder Verzögerungen.',
      gradient: 'from-orange-500 to-orange-400',
    },
    {
      icon: Globe,
      title: 'Keine Anmeldung',
      description: 'Kein Konto erforderlich. Einfach Benutzername eingeben und loslegen.',
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      icon: Smartphone,
      title: 'Alle Geräte',
      description: 'Funktioniert auf Desktop, Tablet und Smartphone gleichermaßen gut.',
      gradient: 'from-indigo-600 to-indigo-400',
    },
  ];

  const handleSearch = useCallback(async (username: string) => {
    setIsLoading(true);
    setProfile(null);
    setContentCache({ stories: [], posts: [], reels: [], highlights: [] });
    currentUsername.current = username;

    try {
      // Fetch profile
      const profileData = await fetchProfile(username);
      setProfile(profileData);
      addToRecentSearches(username);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // Fetch stories initially
      setTabLoading(prev => ({ ...prev, stories: true }));
      try {
        const storiesData = await fetchStories(username);
        setContentCache(prev => ({
          ...prev,
          stories: storiesData.stories || storiesData.posts || [],
        }));
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setTabLoading(prev => ({ ...prev, stories: false }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profil konnte nicht geladen werden';
      toast.error(message);
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTabChange = useCallback(async (tab: TabType) => {
    setActiveTab(tab);
    const username = currentUsername.current;
    if (!username) return;

    // Check if we already have data for this tab
    if (contentCache[tab].length > 0) return;

    setTabLoading(prev => ({ ...prev, [tab]: true }));

    try {
      let data;
      switch (tab) {
        case 'stories':
          data = await fetchStories(username);
          setContentCache(prev => ({ ...prev, stories: data.stories || data.posts || [] }));
          break;
        case 'posts':
          data = await fetchPosts(username);
          setContentCache(prev => ({ ...prev, posts: data.posts || [] }));
          break;
        case 'reels':
          data = await fetchReels(username);
          setContentCache(prev => ({ ...prev, reels: data.posts || [] }));
          break;
        case 'highlights':
          data = await fetchHighlights(username);
          setContentCache(prev => ({ ...prev, highlights: data.posts || [] }));
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
      toast.error(`${tab.charAt(0).toUpperCase() + tab.slice(1)} konnten nicht geladen werden`);
    } finally {
      setTabLoading(prev => ({ ...prev, [tab]: false }));
    }
  }, [contentCache]);

  const handleMediaClick = useCallback((post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  const handleProfileClick = useCallback((username: string) => {
    handleSearch(username);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-500/5 to-orange-400/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                100% Kostenlos & Anonym
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Instagram Stories{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                anonym ansehen
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Sehen Sie Instagram Stories, Beiträge und Reels an, ohne dass jemand es erfährt. 
              Laden Sie Medien herunter – kostenlos und ohne Anmeldung.
            </p>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span>SSL-verschlüsselt</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Über 1M+ Nutzer</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>4.8/5 Bewertung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {profile && (
        <section ref={resultsRef} className="py-12 bg-white dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Card */}
            <ProfileCard profile={profile} />

            {/* Content Tabs */}
            {!profile.isPrivate && (
              <div className="mt-8 space-y-6">
                <ContentTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  storiesCount={contentCache.stories.length}
                  postsCount={contentCache.posts.length}
                  reelsCount={contentCache.reels.length}
                  highlightsCount={contentCache.highlights.length}
                />

                {/* Media Grid */}
                <div className="max-w-5xl mx-auto">
                  <MediaGrid
                    posts={contentCache[activeTab]}
                    onMediaClick={handleMediaClick}
                    isLoading={tabLoading[activeTab]}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Profiles */}
      <PopularProfiles onProfileClick={handleProfileClick} />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Warum InstaViewer?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Entdecken Sie die Vorteile unseres kostenlosen Instagram Story Viewers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Bereit zum Starten?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Geben Sie einen Instagram-Benutzernamen ein und entdecken Sie Stories, Beiträge und mehr – völlig anonym.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            Jetzt kostenlos nutzen
          </button>
        </div>
      </section>

      <Footer />

      {/* Media Modal */}
      <MediaModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
      />
    </div>
  );
};

export default AppLayout;
