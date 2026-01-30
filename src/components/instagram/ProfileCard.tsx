import React from 'react';
import { BadgeCheck, Lock, ExternalLink, Users, UserPlus, Grid3X3 } from 'lucide-react';
import { Profile, formatNumber, getProxiedUrl } from '@/lib/instagram-api';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const profileImageUrl = profile.profilePicUrl 
    ? getProxiedUrl(profile.profilePicUrl) || profile.profilePicUrl
    : '';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Gradient Header */}
        <div className="h-24 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400" />
        
        <div className="px-6 pb-6">
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                    {profile.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {profile.isPrivate && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <Lock className="w-3.5 h-3.5 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left sm:pb-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  @{profile.username}
                </h2>
                {profile.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />
                )}
              </div>
              {profile.fullName && (
                <p className="text-gray-600 dark:text-gray-300 mt-0.5">{profile.fullName}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Grid3X3 className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(profile.postsCount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Beiträge</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Users className="w-4 h-4 text-pink-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(profile.followersCount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Follower</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <UserPlus className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(profile.followingCount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Folgt</p>
            </div>
          </div>

          {/* Bio */}
          {profile.biography && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {profile.biography}
              </p>
            </div>
          )}

          {/* External Link */}
          {profile.externalUrl && (
            <a
              href={profile.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-orange-400/10 text-purple-600 dark:text-purple-400 rounded-xl hover:from-purple-600/20 hover:via-pink-500/20 hover:to-orange-400/20 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="truncate max-w-xs">{profile.externalUrl}</span>
            </a>
          )}

          {/* Private Account Warning */}
          {profile.isPrivate && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">Privates Konto</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Dieses Konto ist privat. Stories und Beiträge können nur von genehmigten Followern angesehen werden.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
