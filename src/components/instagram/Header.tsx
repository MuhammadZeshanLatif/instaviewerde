import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Menu, X, Moon, Sun, Home, BookOpen, Mail, Shield, FileText } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import './Header.css';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Startseite', icon: Home },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/kontakt', label: 'Kontakt', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="container-xl px-3 px-sm-4">
        <div className="d-flex align-items-center justify-content-between site-header__inner">
          {/* Logo */}
          <Link to="/" className="site-header__logo d-flex align-items-center gap-2">
            <div className="site-header__logo-icon">
              <Instagram className="site-header__logo-icon-svg" />
            </div>
            <span className="site-header__logo-text d-none d-sm-block">
              InstaViewer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-header__nav d-none d-md-flex align-items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`site-header__link d-flex align-items-center gap-2 ${
                    isActive(link.path)
                      ? 'site-header__link--active'
                      : ''
                  }`}
                >
                  <Icon className="site-header__link-icon" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="d-flex align-items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="site-header__icon-btn"
              aria-label="Theme wechseln"
            >
              {theme === 'dark' ? <Sun className="site-header__icon" /> : <Moon className="site-header__icon" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="site-header__icon-btn d-md-none"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="site-header__icon" /> : <Menu className="site-header__icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="site-header__mobile d-md-none">
          <nav className="site-header__mobile-nav">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`site-header__mobile-link d-flex align-items-center gap-3 ${
                    isActive(link.path)
                      ? 'site-header__mobile-link--active'
                      : ''
                  }`}
                >
                  <Icon className="site-header__mobile-icon" />
                  {link.label}
                </Link>
              );
            })}
            <div className="site-header__mobile-divider">
              <Link
                to="/datenschutz"
                onClick={() => setMobileMenuOpen(false)}
                className="site-header__mobile-link d-flex align-items-center gap-3"
              >
                <Shield className="site-header__mobile-icon" />
                Datenschutz
              </Link>
              <Link
                to="/agb"
                onClick={() => setMobileMenuOpen(false)}
                className="site-header__mobile-link d-flex align-items-center gap-3"
              >
                <FileText className="site-header__mobile-icon" />
                AGB
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
