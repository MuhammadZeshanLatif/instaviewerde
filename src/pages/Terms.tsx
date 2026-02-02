import React from 'react';
import { FileText, AlertTriangle, Scale, Ban, Copyright, Globe, Gavel, RefreshCw } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';
import './LegalPage.css';

const Terms: React.FC = () => {
  const lastUpdated = '30. Januar 2026';

  const sections = [
    {
      icon: Globe,
      title: '1. Geltungsbereich',
      content: `
        <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Website InstaViewer und aller damit verbundenen Dienste. Mit der Nutzung unserer Website erklären Sie sich mit diesen Bedingungen einverstanden.</p>
        <p>InstaViewer ist ein kostenloser Online-Dienst, der es Nutzern ermöglicht, öffentlich zugängliche Instagram-Inhalte anzusehen und herunterzuladen. Der Dienst richtet sich an Nutzer, die das 16. Lebensjahr vollendet haben.</p>
      `,
    },
    {
      icon: FileText,
      title: '2. Leistungsbeschreibung',
      content: `
        <p>InstaViewer bietet folgende Dienste an:</p>
        <ul>
          <li>Anzeigen von öffentlichen Instagram-Profilen</li>
          <li>Ansehen von Instagram Stories (nur öffentliche Profile)</li>
          <li>Anzeigen von Instagram-Beiträgen und Reels</li>
          <li>Herunterladen von öffentlich zugänglichen Medieninhalten</li>
        </ul>
        <p><strong>Einschränkungen:</strong></p>
        <ul>
          <li>Private Profile können nicht angezeigt werden</li>
          <li>Wir garantieren keine ständige Verfügbarkeit des Dienstes</li>
          <li>Die Funktionalität kann durch Änderungen an der Instagram-Plattform beeinträchtigt werden</li>
        </ul>
      `,
    },
    {
      icon: Ban,
      title: '3. Verbotene Nutzung',
      content: `
        <p>Bei der Nutzung von InstaViewer ist Folgendes untersagt:</p>
        <ul>
          <li>Die Nutzung für illegale Zwecke oder Aktivitäten</li>
          <li>Das Herunterladen von Inhalten für kommerzielle Zwecke ohne Erlaubnis des Urhebers</li>
          <li>Das Umgehen von Sicherheitsmaßnahmen oder technischen Beschränkungen</li>
          <li>Das automatisierte Abrufen von Daten (Scraping) in großem Umfang</li>
          <li>Das Belästigen, Stalken oder Bedrohen anderer Personen</li>
          <li>Das Verbreiten von heruntergeladenen Inhalten ohne Zustimmung des Urhebers</li>
          <li>Die Nutzung des Dienstes zur Verletzung von Persönlichkeitsrechten</li>
        </ul>
        <p>Verstöße gegen diese Bestimmungen können zur sofortigen Sperrung des Zugangs führen.</p>
      `,
    },
    {
      icon: Copyright,
      title: '4. Urheberrecht und geistiges Eigentum',
      content: `
        <p><strong>Inhalte Dritter:</strong></p>
        <p>Die über InstaViewer zugänglichen Inhalte (Bilder, Videos, etc.) sind Eigentum der jeweiligen Instagram-Nutzer oder Rechteinhaber. InstaViewer beansprucht keinerlei Rechte an diesen Inhalten.</p>
        <p><strong>Nutzung heruntergeladener Inhalte:</strong></p>
        <ul>
          <li>Heruntergeladene Inhalte dürfen nur für den persönlichen, nicht-kommerziellen Gebrauch verwendet werden</li>
          <li>Die Weiterverbreitung ohne Zustimmung des Urhebers ist untersagt</li>
          <li>Bei Verwendung in sozialen Medien ist der ursprüngliche Urheber zu nennen</li>
        </ul>
        <p><strong>Unsere Inhalte:</strong></p>
        <p>Die Website InstaViewer, einschließlich Design, Logos und Texte, ist urheberrechtlich geschützt. Eine Vervielfältigung ohne unsere Zustimmung ist nicht gestattet.</p>
      `,
    },
    {
      icon: AlertTriangle,
      title: '5. Haftungsausschluss',
      content: `
        <p>InstaViewer wird "wie besehen" ohne jegliche Garantie bereitgestellt. Wir übernehmen keine Haftung für:</p>
        <ul>
          <li>Die Verfügbarkeit oder Funktionsfähigkeit des Dienstes</li>
          <li>Die Richtigkeit, Vollständigkeit oder Aktualität der angezeigten Inhalte</li>
          <li>Schäden, die durch die Nutzung des Dienstes entstehen</li>
          <li>Inhalte Dritter, die über unseren Dienst zugänglich sind</li>
          <li>Datenverlust oder technische Störungen</li>
        </ul>
        <p>Die Nutzung von InstaViewer erfolgt auf eigene Gefahr. Wir empfehlen, die Nutzungsbedingungen von Instagram zu beachten.</p>
      `,
    },
    {
      icon: Scale,
      title: '6. Haftung des Nutzers',
      content: `
        <p>Sie sind für die Nutzung von InstaViewer und die damit verbundenen Handlungen selbst verantwortlich. Sie verpflichten sich:</p>
        <ul>
          <li>Die geltenden Gesetze und Vorschriften einzuhalten</li>
          <li>Die Rechte Dritter zu respektieren</li>
          <li>InstaViewer nicht für rechtswidrige Zwecke zu nutzen</li>
          <li>Uns von allen Ansprüchen Dritter freizustellen, die aus Ihrer Nutzung resultieren</li>
        </ul>
      `,
    },
    {
      icon: RefreshCw,
      title: '7. Änderungen der AGB',
      content: `
        <p>Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden auf dieser Seite veröffentlicht. Die fortgesetzte Nutzung des Dienstes nach Veröffentlichung von Änderungen gilt als Zustimmung zu den geänderten Bedingungen.</p>
        <p>Wir empfehlen, diese Seite regelmäßig auf Änderungen zu überprüfen.</p>
      `,
    },
    {
      icon: Gavel,
      title: '8. Anwendbares Recht und Gerichtsstand',
      content: `
        <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Berlin, Deutschland, soweit gesetzlich zulässig.</p>
        <p>Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
      `,
    },
  ];

  return (
    <div className="legal-page">
      <SEOHead
        title="Nutzungsbedingungen (AGB) - InstaViewer"
        description="Lesen Sie unsere Allgemeinen Geschäftsbedingungen für die Nutzung von InstaViewer. Erfahren Sie mehr über Ihre Rechte und Pflichten."
        keywords="AGB, Nutzungsbedingungen, Terms of Service, InstaViewer"
      />
      <Header />

      {/* Hero Section */}
      <section className="legal-hero">
        <div className="legal-hero__overlay" />
        <div className="container-xl px-3 px-sm-4 text-center legal-hero__content">
          <div className="legal-hero__icon">
            <FileText className="legal-hero__icon-svg" />
          </div>
          <h1 className="legal-hero__title">
            Nutzungsbedingungen
          </h1>
          <p className="legal-hero__subtitle">
            Allgemeine Geschäftsbedingungen für die Nutzung von InstaViewer
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
              Willkommen bei InstaViewer. Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, 
              bevor Sie unseren Dienst nutzen. Durch die Nutzung von InstaViewer erklären Sie sich 
              mit diesen Bedingungen einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden 
              sind, nutzen Sie bitte unseren Dienst nicht.
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

          {/* Contact */}
          <div className="legal-note legal-note--accent">
            <h3 className="legal-note__title">
              Fragen zu den Nutzungsbedingungen?
            </h3>
            <p className="legal-note__text">
              Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte:
            </p>
            <a
              href="mailto:legal@instaviewer.de"
              className="legal-link"
            >
              legal@instaviewer.de
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
