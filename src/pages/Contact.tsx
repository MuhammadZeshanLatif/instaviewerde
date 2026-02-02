import React, { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/instagram/Header';
import Footer from '@/components/instagram/Footer';
import SEOHead from '@/components/instagram/SEOHead';
import { toast } from 'sonner';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Nachricht erfolgreich gesendet!');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-Mail',
      value: 'kontakt@instaviewer.de',
      description: 'Wir antworten innerhalb von 24 Stunden',
    },
    {
      icon: MapPin,
      title: 'Standort',
      value: 'Berlin, Deutschland',
      description: 'Unser Hauptsitz',
    },
    {
      icon: Clock,
      title: 'Geschäftszeiten',
      value: 'Mo-Fr: 9:00 - 18:00',
      description: 'Mitteleuropäische Zeit (MEZ)',
    },
  ];

  const subjects = [
    'Allgemeine Anfrage',
    'Technischer Support',
    'Feedback & Vorschläge',
    'Partnerschaft',
    'Presse & Medien',
    'Sonstiges',
  ];

  if (submitted) {
    return (
      <div className="page">
        <SEOHead
          title="Kontakt - InstaViewer"
          description="Kontaktieren Sie uns bei Fragen oder Anregungen zu InstaViewer. Wir helfen Ihnen gerne weiter."
        />
        <Header />

        <div className="container-md px-3 px-sm-4 py-5 text-center contact-success">
          <div className="contact-success__icon">
            <CheckCircle className="contact-success__icon-svg" />
          </div>
          <h1 className="contact-success__title">
            Vielen Dank für Ihre Nachricht!
          </h1>
          <p className="contact-success__text">
            Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden.
            In der Regel antworten wir innerhalb von 24 Stunden.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="contact-success__button"
          >
            Neue Nachricht senden
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <SEOHead
        title="Kontakt - InstaViewer"
        description="Kontaktieren Sie uns bei Fragen oder Anregungen zu InstaViewer. Wir helfen Ihnen gerne weiter."
        keywords="Kontakt, InstaViewer Kontakt, Support, Hilfe"
      />
      <Header />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="container-xl px-3 px-sm-4 text-center contact-hero__content">
          <h1 className="contact-hero__title">
            Kontaktieren Sie uns
          </h1>
          <p className="contact-hero__subtitle">
            Haben Sie Fragen, Feedback oder benötigen Sie Hilfe? 
            Wir sind für Sie da und freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info">
        <div className="container-xl px-3 px-sm-4">
          <div className="row g-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="col-12 col-md-4">
                  <div className="contact-info__card">
                    <div className="contact-info__icon">
                      <Icon className="contact-info__icon-svg" />
                    </div>
                    <h3 className="contact-info__title">{info.title}</h3>
                    <p className="contact-info__value">{info.value}</p>
                    <p className="contact-info__text">{info.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <div className="container-lg px-3 px-sm-4">
          <div className="contact-form__card">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="contact-form__icon">
                <MessageSquare className="contact-form__icon-svg" />
              </div>
              <div>
                <h2 className="contact-form__title">
                  Nachricht senden
                </h2>
                <p className="contact-form__subtitle">
                  Füllen Sie das Formular aus und wir melden uns bei Ihnen
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form__fields">
              <div className="row g-4">
                {/* Name */}
                <div className="col-12 col-sm-6">
                  <label htmlFor="name" className="contact-form__label">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="contact-form__input form-control"
                    placeholder="Ihr Name"
                  />
                </div>

                {/* Email */}
                <div className="col-12 col-sm-6">
                  <label htmlFor="email" className="contact-form__label">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="contact-form__input form-control"
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="contact-form__label">
                  Betreff
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-form__input form-select"
                >
                  <option value="">Bitte wählen...</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="contact-form__label">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="contact-form__input form-control"
                  placeholder="Wie können wir Ihnen helfen?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-form__submit"
              >
                {isSubmitting ? (
                  <>
                    <div className="contact-form__spinner" />
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <Send className="contact-form__submit-icon" />
                    <span>Nachricht senden</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Hint */}
      <section className="contact-faq">
        <div className="container-md px-3 px-sm-4 text-center">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <AlertCircle className="contact-faq__icon" />
            <span className="contact-faq__label">
              Schnelle Hilfe benötigt?
            </span>
          </div>
          <p className="contact-faq__text">
            Viele Fragen werden bereits in unseren FAQ beantwortet.
          </p>
          <a
            href="/#faq"
            className="contact-faq__link"
          >
            Zu den häufig gestellten Fragen
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
