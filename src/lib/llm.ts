/**
 * LLM Configuration for InstaViewer
 * 
 * This file contains configuration settings for Language Model integration.
 * Currently used for SEO content generation and text optimization.
 */

export interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  language: string;
}

// Default configuration for German language content
export const defaultLLMConfig: LLMConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2048,
  language: 'de',
};

// SEO-optimized prompts for German content
export const seoPrompts = {
  metaDescription: (topic: string) => 
    `Erstelle eine SEO-optimierte Meta-Beschreibung (max. 160 Zeichen) für: ${topic}`,
  
  blogTitle: (keyword: string) => 
    `Erstelle einen SEO-optimierten Blog-Titel mit dem Keyword: ${keyword}`,
  
  contentOutline: (topic: string) => 
    `Erstelle eine Gliederung für einen SEO-optimierten Artikel über: ${topic}`,
};

// German language keywords for Instagram-related content
export const seoKeywords = {
  primary: [
    'Instagram Story Viewer',
    'Instagram Stories anonym ansehen',
    'Instagram Downloader',
    'Instagram Beiträge herunterladen',
    'Instagram Reels speichern',
    'Instagram Highlights ansehen',
  ],
  secondary: [
    'kostenlos',
    'anonym',
    'ohne Anmeldung',
    'sicher',
    'schnell',
    'einfach',
    'online',
    'gratis',
  ],
  longTail: [
    'Instagram Stories anonym ansehen ohne Anmeldung',
    'Instagram Bilder herunterladen kostenlos',
    'Instagram Videos speichern online',
    'Instagram Profil anonym besuchen',
    'Instagram Reels herunterladen ohne App',
  ],
};

// Content templates for German language
export const contentTemplates = {
  howTo: {
    title: 'So {action} Sie {subject}',
    intro: 'In dieser Anleitung zeigen wir Ihnen Schritt für Schritt, wie Sie {subject} {action} können.',
    steps: [
      'Öffnen Sie InstaViewer in Ihrem Browser',
      'Geben Sie den Instagram-Benutzernamen ein',
      'Klicken Sie auf "Suchen"',
      'Wählen Sie den gewünschten Inhalt aus',
      'Klicken Sie auf "Herunterladen" oder "Ansehen"',
    ],
    conclusion: 'Mit InstaViewer können Sie {subject} schnell und einfach {action}. Der Service ist kostenlos und erfordert keine Anmeldung.',
  },
  
  faq: {
    title: 'Häufig gestellte Fragen zu {topic}',
    intro: 'Hier finden Sie Antworten auf die häufigsten Fragen zu {topic}.',
  },
  
  comparison: {
    title: '{subject1} vs. {subject2}: Was ist besser?',
    intro: 'Wir vergleichen {subject1} und {subject2}, um Ihnen bei der Entscheidung zu helfen.',
  },
};

// Schema.org structured data templates
export const structuredDataTemplates = {
  webApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'InstaViewer',
    description: 'Kostenloser Instagram Story Viewer - Stories, Beiträge und Reels anonym ansehen und herunterladen',
    url: 'https://instaviewer.de',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  },
  
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),
  
  howTo: (title: string, steps: string[]) => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  }),
  
  article: (article: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified: string;
    image?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: article.image,
    publisher: {
      '@type': 'Organization',
      name: 'InstaViewer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://instaviewer.de/logo.png',
      },
    },
  }),
};

// Helper function to generate meta tags
export function generateMetaTags(page: {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}) {
  return {
    title: page.title,
    meta: [
      { name: 'description', content: page.description },
      { name: 'keywords', content: page.keywords?.join(', ') || '' },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: page.canonicalUrl || '' },
      { property: 'og:image', content: page.ogImage || '' },
      { property: 'og:locale', content: 'de_DE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: page.ogImage || '' },
    ],
    link: [
      { rel: 'canonical', href: page.canonicalUrl || '' },
    ],
  };
}

export default {
  defaultLLMConfig,
  seoPrompts,
  seoKeywords,
  contentTemplates,
  structuredDataTemplates,
  generateMetaTags,
};
