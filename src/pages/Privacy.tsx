import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Mail, FileText } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';
import './LegalPage.css';

const Privacy: React.FC = () => {
  const lastUpdated = '30. Januar 2026';

  const sections = [
    {
      icon: Eye,
      title: '1. Erhebung und Verarbeitung personenbezogener Daten',
      content: `
        <p>Bei der Nutzung von InstaViewer werden grundsätzlich keine personenbezogenen Daten erhoben oder gespeichert. Unser Service ist so konzipiert, dass Sie ihn anonym und ohne Registrierung nutzen können.</p>
        <p><strong>Automatisch erhobene Daten:</strong></p>
        <ul>
          <li>IP-Adresse (anonymisiert)</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Referrer-URL</li>
        </ul>
        <p>Diese Daten werden ausschließlich für technische Zwecke und zur Verbesserung unseres Services verwendet und nach 30 Tagen automatisch gelöscht.</p>
      `,
    },
    {
      icon: Database,
      title: '2. Lokale Datenspeicherung',
      content: `
        <p>InstaViewer speichert bestimmte Daten lokal in Ihrem Browser (Local Storage):</p>
        <ul>
          <li><strong>Letzte Suchen:</strong> Die letzten 5 gesuchten Benutzernamen werden lokal gespeichert, um Ihnen den schnellen Zugriff zu ermöglichen.</li>
          <li><strong>Theme-Einstellungen:</strong> Ihre Präferenz für den Hell- oder Dunkelmodus.</li>
        </ul>
        <p>Diese Daten werden ausschließlich auf Ihrem Gerät gespeichert und niemals an unsere Server übertragen. Sie können diese Daten jederzeit über die Browsereinstellungen löschen.</p>
      `,
    },
    {
      icon: Cookie,
      title: '3. Cookies und Tracking',
      content: `
        <p>InstaViewer verwendet nur technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Wir verwenden keine Tracking-Cookies oder Analyse-Tools von Drittanbietern.</p>
        <p><strong>Verwendete Cookies:</strong></p>
        <ul>
          <li>Session-Cookies (werden nach dem Schließen des Browsers gelöscht)</li>
          <li>Funktionale Cookies für Theme-Einstellungen</li>
        </ul>
        <p>Sie können Cookies in Ihren Browsereinstellungen deaktivieren. Beachten Sie jedoch, dass einige Funktionen der Website möglicherweise nicht mehr ordnungsgemäß funktionieren.</p>
      `,
    },
    {
      icon: Lock,
      title: '4. Datensicherheit',
      content: `
        <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen:</p>
        <ul>
          <li><strong>SSL/TLS-Verschlüsselung:</strong> Alle Datenübertragungen erfolgen verschlüsselt über HTTPS.</li>
          <li><strong>Regelmäßige Sicherheitsupdates:</strong> Unsere Systeme werden regelmäßig aktualisiert.</li>
          <li><strong>Zugangsbeschränkungen:</strong> Der Zugang zu Servern ist streng limitiert.</li>
          <li><strong>Keine Speicherung sensibler Daten:</strong> Wir speichern keine Passwörter oder Login-Daten.</li>
        </ul>
      `,
    },
    {
      icon: Shield,
      title: '5. Ihre Rechte',
      content: `
        <p>Nach der Datenschutz-Grundverordnung (DSGVO) haben Sie folgende Rechte:</p>
        <ul>
          <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
          <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
          <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
          <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
          <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem gängigen Format erhalten.</li>
          <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
        </ul>
        <p>Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter: <a href="mailto:datenschutz@instaviewer.de" class="legal-link">datenschutz@instaviewer.de</a></p>
      `,
    },
    {
      icon: FileText,
      title: '6. Drittanbieter und externe Links',
      content: `
        <p>InstaViewer nutzt die öffentlich zugängliche Instagram-API, um Profilinformationen und Medien abzurufen. Wir haben keinen Zugriff auf private Konten oder geschützte Inhalte.</p>
        <p><strong>Wichtige Hinweise:</strong></p>
        <ul>
          <li>Wir sind nicht mit Instagram oder Meta Platforms, Inc. verbunden.</li>
          <li>Externe Links auf unserer Website unterliegen den Datenschutzrichtlinien der jeweiligen Anbieter.</li>
          <li>Wir übernehmen keine Verantwortung für die Datenschutzpraktiken externer Websites.</li>
        </ul>
      `,
    },
    {
      icon: Mail,
      title: '7. Kontakt und Beschwerden',
      content: `
        <p>Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie uns kontaktieren:</p>
        <p>
          <strong>E-Mail:</strong> <a href="mailto:datenschutz@instaviewer.de" class="legal-link">datenschutz@instaviewer.de</a>
        </p>
        <p>Sie haben außerdem das Recht, eine Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzureichen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.</p>
      `,
    },
  ];

  return (
    <div className="legal-page">
      <SEOHead
        title="Datenschutzerklärung - InstaViewer"
        description="Erfahren Sie, wie InstaViewer Ihre Daten schützt. Unsere Datenschutzerklärung erklärt, welche Daten wir erheben und wie wir sie verwenden."
        keywords="Datenschutz, DSGVO, Privatsphäre, InstaViewer Datenschutz"
      />
      <Header />

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="legal-hero__overlay" />
        <div className="container-xl px-3 px-sm-4 text-center legal-hero__content">
          <div className="legal-hero__icon">
            <Shield className="legal-hero__icon-svg" />
          </div>
          <h1 className="legal-hero__title">
            Datenschutzerklärung
          </h1>
          <p className="legal-hero__subtitle">
            Ihre Privatsphäre ist uns wichtig. Erfahren Sie, wie wir Ihre Daten schützen.
          </p>
          <p className="legal-hero__updated">
            Zuletzt aktualisiert: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="legal-content">
        <div className="container-lg px-3 px-sm-4">
          {/* Introduction */}
          <div className="legal-card legal-card--intro">
            <p className="legal-card__text">
              Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung 
              personenbezogener Daten auf unserer Website InstaViewer. Wir nehmen den Schutz Ihrer persönlichen 
              Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
              gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </div>

          {/* Sections */}
          <div className="legal-section-list">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="legal-card"
                >
                  <div className="legal-card__header d-flex align-items-start gap-3">
                    <div className="legal-card__icon">
                      <Icon className="legal-card__icon-svg" />
                    </div>
                    <h2 className="legal-card__title">
                      {section.title}
                    </h2>
                  </div>
                  <div
                    className="legal-card__content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="legal-note">
            <p className="legal-note__text">
              Diese Datenschutzerklärung kann von Zeit zu Zeit aktualisiert werden. 
              Bitte überprüfen Sie diese Seite regelmäßig auf Änderungen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
