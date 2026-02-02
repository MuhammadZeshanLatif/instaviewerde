import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Heart, Shield, FileText, Mail, BookOpen, Home, ExternalLink } from 'lucide-react';
import './Footer.css';

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
    <footer className="site-footer">
      {/* Main Footer Content */}
      <div className="container-xl px-3 px-sm-4 py-5">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/" className="site-footer__brand d-flex align-items-center gap-2 mb-3">
              <div className="site-footer__logo">
                <Instagram className="site-footer__logo-icon" />
              </div>
              <span className="site-footer__brand-text">InstaViewer</span>
            </Link>
            <p className="site-footer__text">
              Der beste kostenlose Instagram Story Viewer. Sehen Sie Stories, Beiträge und Reels anonym an – ohne Anmeldung.
            </p>
            <div className="site-footer__made d-flex align-items-center gap-2">
              <span>Gemacht mit</span>
              <Heart className="site-footer__heart" />
              <span>in Deutschland</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="site-footer__title">Schnelllinks</h3>
            <ul className="site-footer__list">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="site-footer__link d-flex align-items-center gap-2"
                    >
                      <Icon className="site-footer__link-icon" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="site-footer__title">Rechtliches</h3>
            <ul className="site-footer__list">
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="site-footer__link d-flex align-items-center gap-2"
                    >
                      <Icon className="site-footer__link-icon" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Features */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="site-footer__title">Funktionen</h3>
            <ul className="site-footer__list site-footer__list--tight">
              {features.map((feature, index) => (
                <li key={index} className="site-footer__feature d-flex align-items-center gap-2">
                  <div className="site-footer__dot" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="site-footer__bottom">
        <div className="container-xl px-3 px-sm-4 py-4">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <p className="site-footer__copyright text-center text-md-start">
              © {currentYear} InstaViewer. Alle Rechte vorbehalten.
            </p>
            <p className="site-footer__disclaimer text-center text-md-end">
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
