import React from 'react';
import { Building2, Mail, Globe, User, FileText } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';
import './LegalPage.css';

const Impressum: React.FC = () => {
  return (
    <div className="legal-page">
      <SEOHead
        title="Impressum - InstaViewer"
        description="Impressum und rechtliche Informationen zu InstaViewer. Angaben gemäß § 5 TMG."
        keywords="Impressum, Kontakt, InstaViewer, rechtliche Informationen"
      />
      <Header />

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="legal-hero__overlay" />
        <div className="container-xl px-3 px-sm-4 text-center legal-hero__content">
          <div className="legal-hero__icon">
            <Building2 className="legal-hero__icon-svg" />
          </div>
          <h1 className="legal-hero__title">
            Impressum
          </h1>
          <p className="legal-hero__subtitle">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="legal-content">
        <div className="container-md px-3 px-sm-4">
          <div className="legal-section-list">
            {/* Company Info */}
            <div className="legal-card">
              <div className="legal-card__header d-flex align-items-center gap-3">
                <div className="legal-card__icon">
                  <Building2 className="legal-card__icon-svg" />
                </div>
                <h2 className="legal-card__title">
                  Angaben zum Betreiber
                </h2>
              </div>
              <div className="legal-card__content">
                <p>
                  <strong>InstaViewer</strong>
                </p>
                <p>
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  10115 Berlin<br />
                  Deutschland
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="legal-card">
              <div className="legal-card__header d-flex align-items-center gap-3">
                <div className="legal-card__icon">
                  <Mail className="legal-card__icon-svg" />
                </div>
                <h2 className="legal-card__title">
                  Kontakt
                </h2>
              </div>
              <div className="legal-card__content">
                <p className="d-flex align-items-center gap-2">
                  <Mail className="legal-card__inline-icon" />
                  <span>E-Mail: </span>
                  <a href="mailto:kontakt@instaviewer.de" className="legal-link">
                    kontakt@instaviewer.de
                  </a>
                </p>
                <p className="d-flex align-items-center gap-2">
                  <Globe className="legal-card__inline-icon" />
                  <span>Website: </span>
                  <a href="https://instaviewer.de" className="legal-link">
                    www.instaviewer.de
                  </a>
                </p>
              </div>
            </div>

            {/* Responsible for Content */}
            <div className="legal-card">
              <div className="legal-card__header d-flex align-items-center gap-3">
                <div className="legal-card__icon">
                  <User className="legal-card__icon-svg" />
                </div>
                <h2 className="legal-card__title">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
              </div>
              <div className="legal-card__content">
                <p>
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  10115 Berlin<br />
                  Deutschland
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="legal-card">
              <div className="legal-card__header d-flex align-items-center gap-3">
                <div className="legal-card__icon">
                  <FileText className="legal-card__icon-svg" />
                </div>
                <h2 className="legal-card__title">
                  Haftungsausschluss
                </h2>
              </div>
              <div className="legal-card__content legal-card__content--small">
                <div>
                  <h3 className="legal-card__subtitle">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="legal-card__subtitle">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="legal-card__subtitle">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>

            {/* EU Dispute Resolution */}
            <div className="legal-note legal-note--neutral">
              <h3 className="legal-note__title">
                EU-Streitschlichtung
              </h3>
              <p className="legal-note__text">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="legal-link"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                <br /><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impressum;
