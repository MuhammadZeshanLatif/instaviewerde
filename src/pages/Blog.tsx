import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead
        title="Blog - Instagram Tipps & Anleitungen | InstaViewer"
        description="Entdecken Sie hilfreiche Artikel über Instagram Stories, Reels, Datenschutz und mehr. Tipps und Anleitungen für bessere Instagram-Nutzung."
        keywords="Instagram Blog, Instagram Tipps, Instagram Anleitungen, Social Media Tipps, Instagram Stories Tipps"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-16 sm:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            InstaViewer Blog
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Tipps, Anleitungen und Neuigkeiten rund um Instagram. 
            Bleiben Sie auf dem Laufenden mit den neuesten Trends.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Artikel suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'Alle' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    (category === 'Alle' && !selectedCategory) || selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Keine Artikel gefunden. Versuchen Sie eine andere Suche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-sm font-medium text-purple-600 dark:text-purple-400 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-pink-500 transition-colors"
                    >
                      Weiterlesen
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Newsletter abonnieren
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Erhalten Sie die neuesten Artikel und Tipps direkt in Ihr Postfach.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
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
