export type PlatformType =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'spotify'
  | 'apple_music'
  | 'trends'
  | string;

export interface SocialAccount {
  id: string;
  platform: PlatformType;
  platformName: string;
  accountId: string;
  accountName: string;
  handle: string;
  profileUrl: string;
  avatarUrl: string;
  status: 'connected' | 'syncing' | 'needs_reauth' | 'disconnected';
  lastSync: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  scopes: string[];
  followers: number;
  reach: number;
  engagement: number; // e.g. 5.2%
  views: number;
  growthMoM: number; // e.g. 18.4%
  isCustom?: boolean;
}

export interface Metric {
  id: string;
  socialAccountId: string;
  platform: string;
  date: string; // YYYY-MM-DD
  followers: number;
  reach: number;
  impressions: number;
  views: number;
  engagement: number;
  clicks: number;
  saves: number;
  shares: number;
  streams: number;
  watchTimeHours: number;
}

export type ContentStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'scheduled'
  | 'published';

export type ContentApproval = 'pending' | 'approved' | 'changes_requested';

export interface ContentItem {
  id: string;
  title: string;
  platform: PlatformType;
  dateTime: string; // ISO
  caption: string;
  hashtags: string[];
  mediaUrl: string;
  mediaType: 'video' | 'image' | 'carousel' | 'audio';
  campaignId: string;
  campaignName: string;
  contentType:
    | 'Reel'
    | 'Story'
    | 'Photo'
    | 'Lyric Video'
    | 'BTS'
    | 'Poster'
    | 'Live Clip'
    | 'Shorts';
  status: ContentStatus;
  approvalStatus: ContentApproval;
  notes?: string;
  performance?: {
    views: number;
    likes: number;
    saves: number;
    comments: number;
  };
}

export type AssetFolder =
  | 'Posters'
  | 'Reels'
  | 'Stories'
  | 'Photos'
  | 'Lyric videos'
  | 'BTS'
  | 'Covers'
  | 'Logos'
  | 'Brand assets';

export interface LibraryAsset {
  id: string;
  name: string;
  folder: AssetFolder;
  tags: string[];
  fileType: string;
  fileSize: string;
  url: string;
  aspectRatio: string;
  createdAt: string;
  campaign: string;
  usagesCount: number;
}

export interface SongRelease {
  id: string;
  title: string;
  version: string;
  releaseDate: string;
  distributor: string;
  isrc: string;
  upc: string;
  spotifyUrl: string;
  spotifyUri: string;
  appleMusicUrl: string;
  youtubeMusicUrl: string;
  coverArtwork: string;
  preSaveUrl: string;
  preSavesCount: number;
  preSaveGoal: number;
  teasers: {
    id: string;
    title: string;
    scheduledFor: string;
    status: 'planned' | 'posted';
    platform: string;
  }[];
  releaseContent: {
    id: string;
    title: string;
    type: string;
    status: 'ready' | 'pending';
  }[];
  influencerCampaign: string;
  adsBudget: number;
  adsSpend: number;
  results: {
    totalStreams: number;
    spotifyStreams: number;
    appleStreams: number;
    ytMusicStreams: number;
    playlistAdds: number;
    saves: number;
    milestonePassed: string;
  };
}

export interface Campaign {
  id: string;
  name: string;
  songId: string;
  songTitle: string;
  status: 'active' | 'planning' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
  creatorsContacted: number;
  creatorsConfirmed: number;
  postsPublished: number;
  reach: number;
  engagement: number;
  clicks: number;
  streams: number;
  costPerResult: {
    perStream: number;
    perClick: number;
    perPost: number;
  };
}

export type CreatorStatus =
  | 'Research'
  | 'Contacted'
  | 'Replied'
  | 'Negotiating'
  | 'Confirmed'
  | 'Posted'
  | 'Completed';

export interface CreatorCollaboration {
  id: string;
  creator: string;
  handle: string;
  avatar: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  followers: number;
  niche: string;
  location: string;
  contact: string;
  status: CreatorStatus;
  fee: number;
  deliverables: string;
  postingDate: string;
  reach: number;
  engagement: number;
  results: string;
  notes: string;
}

export type PlacementStatus =
  | 'Pitched'
  | 'Editorial Hero'
  | 'Editorial Rotation'
  | 'Indie Playlist'
  | 'Passed';

export interface PlaylistPitch {
  id: string;
  distributor: string;
  songTitle: string;
  submissionDate: string;
  playlistPitched: string;
  curator: string;
  response: 'Pending' | 'Accepted' | 'Passed' | 'In Review';
  placement: PlacementStatus;
  streams: number;
  notes: string;
  platform: 'Spotify' | 'Apple Music' | 'Amazon Music' | 'YouTube Music';
}

export interface PerformanceInsight {
  id: string;
  category: 'Content' | 'Audience' | 'Timing' | 'Campaign' | 'Conversion';
  title: string;
  description: string;
  metricHighlight: string;
  actionRecommendation: string;
  confidence: 'High' | 'Validated';
  iconType: 'target' | 'trending' | 'zap' | 'users' | 'repeat';
}

export interface ArtistProfile {
  name: string;
  avatarUrl: string;
  genre: string;
  tagline: string;
  label: string;
  manager: string;
  currentSingle: string;
  currency: string;
  timezone: string;
}
