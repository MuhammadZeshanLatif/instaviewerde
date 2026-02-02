import React, { useEffect, useState } from 'react';
import { BadgeCheck, Lock, ExternalLink, Users, UserPlus, Grid3X3 } from 'lucide-react';
import { Profile, formatNumber, getProxiedUrl } from '@/lib/instagram-api';
import './ProfileCard.css';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const directProfileImageUrl = profile.profilePicUrl || '';
  const proxiedProfileImageUrl = directProfileImageUrl ? getProxiedUrl(directProfileImageUrl) : '';
  const [imageSrc, setImageSrc] = useState(proxiedProfileImageUrl || directProfileImageUrl);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setImageSrc(proxiedProfileImageUrl || directProfileImageUrl);
  }, [directProfileImageUrl, proxiedProfileImageUrl]);

  return (
    <div className="profile-card-container mx-auto">
      <div className="profile-card card shadow border-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="profile-card__header" />
        
        <div className="card-body profile-card__body">
          {/* Profile Image */}
          <div className="profile-card__top d-flex flex-column flex-sm-row align-items-center align-items-sm-end gap-3">
            <div className="position-relative">
              <div className="profile-card__avatar">
                {imageSrc && !imageError ? (
                  <img
                    src={imageSrc}
                    alt={profile.username}
                    className="profile-card__avatar-img"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (imageSrc === proxiedProfileImageUrl && directProfileImageUrl) {
                        setImageSrc(directProfileImageUrl);
                        return;
                      }
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="profile-card__avatar-fallback">
                    {profile.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {profile.isPrivate && (
                <div className="profile-card__lock">
                  <Lock className="profile-card__lock-icon" />
                </div>
              )}
            </div>
            
            <div className="flex-grow-1 text-center text-sm-start">
              <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                <h2 className="profile-card__username">@{profile.username}</h2>
                {profile.isVerified && (
                  <BadgeCheck className="profile-card__verified" />
                )}
              </div>
              {profile.fullName && (
                <p className="profile-card__fullname">{profile.fullName}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="row g-2 g-sm-3 mt-4 profile-card__stats">
            <div className="col-4">
              <div className="profile-card__stat text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                  <Grid3X3 className="profile-card__stat-icon profile-card__stat-icon--purple" />
                </div>
                <p className="profile-card__stat-number">{formatNumber(profile.postsCount)}</p>
                <p className="profile-card__stat-label">Beiträge</p>
              </div>
            </div>
            <div className="col-4">
              <div className="profile-card__stat text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                  <Users className="profile-card__stat-icon profile-card__stat-icon--pink" />
                </div>
                <p className="profile-card__stat-number">{formatNumber(profile.followersCount)}</p>
                <p className="profile-card__stat-label">Follower</p>
              </div>
            </div>
            <div className="col-4">
              <div className="profile-card__stat text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                  <UserPlus className="profile-card__stat-icon profile-card__stat-icon--orange" />
                </div>
                <p className="profile-card__stat-number">{formatNumber(profile.followingCount)}</p>
                <p className="profile-card__stat-label">Folgt</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.biography && (
            <div className="profile-card__bio">
              <p className="profile-card__bio-text">{profile.biography}</p>
            </div>
          )}

          {/* External Link */}
          {profile.externalUrl && (
            <a
              href={profile.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card__link btn btn-light w-100 mt-3"
            >
              <ExternalLink className="profile-card__link-icon" />
              <span className="profile-card__link-text text-truncate">{profile.externalUrl}</span>
            </a>
          )}

          {/* Private Account Warning */}
          {profile.isPrivate && (
            <div className="profile-card__private alert alert-warning mt-4 mb-0">
              <div className="d-flex align-items-start gap-2">
                <Lock className="profile-card__private-icon" />
                <div>
                  <p className="profile-card__private-title">Privates Konto</p>
                  <p className="profile-card__private-text">
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
