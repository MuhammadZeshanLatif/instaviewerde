import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import Header from "@/components/instagram/Header";
import Footer from "@/components/instagram/Footer";
import SEOHead from "@/components/instagram/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SEOHead
        title="Seite nicht gefunden - InstaViewer"
        description="Die angeforderte Seite konnte nicht gefunden werden."
        noIndex={true}
      />
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[150px] sm:text-[200px] font-bold leading-none bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              404
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-orange-400/10 blur-3xl -z-10" />
          </div>

          {/* Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Seite nicht gefunden
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
            Keine Sorge, Sie können zur Startseite zurückkehren oder nach Instagram-Profilen suchen.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Zur Startseite</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Vielleicht suchen Sie nach:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/blog"
                className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/kontakt"
                className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                Kontakt
              </Link>
              <Link
                to="/datenschutz"
                className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                to="/agb"
                className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
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
