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
    const data = await res.json();
    const source = data?.profile ?? data;
    const pickString = (...values: unknown[]) =>
      values.find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
    const pickNumber = (...values: unknown[]) =>
      values.find((value) => typeof value === 'number' && !Number.isNaN(value)) as number | undefined;
    const pickBoolean = (...values: unknown[]) =>
      values.find((value) => typeof value === 'boolean') as boolean | undefined;

    const normalizedProfile: Profile = {
      username: pickString(source?.username, data?.username) || username,
      fullName: pickString(source?.fullName, source?.full_name, data?.fullName, data?.full_name) || '',
      biography: pickString(source?.biography, data?.biography) || '',
      profilePicUrl:
        pickString(
          source?.profilePicUrl,
          source?.profile_pic_url,
          source?.profile_pic_url_hd,
          data?.profilePicUrl,
          data?.profile_pic_url,
          data?.profile_pic_url_hd,
        ) || '',
      postsCount:
        pickNumber(
          source?.postsCount,
          source?.posts_count,
          source?.media_count,
          source?.posts,
          data?.postsCount,
          data?.posts_count,
          data?.media_count,
          data?.posts,
        ) || 0,
      followersCount:
        pickNumber(
          source?.followersCount,
          source?.followers_count,
          source?.followers,
          source?.edge_followed_by?.count,
          data?.followersCount,
          data?.followers_count,
          data?.followers,
          data?.edge_followed_by?.count,
        ) || 0,
      followingCount:
        pickNumber(
          source?.followingCount,
          source?.following_count,
          source?.following,
          source?.edge_follow?.count,
          data?.followingCount,
          data?.following_count,
          data?.following,
          data?.edge_follow?.count,
        ) || 0,
      isPrivate:
        pickBoolean(source?.isPrivate, source?.is_private, data?.isPrivate, data?.is_private) || false,
      isVerified:
        pickBoolean(source?.isVerified, source?.is_verified, data?.isVerified, data?.is_verified) || false,
      externalUrl: pickString(
        source?.externalUrl,
        source?.external_url,
        data?.externalUrl,
        data?.external_url,
      ),
    };

    return normalizedProfile;
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
