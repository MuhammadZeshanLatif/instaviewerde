import React from 'react';
import { PlayCircle, Grid3X3, Film, Star } from 'lucide-react';

export type TabType = 'stories' | 'posts' | 'reels' | 'highlights';

interface ContentTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  storiesCount?: number;
  postsCount?: number;
  reelsCount?: number;
  highlightsCount?: number;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  onTabChange,
  storiesCount = 0,
  postsCount = 0,
  reelsCount = 0,
  highlightsCount = 0,
}) => {
  const tabs = [
    { id: 'stories' as TabType, label: 'Stories', icon: PlayCircle, count: storiesCount },
    { id: 'posts' as TabType, label: 'Beiträge', icon: Grid3X3, count: postsCount },
    { id: 'reels' as TabType, label: 'Reels', icon: Film, count: reelsCount },
    { id: 'highlights' as TabType, label: 'Highlights', icon: Star, count: highlightsCount },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : ''}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContentTabs;
