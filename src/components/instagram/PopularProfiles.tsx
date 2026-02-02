import React from 'react';
import { TrendingUp } from 'lucide-react';
import './PopularProfiles.css';

interface PopularProfilesProps {
  onProfileClick: (username: string) => void;
}

const PopularProfiles: React.FC<PopularProfilesProps> = ({ onProfileClick }) => {
  const popularProfiles = [
    { username: 'cristiano', name: 'Cristiano Ronaldo', category: 'Sport' },
    { username: 'leomessi', name: 'Lionel Messi', category: 'Sport' },
    { username: 'kyliejenner', name: 'Kylie Jenner', category: 'Influencer' },
    { username: 'therock', name: 'Dwayne Johnson', category: 'Entertainment' },
    { username: 'selenagomez', name: 'Selena Gomez', category: 'Musik' },
    { username: 'kimkardashian', name: 'Kim Kardashian', category: 'Influencer' },
    { username: 'beyonce', name: 'Beyoncé', category: 'Musik' },
    { username: 'justinbieber', name: 'Justin Bieber', category: 'Musik' },
    { username: 'arianagrande', name: 'Ariana Grande', category: 'Musik' },
    { username: 'kendalljenner', name: 'Kendall Jenner', category: 'Mode' },
    { username: 'taylorswift', name: 'Taylor Swift', category: 'Musik' },
    { username: 'neymarjr', name: 'Neymar Jr', category: 'Sport' },
  ];

  const categoryColors: Record<string, string> = {
    Sport: 'popular-profiles__badge--green',
    Influencer: 'popular-profiles__badge--pink',
    Entertainment: 'popular-profiles__badge--purple',
    Musik: 'popular-profiles__badge--blue',
    Mode: 'popular-profiles__badge--orange',
  };

  return (
    <section className="popular-profiles py-4 py-sm-5">
      <div className="container-xl px-3 px-sm-4">
        {/* Section Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="popular-profiles__icon">
            <TrendingUp className="popular-profiles__icon-svg" />
          </div>
          <div>
            <h2 className="popular-profiles__title">
              Beliebte Profile
            </h2>
            <p className="popular-profiles__subtitle">
              Entdecken Sie die meistgesuchten Profile
            </p>
          </div>
        </div>

        {/* Profile Chips */}
        <div className="popular-profiles__list">
          {popularProfiles.map((profile, index) => (
            <button
              key={index}
              onClick={() => onProfileClick(profile.username)}
              className="popular-profiles__chip"
            >
              {/* Avatar Placeholder */}
              <div className="popular-profiles__avatar">
                <span className="popular-profiles__avatar-text">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Info */}
              <div className="text-start">
                <p className="popular-profiles__username">
                  @{profile.username}
                </p>
                <p className="popular-profiles__name">
                  {profile.name}
                </p>
              </div>
              
              {/* Category Badge */}
              <span className={`popular-profiles__badge ${categoryColors[profile.category] || 'popular-profiles__badge--gray'}`}>
                {profile.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProfiles;
