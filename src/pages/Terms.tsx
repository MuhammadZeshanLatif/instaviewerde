import React from 'react';
import { FileText, AlertTriangle, Scale, Ban, Copyright, Globe, Gavel, RefreshCw } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';

const Terms: React.FC = () => {
  const lastUpdated = '30. Januar 2026';

  const sections = [
    {
      icon: Globe,
      title: '1. Geltungsbereich',
      content: `
        <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Website InstaViewer und aller damit verbundenen Dienste. Mit der Nutzung unserer Website erklären Sie sich mit diesen Bedingungen einverstanden.</p>
        <p class="mt-4">InstaViewer ist ein kostenloser Online-Dienst, der es Nutzern ermöglicht, öffentlich zugängliche Instagram-Inhalte anzusehen und herunterzuladen. Der Dienst richtet sich an Nutzer, die das 16. Lebensjahr vollendet haben.</p>
      `,
    },
    {
      icon: FileText,
      title: '2. Leistungsbeschreibung',
      content: `
        <p>InstaViewer bietet folgende Dienste an:</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Anzeigen von öffentlichen Instagram-Profilen</li>
          <li>Ansehen von Instagram Stories (nur öffentliche Profile)</li>
          <li>Anzeigen von Instagram-Beiträgen und Reels</li>
          <li>Herunterladen von öffentlich zugänglichen Medieninhalten</li>
        </ul>
        <p class="mt-4"><strong>Einschränkungen:</strong></p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
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
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Die Nutzung für illegale Zwecke oder Aktivitäten</li>
          <li>Das Herunterladen von Inhalten für kommerzielle Zwecke ohne Erlaubnis des Urhebers</li>
          <li>Das Umgehen von Sicherheitsmaßnahmen oder technischen Beschränkungen</li>
          <li>Das automatisierte Abrufen von Daten (Scraping) in großem Umfang</li>
          <li>Das Belästigen, Stalken oder Bedrohen anderer Personen</li>
          <li>Das Verbreiten von heruntergeladenen Inhalten ohne Zustimmung des Urhebers</li>
          <li>Die Nutzung des Dienstes zur Verletzung von Persönlichkeitsrechten</li>
        </ul>
        <p class="mt-4">Verstöße gegen diese Bestimmungen können zur sofortigen Sperrung des Zugangs führen.</p>
      `,
    },
    {
      icon: Copyright,
      title: '4. Urheberrecht und geistiges Eigentum',
      content: `
        <p><strong>Inhalte Dritter:</strong></p>
        <p>Die über InstaViewer zugänglichen Inhalte (Bilder, Videos, etc.) sind Eigentum der jeweiligen Instagram-Nutzer oder Rechteinhaber. InstaViewer beansprucht keinerlei Rechte an diesen Inhalten.</p>
        <p class="mt-4"><strong>Nutzung heruntergeladener Inhalte:</strong></p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Heruntergeladene Inhalte dürfen nur für den persönlichen, nicht-kommerziellen Gebrauch verwendet werden</li>
          <li>Die Weiterverbreitung ohne Zustimmung des Urhebers ist untersagt</li>
          <li>Bei Verwendung in sozialen Medien ist der ursprüngliche Urheber zu nennen</li>
        </ul>
        <p class="mt-4"><strong>Unsere Inhalte:</strong></p>
        <p>Die Website InstaViewer, einschließlich Design, Logos und Texte, ist urheberrechtlich geschützt. Eine Vervielfältigung ohne unsere Zustimmung ist nicht gestattet.</p>
      `,
    },
    {
      icon: AlertTriangle,
      title: '5. Haftungsausschluss',
      content: `
        <p>InstaViewer wird "wie besehen" ohne jegliche Garantie bereitgestellt. Wir übernehmen keine Haftung für:</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Die Verfügbarkeit oder Funktionsfähigkeit des Dienstes</li>
          <li>Die Richtigkeit, Vollständigkeit oder Aktualität der angezeigten Inhalte</li>
          <li>Schäden, die durch die Nutzung des Dienstes entstehen</li>
          <li>Inhalte Dritter, die über unseren Dienst zugänglich sind</li>
          <li>Datenverlust oder technische Störungen</li>
        </ul>
        <p class="mt-4">Die Nutzung von InstaViewer erfolgt auf eigene Gefahr. Wir empfehlen, die Nutzungsbedingungen von Instagram zu beachten.</p>
      `,
    },
    {
      icon: Scale,
      title: '6. Haftung des Nutzers',
      content: `
        <p>Sie sind für die Nutzung von InstaViewer und die damit verbundenen Handlungen selbst verantwortlich. Sie verpflichten sich:</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
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
        <p class="mt-4">Wir empfehlen, diese Seite regelmäßig auf Änderungen zu überprüfen.</p>
      `,
    },
    {
      icon: Gavel,
      title: '8. Anwendbares Recht und Gerichtsstand',
      content: `
        <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Berlin, Deutschland, soweit gesetzlich zulässig.</p>
        <p class="mt-4">Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead
        title="Nutzungsbedingungen (AGB) - InstaViewer"
        description="Lesen Sie unsere Allgemeinen Geschäftsbedingungen für die Nutzung von InstaViewer. Erfahren Sie mehr über Ihre Rechte und Pflichten."
        keywords="AGB, Nutzungsbedingungen, Terms of Service, InstaViewer"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-16 sm:py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nutzungsbedingungen
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Allgemeine Geschäftsbedingungen für die Nutzung von InstaViewer
          </p>
          <p className="text-sm text-white/70 mt-4">
            Zuletzt aktualisiert: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Willkommen bei InstaViewer. Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, 
              bevor Sie unseren Dienst nutzen. Durch die Nutzung von InstaViewer erklären Sie sich 
              mit diesen Bedingungen einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden 
              sind, nutzen Sie bitte unseren Dienst nicht.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div
                    className="text-gray-600 dark:text-gray-400 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fragen zu den Nutzungsbedingungen?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte:
            </p>
            <a
              href="mailto:legal@instaviewer.de"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:text-pink-500 transition-colors"
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
