import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Trash2, Loader2 } from 'lucide-react';
import { isValidUsername, getRecentSearches, clearRecentSearches } from '@/lib/instagram-api';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedUsername = username.trim().replace('@', '');
    
    if (!trimmedUsername) {
      setError('Bitte geben Sie einen Benutzernamen ein');
      return;
    }
    
    if (!isValidUsername(trimmedUsername)) {
      setError('Ungültiger Benutzername. Nur Buchstaben, Zahlen, Punkte und Unterstriche erlaubt.');
      return;
    }
    
    setError('');
    setShowDropdown(false);
    onSearch(trimmedUsername);
  };

  const handleRecentSearch = (search: string) => {
    setUsername(search);
    setShowDropdown(false);
    onSearch(search);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleClear = () => {
    setUsername('');
    setError('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="position-relative">
        <div className="search-bar__wrapper position-relative">
          {/* Gradient Border Effect */}
          <div className="search-bar__border" />
          
          {/* Input Container */}
          <div className="search-bar__container d-flex align-items-center">
            <div className="search-bar__icon">
              <Search className="search-bar__icon-svg" />
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Benutzername eingeben..."
              className="search-bar__input form-control"
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
            />
            
            {username && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="search-bar__clear-btn btn btn-link"
              >
                <X className="search-bar__clear-icon" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="search-bar__submit btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="search-bar__loader" />
                  <span className="d-none d-sm-inline">Suchen...</span>
                </>
              ) : (
                <>
                  <Search className="search-bar__submit-icon" />
                  <span className="d-none d-sm-inline">Suchen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="search-bar__error text-center">{error}</p>
        )}
      </form>

      {/* Recent Searches Dropdown */}
      {showDropdown && recentSearches.length > 0 && !isLoading && (
        <div className="search-bar__dropdown">
          <div className="search-bar__dropdown-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <Clock className="search-bar__dropdown-icon" />
              <span>Letzte Suchen</span>
            </div>
            <button
              onClick={handleClearRecent}
              className="search-bar__clear-recent btn btn-link"
            >
              <Trash2 className="search-bar__clear-recent-icon" />
              <span>Löschen</span>
            </button>
          </div>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRecentSearch(search)}
                  className="search-bar__dropdown-item"
                >
                  <div className="search-bar__avatar">
                    <span className="search-bar__avatar-text">
                      {search.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="search-bar__username">@{search}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
