import React, { useState, useCallback, useRef } from 'react';
import { Eye, Lock, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Header from './instagram/Header';
import Footer from './instagram/Footer';
import SearchBar from './instagram/SearchBar';
import ProfileCard from './instagram/ProfileCard';
import MediaGrid from './instagram/MediaGrid';
import MediaModal from './instagram/MediaModal';
import ContentTabs, { TabType } from './instagram/ContentTabs';
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

  const faqStructuredData = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie schnell erhalte ich Ergebnisse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ergebnisse erscheinen in der Regel in wenigen Sekunden, abhängig von Netzwerk und Profilgröße.',
        },
      },
      {
        '@type': 'Question',
        name: 'Benötige ich ein Konto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein, Sie können den Dienst ohne Anmeldung verwenden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Werden Daten gespeichert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suchverläufe bleiben lokal im Browser, es werden keine Profile oder Inhalte serverseitig gespeichert.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kann ich Medien herunterladen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, je nach Inhaltstyp können Medien in den üblichen Formaten geladen werden.',
        },
      },
    ],
  };

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
      <SEOHead structuredData={faqStructuredData} />
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
                  isLoading={tabLoading[activeTab]}
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

      {/* Complete Guide Section */}
      <section className="guide-section">
        <div className="container-lg px-3 px-sm-4">
          <div className="guide-section__card">
            <h2 className="guide-section__title">InstaViewer Story Viewer – kompletter Überblick</h2>
            <p className="guide-section__lead">
              Wenn Sie eine klare, schnelle und sichere Übersicht über öffentliche Inhalte wünschen, ist
              ein strukturierter Ablauf entscheidend. InstaViewer fasst die wichtigsten Schritte in einem
              einzigen Prozess zusammen: Benutzername prüfen, Kernzahlen ansehen, Inhalte gezielt öffnen.
              So behalten Sie den Überblick und vermeiden unnötige Umwege.
            </p>

            <h3 className="guide-section__subtitle">Was Sie mit InstaViewer erhalten</h3>
            <p className="guide-section__text">
              Der Fokus liegt auf Geschwindigkeit, Klarheit und einer sauberen Oberfläche. Sie erhalten
              eine schnelle Profilübersicht, verlässliche Statistiken, eine klare Inhaltsstruktur und die
              Möglichkeit, Medien gezielt zu öffnen. Der Ablauf bleibt konsequent, damit Ergebnisse
              nachvollziehbar bleiben und Sie effizient vergleichen können.
            </p>
            <p className="guide-section__text">
              Wenn Sie regelmäßig mehrere Profile prüfen, hilft ein fester Rhythmus: erst Namen, dann
              Kennzahlen, danach gezielte Inhalte. InstaViewer macht diesen Ablauf leicht nachvollziehbar,
              sodass Sie nicht zwischen verschiedenen Seiten wechseln müssen. Die Struktur bleibt klar,
              damit Sie jeden Schritt direkt wiederfinden und gezielt Entscheidungen treffen können. Das
              spart Zeit und hält den Fokus auf das Wesentliche.
            </p>

            <h3 className="guide-section__subtitle">So funktioniert der Ablauf</h3>
            <ul className="guide-section__list">
              <li>Benutzernamen eingeben und auf Plausibilität prüfen.</li>
              <li>Kennzahlen zuerst betrachten, um die Relevanz schnell einzuschätzen.</li>
              <li>Inhalte nach Typ filtern und nur das öffnen, was Sie wirklich brauchen.</li>
              <li>Suchverlauf nutzen, um wiederkehrende Profile schneller zu prüfen.</li>
            </ul>

            <h3 className="guide-section__subtitle">Funktionen und Nutzen</h3>
            <ul className="guide-section__list">
              <li>Übersichtliche Profilkarte mit klaren Kennzahlen.</li>
              <li>Inhalte nach Kategorien strukturiert und schnell zugänglich.</li>
              <li>Direkte Downloads für Medien, wenn verfügbar.</li>
              <li>Schlanke Oberfläche ohne Ablenkungen.</li>
            </ul>

            <h3 className="guide-section__subtitle">Privatsphäre und Sicherheit</h3>
            <p className="guide-section__text">
              Suchanfragen bleiben lokal im Browser, es werden keine Profile gespeichert. Der Fokus liegt
              auf einer sicheren Nutzung ohne Anmeldung, damit Sie die Kontrolle behalten. Wenn Sie
              bestimmte Inhalte nicht öffnen möchten, können Sie den Ablauf jederzeit abbrechen.
            </p>

            <h3 className="guide-section__subtitle">Downloads und Formate</h3>
            <p className="guide-section__text">
              Inhalte lassen sich nur dann speichern, wenn sie öffentlich zugänglich sind. Je nach
              Medientyp können gängige Bild- oder Videoformate genutzt werden. Sie entscheiden, wann ein
              Download sinnvoll ist und wann eine reine Vorschau ausreicht.
            </p>

            <h3 className="guide-section__subtitle">Kompatibilität</h3>
            <p className="guide-section__text">
              Die Oberfläche ist auf Desktop, Tablet und Smartphone optimiert. Das Layout bleibt klar, die
              Bedienelemente sind kompakt und die Navigation ist auf schnelle Schritte ausgelegt.
            </p>

            <h3 className="guide-section__subtitle">Grenzen und Verantwortung</h3>
            <p className="guide-section__text">
              Private Profile können nicht angezeigt werden. Nutzen Sie Inhalte verantwortungsvoll und
              respektieren Sie Rechte Dritter. Der Dienst unterstützt einen schnellen Überblick, ersetzt
              jedoch keine rechtliche Prüfung.
            </p>

            <h3 className="guide-section__subtitle">Kurz-FAQ</h3>
            <div className="guide-section__faq">
              <details className="guide-section__faq-item" open>
                <summary>Wie schnell sind Ergebnisse verfügbar?</summary>
                <p>Meist in wenigen Sekunden.</p>
              </details>
              <details className="guide-section__faq-item">
                <summary>Brauche ich ein Konto?</summary>
                <p>Nein, die Nutzung funktioniert ohne Anmeldung.</p>
              </details>
              <details className="guide-section__faq-item">
                <summary>Werden Daten gespeichert?</summary>
                <p>Suchverläufe bleiben lokal im Browser.</p>
              </details>
              <details className="guide-section__faq-item">
                <summary>Kann ich Medien laden?</summary>
                <p>Ja, wenn Inhalte öffentlich verfügbar sind.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="howto-section">
        <div className="container-lg px-3 px-sm-4">
          <h2 className="howto-section__title">So nutzen Sie den Story Viewer</h2>
          <div className="howto-section__steps">
            <div className="howto-step">
              <div className="howto-step__content">
                <h3>Öffentliches Profil finden</h3>
                <p>Suchen Sie ein öffentliches Profil (z. B. @Benutzername).</p>
              </div>
              <div className="howto-step__media">
                <img src="/placeholder.svg" alt="Search illustration" />
              </div>
            </div>
            <div className="howto-step">
              <div className="howto-step__content">
                <h3>Benutzernamen kopieren</h3>
                <p>Kopieren Sie den Benutzernamen des gewünschten Profils.</p>
              </div>
              <div className="howto-step__media">
                <img src="/placeholder.svg" alt="Copy illustration" />
              </div>
            </div>
            <div className="howto-step">
              <div className="howto-step__content">
                <h3>In die Suche einfügen</h3>
                <p>Fügen Sie den Namen ins Suchfeld ein und starten Sie die Suche.</p>
              </div>
              <div className="howto-step__media">
                <img src="/placeholder.svg" alt="Paste illustration" />
              </div>
            </div>
            <div className="howto-step">
              <div className="howto-step__content">
                <h3>Story oder Reels öffnen</h3>
                <p>Öffnen Sie die Inhalte, die Sie ansehen möchten.</p>
              </div>
              <div className="howto-step__media">
                <img src="/placeholder.svg" alt="Watch illustration" />
              </div>
            </div>
            <div className="howto-step">
              <div className="howto-step__content">
                <h3>Download</h3>
                <p>Wenn Ihnen etwas gefällt, speichern Sie es direkt.</p>
              </div>
              <div className="howto-step__media">
                <img src="/placeholder.svg" alt="Download illustration" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container-lg px-3 px-sm-4">
          <h2 className="experience-section__title">Erleben Sie InstaViewer</h2>
          <div className="experience-section__cards">
            <div className="experience-card">
              <div>
                <h3>Privat bleiben, klar sehen</h3>
                <p>
                  Stories und Beiträge ansehen, ohne Spuren zu hinterlassen. Bleiben Sie fokussiert
                  auf die Inhalte, die wirklich wichtig sind.
                </p>
              </div>
              <img src="/placeholder.svg" alt="Privacy illustration" />
            </div>
            <div className="experience-card">
              <div>
                <h3>Dunkelmodus, der angenehm bleibt</h3>
                <p>
                  Eine klare Oberfläche für längere Sessions und entspannte Nutzung bei wenig Licht.
                </p>
              </div>
              <img src="/placeholder.svg" alt="Dark mode illustration" />
            </div>
          </div>

          <div className="experience-section__info">
            <h3>Über InstaViewer</h3>
            <p>
              Entwickelt für einfache Navigation, schnelle Ergebnisse und eine fokussierte Nutzung.
              Klare Abschnitte und kurze Wege helfen Ihnen, produktiv zu bleiben.
            </p>
            <div className="experience-section__badges">
              <div className="info-card">
                <h4>Rechtlicher Hinweis</h4>
                <p>Öffentliche Inhalte verantwortungsvoll nutzen und Rechte respektieren.</p>
              </div>
              <div className="info-card">
                <h4>Privatsphäre</h4>
                <p>Der Verlauf bleibt im Browser und kann jederzeit gelöscht werden.</p>
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
