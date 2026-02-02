import React from 'react';
import { PlayCircle, Grid3X3, Film, Star } from 'lucide-react';
import './ContentTabs.css';

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
    <div className="content-tabs mx-auto">
      <div className="content-tabs__bar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`content-tabs__button ${isActive ? 'is-active' : ''}`}
            >
              <Icon className="content-tabs__icon" />
              <span className="d-none d-sm-inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`content-tabs__badge ${isActive ? 'is-active' : ''}`}>
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
