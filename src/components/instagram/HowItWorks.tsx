import React from 'react';
import { Search, Eye, Download, ArrowRight } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Benutzername eingeben',
      description: 'Geben Sie den Instagram-Benutzernamen in das Suchfeld ein.',
      gradient: 'from-purple-600 to-purple-400',
    },
    {
      number: '02',
      icon: Eye,
      title: 'Inhalte ansehen',
      description: 'Durchsuchen Sie Stories, Beiträge, Reels und Highlights anonym.',
      gradient: 'from-pink-600 to-pink-400',
    },
    {
      number: '03',
      icon: Download,
      title: 'Herunterladen & Teilen',
      description: 'Laden Sie Medien herunter oder teilen Sie sie mit Freunden.',
      gradient: 'from-orange-500 to-orange-400',
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container-xl px-3 px-sm-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="how-it-works__title">
            So funktioniert es
          </h2>
          <p className="how-it-works__subtitle">
            In nur drei einfachen Schritten können Sie Instagram-Inhalte anonym ansehen und herunterladen.
          </p>
        </div>

        {/* Steps */}
        <div className="row g-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const stepClass = step.gradient.includes('purple')
              ? 'how-it-works__step--purple'
              : step.gradient.includes('pink')
                ? 'how-it-works__step--pink'
                : 'how-it-works__step--orange';
            return (
              <div key={index} className="col-12 col-md-4 position-relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="how-it-works__connector d-none d-md-block">
                    <ArrowRight className="how-it-works__connector-icon" />
                  </div>
                )}
                
                {/* Card */}
                <div className={`how-it-works__card ${stepClass}`}>
                  {/* Step Number */}
                  <div className="how-it-works__number">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="how-it-works__icon">
                    <Icon className="how-it-works__icon-svg" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="how-it-works__step-title">
                    {step.title}
                  </h3>
                  <p className="how-it-works__step-text">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
