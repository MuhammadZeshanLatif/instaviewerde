import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Ist InstaViewer kostenlos?',
      answer: 'Ja, InstaViewer ist vollständig kostenlos. Sie können unbegrenzt Instagram-Profile durchsuchen, Stories ansehen und Medien herunterladen, ohne einen Cent zu bezahlen.',
    },
    {
      question: 'Kann der Benutzer sehen, dass ich seine Stories angesehen habe?',
      answer: 'Nein, InstaViewer ermöglicht es Ihnen, Instagram-Stories vollständig anonym anzusehen. Der Profilinhaber wird nicht benachrichtigt und Sie erscheinen nicht in der Liste der Story-Zuschauer.',
    },
    {
      question: 'Muss ich mich anmelden oder ein Konto erstellen?',
      answer: 'Nein, Sie müssen sich nicht anmelden oder ein Konto erstellen. Geben Sie einfach den Benutzernamen ein und beginnen Sie mit dem Durchsuchen. Keine Registrierung erforderlich.',
    },
    {
      question: 'Kann ich private Profile ansehen?',
      answer: 'Nein, InstaViewer kann nur öffentliche Instagram-Profile anzeigen. Private Profile sind durch die Datenschutzeinstellungen von Instagram geschützt und können nicht anonym angesehen werden.',
    },
    {
      question: 'In welchen Formaten kann ich Medien herunterladen?',
      answer: 'Bilder werden im JPG-Format heruntergeladen und Videos im MP4-Format. Die Qualität entspricht der Originalqualität, die auf Instagram hochgeladen wurde.',
    },
    {
      question: 'Ist es legal, Instagram-Inhalte herunterzuladen?',
      answer: 'Das Herunterladen von Inhalten für den persönlichen Gebrauch ist in der Regel erlaubt. Bitte respektieren Sie jedoch das Urheberrecht und verwenden Sie heruntergeladene Inhalte nicht für kommerzielle Zwecke ohne Erlaubnis des Urhebers.',
    },
    {
      question: 'Warum werden manchmal keine Stories angezeigt?',
      answer: 'Stories sind nur 24 Stunden verfügbar. Wenn keine Stories angezeigt werden, hat der Benutzer möglicherweise keine aktiven Stories oder das Profil ist privat.',
    },
    {
      question: 'Ist meine Privatsphäre geschützt?',
      answer: 'Ja, wir speichern keine persönlichen Daten. Ihre Suchanfragen werden nur lokal in Ihrem Browser gespeichert und können jederzeit gelöscht werden. Wir verwenden SSL-Verschlüsselung für sichere Verbindungen.',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Finden Sie Antworten auf die häufigsten Fragen zu InstaViewer.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
