import React from 'react';
import { Search, Eye, Download, ArrowRight } from 'lucide-react';

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            So funktioniert es
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            In nur drei einfachen Schritten können Sie Instagram-Inhalte anonym ansehen und herunterladen.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent -translate-x-1/2 z-0">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
                
                {/* Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center z-10">
                  {/* Step Number */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r ${step.gradient} text-white text-sm font-bold rounded-full`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 mt-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
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
