import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Trash2, Loader2 } from 'lucide-react';
import { isValidUsername, getRecentSearches, clearRecentSearches } from '@/lib/instagram-api';

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
    <div className="w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Gradient Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl opacity-75 group-hover:opacity-100 blur transition-opacity" />
          
          {/* Input Container */}
          <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl">
            <div className="pl-4 pr-2 sm:pl-5">
              <Search className="w-5 h-5 text-gray-400" />
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
              className="flex-1 min-w-0 py-3 px-2 sm:py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 placeholder:text-sm sm:placeholder:text-base focus:outline-none text-base sm:text-lg"
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
            />
            
            {username && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="m-1 sm:m-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Suchen...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Suchen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
        )}
      </form>

      {/* Recent Searches Dropdown */}
      {showDropdown && recentSearches.length > 0 && !isLoading && (
        <div className="absolute z-50 w-full max-w-2xl mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Letzte Suchen</span>
            </div>
            <button
              onClick={handleClearRecent}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Löschen</span>
            </button>
          </div>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRecentSearch(search)}
                  className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-400/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {search.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">@{search}</span>
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
