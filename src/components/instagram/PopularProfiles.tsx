import React from 'react';
import { TrendingUp } from 'lucide-react';

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
    Sport: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Influencer: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    Entertainment: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    Musik: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    Mode: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Beliebte Profile
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entdecken Sie die meistgesuchten Profile
            </p>
          </div>
        </div>

        {/* Profile Chips */}
        <div className="flex flex-wrap gap-3">
          {popularProfiles.map((profile, index) => (
            <button
              key={index}
              onClick={() => onProfileClick(profile.username)}
              className="group flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all"
            >
              {/* Avatar Placeholder */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Info */}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  @{profile.username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {profile.name}
                </p>
              </div>
              
              {/* Category Badge */}
              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[profile.category] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
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
