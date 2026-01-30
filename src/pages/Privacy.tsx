import React from 'react';
import { Shield, Lock, Eye, Database, Cookie, Mail, FileText } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';

const Privacy: React.FC = () => {
  const lastUpdated = '30. Januar 2026';

  const sections = [
    {
      icon: Eye,
      title: '1. Erhebung und Verarbeitung personenbezogener Daten',
      content: `
        <p>Bei der Nutzung von InstaViewer werden grundsätzlich keine personenbezogenen Daten erhoben oder gespeichert. Unser Service ist so konzipiert, dass Sie ihn anonym und ohne Registrierung nutzen können.</p>
        <p class="mt-4"><strong>Automatisch erhobene Daten:</strong></p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>IP-Adresse (anonymisiert)</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Referrer-URL</li>
        </ul>
        <p class="mt-4">Diese Daten werden ausschließlich für technische Zwecke und zur Verbesserung unseres Services verwendet und nach 30 Tagen automatisch gelöscht.</p>
      `,
    },
    {
      icon: Database,
      title: '2. Lokale Datenspeicherung',
      content: `
        <p>InstaViewer speichert bestimmte Daten lokal in Ihrem Browser (Local Storage):</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Letzte Suchen:</strong> Die letzten 5 gesuchten Benutzernamen werden lokal gespeichert, um Ihnen den schnellen Zugriff zu ermöglichen.</li>
          <li><strong>Theme-Einstellungen:</strong> Ihre Präferenz für den Hell- oder Dunkelmodus.</li>
        </ul>
        <p class="mt-4">Diese Daten werden ausschließlich auf Ihrem Gerät gespeichert und niemals an unsere Server übertragen. Sie können diese Daten jederzeit über die Browsereinstellungen löschen.</p>
      `,
    },
    {
      icon: Cookie,
      title: '3. Cookies und Tracking',
      content: `
        <p>InstaViewer verwendet nur technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Wir verwenden keine Tracking-Cookies oder Analyse-Tools von Drittanbietern.</p>
        <p class="mt-4"><strong>Verwendete Cookies:</strong></p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Session-Cookies (werden nach dem Schließen des Browsers gelöscht)</li>
          <li>Funktionale Cookies für Theme-Einstellungen</li>
        </ul>
        <p class="mt-4">Sie können Cookies in Ihren Browsereinstellungen deaktivieren. Beachten Sie jedoch, dass einige Funktionen der Website möglicherweise nicht mehr ordnungsgemäß funktionieren.</p>
      `,
    },
    {
      icon: Lock,
      title: '4. Datensicherheit',
      content: `
        <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen:</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
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
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
          <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
          <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
          <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
          <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem gängigen Format erhalten.</li>
          <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
        </ul>
        <p class="mt-4">Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter: <a href="mailto:datenschutz@instaviewer.de" class="text-purple-600 dark:text-purple-400 hover:underline">datenschutz@instaviewer.de</a></p>
      `,
    },
    {
      icon: FileText,
      title: '6. Drittanbieter und externe Links',
      content: `
        <p>InstaViewer nutzt die öffentlich zugängliche Instagram-API, um Profilinformationen und Medien abzurufen. Wir haben keinen Zugriff auf private Konten oder geschützte Inhalte.</p>
        <p class="mt-4"><strong>Wichtige Hinweise:</strong></p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
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
        <p class="mt-4">
          <strong>E-Mail:</strong> <a href="mailto:datenschutz@instaviewer.de" class="text-purple-600 dark:text-purple-400 hover:underline">datenschutz@instaviewer.de</a>
        </p>
        <p class="mt-4">Sie haben außerdem das Recht, eine Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzureichen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.</p>
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead
        title="Datenschutzerklärung - InstaViewer"
        description="Erfahren Sie, wie InstaViewer Ihre Daten schützt. Unsere Datenschutzerklärung erklärt, welche Daten wir erheben und wie wir sie verwenden."
        keywords="Datenschutz, DSGVO, Privatsphäre, InstaViewer Datenschutz"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-16 sm:py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Ihre Privatsphäre ist uns wichtig. Erfahren Sie, wie wir Ihre Daten schützen.
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
              Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung 
              personenbezogener Daten auf unserer Website InstaViewer. Wir nehmen den Schutz Ihrer persönlichen 
              Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
              gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
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

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-2xl text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
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
