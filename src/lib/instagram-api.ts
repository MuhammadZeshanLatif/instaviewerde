// Instagram API Service
const API_URL = 'https://api.theinstaviewer.com/api';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

export interface Post {
  id: string;
  shortcode: string;
  username: string;
  mediaUrls: MediaItem[];
  caption?: string;
  timestamp?: string;
  likeCount?: number;
  commentCount?: number;
}

export interface Profile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isPrivate: boolean;
  isVerified: boolean;
  externalUrl?: string;
}

export interface StoriesResponse {
  stories?: Post[];
  posts?: Post[];
}

export interface PostsResponse {
  posts: Post[];
}

// Fetch Instagram profile
export async function fetchProfile(username: string): Promise<Profile> {
  try {
    const res = await fetch(`${API_URL}/stalk/profile?username=${username}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Profil konnte nicht geladen werden: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error in fetchProfile:", error);
    throw error;
  }
}

// Fetch Instagram posts
export async function fetchPosts(username: string): Promise<PostsResponse> {
  try {
    const res = await fetch(`${API_URL}/stalk/posts?username=${username}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Beiträge konnten nicht geladen werden: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error in fetchPosts:", error);
    throw error;
  }
}

// Fetch Instagram stories
export async function fetchStories(username: string): Promise<StoriesResponse> {
  try {
    const res = await fetch(`${API_URL}/stalk/stories?username=${username}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Stories konnten nicht geladen werden: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error in fetchStories:", error);
    throw error;
  }
}

// Fetch Instagram reels
export async function fetchReels(username: string): Promise<PostsResponse> {
  try {
    const res = await fetch(`${API_URL}/stalk/reels?username=${username}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Reels konnten nicht geladen werden: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error in fetchReels:", error);
    throw error;
  }
}

// Fetch Instagram highlights
export async function fetchHighlights(username: string): Promise<PostsResponse> {
  try {
    const res = await fetch(`${API_URL}/stalk/highlights?username=${username}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Highlights konnten nicht geladen werden: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error in fetchHighlights:", error);
    throw error;
  }
}

// Get proxied media URL to avoid CORS issues
export function getProxiedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/api/media?url=')) return url;
  
  let finalUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    try {
      const decoded = decodeURIComponent(url);
      if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
        finalUrl = decoded;
      } else {
        return '';
      }
    } catch {
      return '';
    }
  }
  
  return `${API_URL}/media?url=${encodeURIComponent(finalUrl)}`;
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// Validate Instagram username
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;
  return usernameRegex.test(username);
}

// Recent searches management
export function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  } catch {
    return [];
  }
}

export function addToRecentSearches(username: string): void {
  try {
    let recentSearches = getRecentSearches();
    recentSearches = recentSearches.filter(search => search.toLowerCase() !== username.toLowerCase());
    recentSearches.unshift(username);
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  } catch {
    // Ignore localStorage errors
  }
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem('recentSearches');
  } catch {
    // Ignore localStorage errors
  }
}
