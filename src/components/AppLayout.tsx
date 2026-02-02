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
import './AppLayout.css';
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
    <div className="app-layout">
      <SEOHead />
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Gradient */}
        <div className="hero-section__bg" />
        <div className="hero-section__orb hero-section__orb--left" />
        <div className="hero-section__orb hero-section__orb--right" />

        <div className="container-xl px-3 px-sm-4">
          <div className="hero-section__content text-center">
            {/* Badge */}
            <div className="hero-section__badge">
              <div className="hero-section__badge-dot" />
              <span className="hero-section__badge-text">
                100% Kostenlos & Anonym
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-section__title">
              Instagram Stories{' '}
              <span className="hero-section__title-highlight">
                anonym ansehen
              </span>
            </h1>

            {/* Subheadline */}
            <p className="hero-section__subtitle">
              Sehen Sie Instagram Stories, Beiträge und Reels an, ohne dass jemand es erfährt. 
              Laden Sie Medien herunter – kostenlos und ohne Anmeldung.
            </p>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {/* Trust Indicators */}
            <div className="hero-section__trust">
              <div className="d-flex align-items-center gap-2">
                <Lock className="hero-section__trust-icon hero-section__trust-icon--green" />
                <span>SSL-verschlüsselt</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Eye className="hero-section__trust-icon hero-section__trust-icon--purple" />
                <span>Über 1M+ Nutzer</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Heart className="hero-section__trust-icon hero-section__trust-icon--pink" />
                <span>4.8/5 Bewertung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {profile && (
        <section ref={resultsRef} className="results-section">
          <div className="container-xl px-3 px-sm-4">
            {/* Profile Card */}
            <ProfileCard profile={profile} />

            {/* Content Tabs */}
            {!profile.isPrivate && (
              <div className="results-section__tabs">
                <ContentTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  storiesCount={contentCache.stories.length}
                  postsCount={contentCache.posts.length}
                  reelsCount={contentCache.reels.length}
                  highlightsCount={contentCache.highlights.length}
                />

                {/* Media Grid */}
                <div className="results-section__grid">
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
      <section className="features-section">
        <div className="container-xl px-3 px-sm-4">
          <div className="text-center mb-5">
            <h2 className="features-section__title">
              Warum InstaViewer?
            </h2>
            <p className="features-section__subtitle">
              Entdecken Sie die Vorteile unseres kostenlosen Instagram Story Viewers.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container-xl px-3 px-sm-4">
          <div className="text-center mb-4">
            <h2 className="trust-section__title">
              Vertraut von Nutzern weltweit
            </h2>
            <p className="trust-section__subtitle">
              Schnelle Ergebnisse, klare Privatsphäre und keine Anmeldung – jederzeit verfügbar.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="trust-section__card">
                <p className="trust-section__value trust-section__value--purple">1M+</p>
                <p className="trust-section__label">Monatliche Nutzer</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="trust-section__card">
                <p className="trust-section__value trust-section__value--pink">4.8/5</p>
                <p className="trust-section__label">Durchschnittliche Bewertung</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="trust-section__card">
                <p className="trust-section__value trust-section__value--orange">100%</p>
                <p className="trust-section__label">Anonym & kostenlos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container-lg px-3 px-sm-4 text-center">
          <h2 className="cta-section__title">
            Bereit zum Starten?
          </h2>
          <p className="cta-section__subtitle">
            Geben Sie einen Instagram-Benutzernamen ein und entdecken Sie Stories, Beiträge und mehr – völlig anonym.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cta-section__button"
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
