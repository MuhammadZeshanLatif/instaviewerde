import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

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
    <section className="faq-section">
      <div className="container-lg px-3 px-sm-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="faq-section__icon">
            <HelpCircle className="faq-section__icon-svg" />
          </div>
          <h2 className="faq-section__title">
            Häufig gestellte Fragen
          </h2>
          <p className="faq-section__subtitle">
            Finden Sie Antworten auf die häufigsten Fragen zu InstaViewer.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-section__list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-section__item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-section__question"
              >
                <span className="faq-section__question-text">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`faq-section__chevron ${openIndex === index ? 'is-open' : ''}`}
                />
              </button>
              <div
                className={`faq-section__answer ${openIndex === index ? 'is-open' : ''}`}
              >
                <p className="faq-section__answer-text">
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
