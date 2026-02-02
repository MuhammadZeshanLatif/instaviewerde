import React from 'react';
import { LucideIcon } from 'lucide-react';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description,
  gradient = 'from-purple-600 to-pink-500'
}) => {
  const gradientClass = gradient.includes('purple')
    ? 'feature-card--purple'
    : gradient.includes('pink')
      ? 'feature-card--pink'
      : gradient.includes('orange')
        ? 'feature-card--orange'
        : gradient.includes('green')
          ? 'feature-card--green'
          : gradient.includes('blue')
            ? 'feature-card--blue'
            : 'feature-card--purple';

  return (
    <div className={`feature-card ${gradientClass}`}>
      {/* Background Gradient on Hover */}
      <div className="feature-card__overlay" />
      
      {/* Icon */}
      <div className="feature-card__icon">
        <Icon className="feature-card__icon-svg" />
      </div>
      
      {/* Content */}
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </div>
  );
};

export default FeatureCard;
