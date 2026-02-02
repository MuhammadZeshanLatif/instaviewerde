import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';
import './Blog.css';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'instagram-stories-anonym-ansehen-anleitung',
      title: 'Instagram Stories anonym ansehen: Die komplette Anleitung 2024',
      excerpt: 'Erfahren Sie, wie Sie Instagram Stories ansehen können, ohne dass der Ersteller es erfährt. Schritt-für-Schritt-Anleitung mit den besten Methoden.',
      content: '',
      author: 'Max Müller',
      date: '28. Januar 2026',
      readTime: '5 Min.',
      category: 'Anleitungen',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Stories', 'Anonym', 'Anleitung'],
    },
    {
      id: '2',
      slug: 'instagram-reels-herunterladen-beste-methoden',
      title: 'Instagram Reels herunterladen: Die 5 besten Methoden',
      excerpt: 'Möchten Sie Instagram Reels speichern? Hier sind die effektivsten Wege, um Reels in hoher Qualität herunterzuladen.',
      content: '',
      author: 'Anna Schmidt',
      date: '25. Januar 2026',
      readTime: '7 Min.',
      category: 'Tipps & Tricks',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Reels', 'Download', 'Tipps'],
    },
    {
      id: '3',
      slug: 'instagram-algorithmus-verstehen-2024',
      title: 'Den Instagram Algorithmus verstehen: Was Sie 2024 wissen müssen',
      excerpt: 'Der Instagram Algorithmus bestimmt, was Sie sehen. Verstehen Sie, wie er funktioniert und wie Sie ihn zu Ihrem Vorteil nutzen können.',
      content: '',
      author: 'Thomas Weber',
      date: '22. Januar 2026',
      readTime: '8 Min.',
      category: 'Social Media',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Algorithmus', 'Social Media', 'Marketing'],
    },
    {
      id: '4',
      slug: 'instagram-highlights-erstellen-tipps',
      title: 'Instagram Highlights erstellen: Tipps für ein perfektes Profil',
      excerpt: 'Highlights sind der erste Eindruck auf Ihrem Profil. Lernen Sie, wie Sie ansprechende Highlights erstellen und organisieren.',
      content: '',
      author: 'Lisa Bauer',
      date: '20. Januar 2026',
      readTime: '6 Min.',
      category: 'Anleitungen',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Highlights', 'Profil', 'Design'],
    },
    {
      id: '5',
      slug: 'instagram-datenschutz-einstellungen',
      title: 'Instagram Datenschutz: Diese Einstellungen sollten Sie kennen',
      excerpt: 'Schützen Sie Ihre Privatsphäre auf Instagram. Wir zeigen Ihnen die wichtigsten Datenschutzeinstellungen und wie Sie sie nutzen.',
      content: '',
      author: 'Michael Koch',
      date: '18. Januar 2026',
      readTime: '10 Min.',
      category: 'Sicherheit',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Datenschutz', 'Sicherheit', 'Privatsphäre'],
    },
    {
      id: '6',
      slug: 'instagram-story-ideen-kreativ',
      title: '20 kreative Instagram Story Ideen für mehr Engagement',
      excerpt: 'Langweilige Stories? Nicht mehr! Entdecken Sie 20 kreative Ideen, die Ihre Follower begeistern werden.',
      content: '',
      author: 'Sarah Fischer',
      date: '15. Januar 2026',
      readTime: '9 Min.',
      category: 'Tipps & Tricks',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=400&fit=crop',
      tags: ['Instagram', 'Stories', 'Kreativität', 'Engagement'],
    },
  ];

  const categories = ['Alle', 'Anleitungen', 'Tipps & Tricks', 'Social Media', 'Sicherheit'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Alle' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-page">
      <SEOHead
        title="Blog - Instagram Tipps & Anleitungen | InstaViewer"
        description="Entdecken Sie hilfreiche Artikel über Instagram Stories, Reels, Datenschutz und mehr. Tipps und Anleitungen für bessere Instagram-Nutzung."
        keywords="Instagram Blog, Instagram Tipps, Instagram Anleitungen, Social Media Tipps, Instagram Stories Tipps"
      />
      <Header />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero__overlay" />
        <div className="container-xl px-3 px-sm-4 text-center blog-hero__content">
          <h1 className="blog-hero__title">
            InstaViewer Blog
          </h1>
          <p className="blog-hero__subtitle">
            Tipps, Anleitungen und Neuigkeiten rund um Instagram. 
            Bleiben Sie auf dem Laufenden mit den neuesten Trends.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="blog-filter">
        <div className="container-xl px-3 px-sm-4">
          <div className="d-flex flex-column flex-sm-row gap-3 align-items-center justify-content-between">
            {/* Search */}
            <div className="blog-filter__search">
              <Search className="blog-filter__search-icon" />
              <input
                type="text"
                placeholder="Artikel suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-filter__search-input"
              />
            </div>

            {/* Categories */}
            <div className="blog-filter__categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'Alle' ? null : category)}
                  className={`blog-filter__chip ${
                    (category === 'Alle' && !selectedCategory) || selectedCategory === category
                      ? 'is-active'
                      : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid">
        <div className="container-xl px-3 px-sm-4">
          {filteredPosts.length === 0 ? (
            <div className="blog-grid__empty text-center">
              <p className="blog-grid__empty-text">
                Keine Artikel gefunden. Versuchen Sie eine andere Suche.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4">
                  <article className="blog-card">
                    {/* Image */}
                    <div className="blog-card__image">
                      <img src={post.image} alt={post.title} />
                      <div className="blog-card__badge">{post.category}</div>
                    </div>

                    {/* Content */}
                    <div className="blog-card__body">
                      <h2 className="blog-card__title">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="blog-card__excerpt">{post.excerpt}</p>

                      {/* Meta */}
                      <div className="blog-card__meta">
                        <div className="blog-card__meta-item">
                          <User className="blog-card__meta-icon" />
                          <span>{post.author}</span>
                        </div>
                        <div className="blog-card__meta-item">
                          <Calendar className="blog-card__meta-icon" />
                          <span>{post.date}</span>
                        </div>
                        <div className="blog-card__meta-item">
                          <Clock className="blog-card__meta-icon" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="blog-card__tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="blog-card__tag">
                            <Tag className="blog-card__tag-icon" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <Link to={`/blog/${post.slug}`} className="blog-card__link">
                        Weiterlesen
                        <ArrowRight className="blog-card__link-icon" />
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="container-md px-3 px-sm-4 text-center">
          <h2 className="blog-newsletter__title">
            Newsletter abonnieren
          </h2>
          <p className="blog-newsletter__subtitle">
            Erhalten Sie die neuesten Artikel und Tipps direkt in Ihr Postfach.
          </p>
          <form className="blog-newsletter__form">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="blog-newsletter__input"
            />
            <button
              type="submit"
              className="blog-newsletter__button"
            >
              Abonnieren
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
