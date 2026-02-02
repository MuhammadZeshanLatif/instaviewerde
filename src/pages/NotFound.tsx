import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import Header from "@/components/instagram/Header";
import Footer from "@/components/instagram/Footer";
import SEOHead from "@/components/instagram/SEOHead";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="not-found page d-flex flex-column">
      <SEOHead
        title="Seite nicht gefunden - InstaViewer"
        description="Die angeforderte Seite konnte nicht gefunden werden."
        noIndex={true}
      />
      <Header />
      
      <main className="not-found__main">
        <div className="not-found__content text-center">
          {/* 404 Illustration */}
          <div className="not-found__illustration">
            <div className="not-found__code">
              404
            </div>
            <div className="not-found__glow" />
          </div>

          {/* Message */}
          <h1 className="not-found__title">
            Seite nicht gefunden
          </h1>
          <p className="not-found__text">
            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
            Keine Sorge, Sie können zur Startseite zurückkehren oder nach Instagram-Profilen suchen.
          </p>

          {/* Actions */}
          <div className="not-found__actions">
            <Link
              to="/"
              className="not-found__primary"
            >
              <Home className="not-found__action-icon" />
              <span>Zur Startseite</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="not-found__secondary"
            >
              <ArrowLeft className="not-found__action-icon" />
              <span>Zurück</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="not-found__links">
            <p className="not-found__links-title">
              Vielleicht suchen Sie nach:
            </p>
            <div className="not-found__links-list">
              <Link
                to="/blog"
                className="not-found__chip"
              >
                Blog
              </Link>
              <Link
                to="/kontakt"
                className="not-found__chip"
              >
                Kontakt
              </Link>
              <Link
                to="/datenschutz"
                className="not-found__chip"
              >
                Datenschutz
              </Link>
              <Link
                to="/agb"
                className="not-found__chip"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
