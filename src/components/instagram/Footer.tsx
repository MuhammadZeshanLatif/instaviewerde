import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Heart, Shield, FileText, Mail, BookOpen, Home, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Startseite', icon: Home },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/kontakt', label: 'Kontakt', icon: Mail },
  ];

  const legalLinks = [
    { path: '/datenschutz', label: 'Datenschutzerklärung', icon: Shield },
    { path: '/agb', label: 'Nutzungsbedingungen', icon: FileText },
    { path: '/impressum', label: 'Impressum', icon: FileText },
  ];

  const features = [
    'Stories anonym ansehen',
    'Beiträge herunterladen',
    'Reels speichern',
    'Highlights ansehen',
    'Profil-Statistiken',
    'Kostenlos & sicher',
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">InstaViewer</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Der beste kostenlose Instagram Story Viewer. Sehen Sie Stories, Beiträge und Reels anonym an – ohne Anmeldung.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Gemacht mit</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>in Deutschland</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Schnelllinks</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Funktionen</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} InstaViewer. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs text-gray-600 text-center md:text-right max-w-md">
              Diese Website ist nicht mit Instagram oder Meta Platforms, Inc. verbunden. 
              Instagram ist eine eingetragene Marke von Meta Platforms, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
