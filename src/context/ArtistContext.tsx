import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SocialAccount,
  Metric,
  ContentItem,
  LibraryAsset,
  SongRelease,
  Campaign,
  CreatorCollaboration,
  PlaylistPitch,
  PerformanceInsight,
  ArtistProfile,
  ContentStatus,
  ContentApproval,
} from '../types';
import {
  freshArtistProfile,
  freshSocialAccounts,
  sampleDemoArtistProfile,
  sampleDemoSocialAccounts,
  generateDailyMetrics,
  sampleDemoContentItems,
  sampleDemoLibraryAssets,
  sampleDemoSongReleases,
  sampleDemoCampaigns,
  sampleDemoCollaborations,
  sampleDemoPlaylistPitches,
  initialPerformanceInsights,
  initialAudienceData,
} from '../data/mockData';

interface ArtistContextType {
  artistProfile: ArtistProfile;
  socialAccounts: SocialAccount[];
  metrics: Metric[];
  contentItems: ContentItem[];
  libraryAssets: LibraryAsset[];
  releases: SongRelease[];
  campaigns: Campaign[];
  collaborations: CreatorCollaboration[];
  playlistPitches: PlaylistPitch[];
  insights: PerformanceInsight[];
  audienceData: typeof initialAudienceData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isFreshWorkspace: boolean;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
  // Account Actions
  connectSocialAccount: (account: Partial<SocialAccount>) => void;
  syncSocialAccount: (accountId: string) => Promise<void>;
  disconnectSocialAccount: (accountId: string) => void;
  // Content Actions
  addContentItem: (item: Omit<ContentItem, 'id'>) => void;
  updateContentItem: (item: ContentItem) => void;
  deleteContentItem: (id: string) => void;
  updateContentStatus: (id: string, status: ContentStatus) => void;
  updateContentApproval: (id: string, approval: ContentApproval) => void;
  // Library Actions
  addLibraryAsset: (asset: Omit<LibraryAsset, 'id' | 'createdAt'>) => void;
  deleteLibraryAsset: (id: string) => void;
  // Release Actions
  addSongRelease: (release: Omit<SongRelease, 'id'>) => void;
  updateSongRelease: (release: SongRelease) => void;
  // Campaign Actions
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (campaign: Campaign) => void;
  // Creator CRM Actions
  addCreator: (creator: Omit<CreatorCollaboration, 'id'>) => void;
  updateCreator: (creator: CreatorCollaboration) => void;
  deleteCreator: (id: string) => void;
  // Playlist Pitch Actions
  addPlaylistPitch: (pitch: Omit<PlaylistPitch, 'id'>) => void;
  updatePlaylistPitch: (pitch: PlaylistPitch) => void;
  // Profile & System Actions
  updateArtistProfile: (profile: ArtistProfile) => void;
  startFreshWorkspace: () => void;
  loadSampleData: () => void;
  resetDemoData: () => void;
  generateStarterActivity: () => void;
  quickSeedStarterPipeline: () => void;
  quickConnectAllStarterAccounts: () => void;
  // Sync state
  syncingAccountId: string | null;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

const STORAGE_KEY = 'sonance_artist_platform_v3';

export const ArtistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [syncingAccountId, setSyncingAccountId] = useState<string | null>(null);

  // Check if user has initialized or onboarded before
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_onboarded`);
    return saved === 'true';
  });

  const [isFreshWorkspace, setIsFreshWorkspace] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_is_fresh`);
    return saved !== 'false'; // Fresh by default
  });

  const [artistProfile, setArtistProfile] = useState<ArtistProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : freshArtistProfile;
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_accounts`);
    return saved ? JSON.parse(saved) : freshSocialAccounts;
  });

  const [metrics, setMetrics] = useState<Metric[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_metrics`);
    return saved ? JSON.parse(saved) : [];
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_content`);
    return saved ? JSON.parse(saved) : [];
  });

  const [libraryAssets, setLibraryAssets] = useState<LibraryAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_assets`);
    return saved ? JSON.parse(saved) : [];
  });

  const [releases, setReleases] = useState<SongRelease[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_releases`);
    return saved ? JSON.parse(saved) : [];
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : [];
  });

  const [collaborations, setCollaborations] = useState<CreatorCollaboration[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_collabs`);
    return saved ? JSON.parse(saved) : [];
  });

  const [playlistPitches, setPlaylistPitches] = useState<PlaylistPitch[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_playlists`);
    return saved ? JSON.parse(saved) : [];
  });

  const [insights] = useState<PerformanceInsight[]>(initialPerformanceInsights);
  const [audienceData] = useState(initialAudienceData);

  // Persistence
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_onboarded`, isOnboarded ? 'true' : 'false');
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_is_fresh`, isFreshWorkspace ? 'true' : 'false');
  }, [isFreshWorkspace]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(artistProfile));
  }, [artistProfile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_accounts`, JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_metrics`, JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_content`, JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_assets`, JSON.stringify(libraryAssets));
  }, [libraryAssets]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_releases`, JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_collabs`, JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_playlists`, JSON.stringify(playlistPitches));
  }, [playlistPitches]);

  // Actions
  const connectSocialAccount = (accountData: Partial<SocialAccount>) => {
    const newId = accountData.id || `acc_${Date.now()}`;
    const newAccount: SocialAccount = {
      id: newId,
      platform: accountData.platform || 'custom',
      platformName: accountData.platformName || 'Custom Platform',
      accountId: accountData.accountId || `id_${Date.now()}`,
      accountName: accountData.accountName || artistProfile.name || 'Artist Account',
      handle: accountData.handle || `@${(artistProfile.name || 'artist').toLowerCase().replace(/\s+/g, '')}`,
      profileUrl: accountData.profileUrl || `https://${accountData.platform}.com/${artistProfile.name}`,
      avatarUrl: accountData.avatarUrl || artistProfile.avatarUrl || '/src/assets/images/artist_press_photo_1791446727519.jpg',
      status: 'connected',
      lastSync: 'Just now',
      accessToken: accountData.accessToken || `tok_${Math.random().toString(36).substring(2, 15)}`,
      refreshToken: accountData.refreshToken || `ref_${Math.random().toString(36).substring(2, 15)}`,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      scopes: accountData.scopes || ['read_insights', 'profile_basic'],
      followers: accountData.followers !== undefined ? accountData.followers : 1250,
      reach: accountData.reach !== undefined ? accountData.reach : 4200,
      engagement: accountData.engagement !== undefined ? accountData.engagement : 4.5,
      views: accountData.views !== undefined ? accountData.views : 6800,
      growthMoM: accountData.growthMoM !== undefined ? accountData.growthMoM : 8.5,
      isCustom: accountData.isCustom ?? false,
    };

    setSocialAccounts((prev) => {
      const existingIdx = prev.findIndex((a) => a.platform === newAccount.platform);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], ...newAccount, status: 'connected', lastSync: 'Just now' };
        return copy;
      }
      return [...prev, newAccount];
    });

    // Create initial Metric record
    const today = new Date().toISOString().split('T')[0];
    const newMetric: Metric = {
      id: `met_${newAccount.platform}_${today}`,
      socialAccountId: newAccount.id,
      platform: newAccount.platform,
      date: today,
      followers: newAccount.followers,
      reach: newAccount.reach,
      impressions: Math.round(newAccount.reach * 1.3),
      views: newAccount.views,
      engagement: newAccount.engagement,
      clicks: Math.round(newAccount.views * 0.03),
      saves: Math.round(newAccount.views * 0.05),
      shares: Math.round(newAccount.views * 0.02),
      streams: newAccount.platform.includes('spotify') || newAccount.platform.includes('apple') ? 1400 : 0,
      watchTimeHours: Math.round(newAccount.views * 0.01),
    };
    setMetrics((prev) => [...prev, newMetric]);
  };

  const syncSocialAccount = async (accountId: string) => {
    setSyncingAccountId(accountId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSocialAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          const delta = Math.floor(Math.random() * 45) + 5;
          return {
            ...acc,
            lastSync: 'Just now',
            status: 'connected',
            followers: acc.followers + delta,
            reach: acc.reach + Math.round(delta * 2.8),
            views: acc.views + Math.round(delta * 4.5),
          };
        }
        return acc;
      })
    );
    setSyncingAccountId(null);
  };

  const disconnectSocialAccount = (accountId: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, status: 'disconnected', lastSync: 'Disconnected' } : acc
      )
    );
  };

  const addContentItem = (item: Omit<ContentItem, 'id'>) => {
    const newItem: ContentItem = {
      ...item,
      id: `cnt_${Date.now()}`,
    };
    setContentItems((prev) => [newItem, ...prev]);
  };

  const updateContentItem = (item: ContentItem) => {
    setContentItems((prev) => prev.map((c) => (c.id === item.id ? item : c)));
  };

  const deleteContentItem = (id: string) => {
    setContentItems((prev) => prev.filter((c) => c.id !== id));
  };

  const updateContentStatus = (id: string, status: ContentStatus) => {
    setContentItems((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const updateContentApproval = (id: string, approvalStatus: ContentApproval) => {
    setContentItems((prev) => prev.map((c) => (c.id === id ? { ...c, approvalStatus } : c)));
  };

  const addLibraryAsset = (asset: Omit<LibraryAsset, 'id' | 'createdAt'>) => {
    const newAsset: LibraryAsset = {
      ...asset,
      id: `ast_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLibraryAssets((prev) => [newAsset, ...prev]);
  };

  const deleteLibraryAsset = (id: string) => {
    setLibraryAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const addSongRelease = (release: Omit<SongRelease, 'id'>) => {
    const newRel: SongRelease = {
      ...release,
      id: `rel_${Date.now()}`,
    };
    setReleases((prev) => [newRel, ...prev]);
  };

  const updateSongRelease = (release: SongRelease) => {
    setReleases((prev) => prev.map((r) => (r.id === release.id ? release : r)));
  };

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCmp: Campaign = {
      ...campaign,
      id: `cmp_${Date.now()}`,
    };
    setCampaigns((prev) => [newCmp, ...prev]);
  };

  const updateCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === campaign.id ? campaign : c)));
  };

  const addCreator = (creator: Omit<CreatorCollaboration, 'id'>) => {
    const newCr: CreatorCollaboration = {
      ...creator,
      id: `cr_${Date.now()}`,
    };
    setCollaborations((prev) => [newCr, ...prev]);
  };

  const updateCreator = (creator: CreatorCollaboration) => {
    setCollaborations((prev) => prev.map((c) => (c.id === creator.id ? creator : c)));
  };

  const deleteCreator = (id: string) => {
    setCollaborations((prev) => prev.filter((c) => c.id !== id));
  };

  const addPlaylistPitch = (pitch: Omit<PlaylistPitch, 'id'>) => {
    const newPitch: PlaylistPitch = {
      ...pitch,
      id: `pl_${Date.now()}`,
    };
    setPlaylistPitches((prev) => [newPitch, ...prev]);
  };

  const updatePlaylistPitch = (pitch: PlaylistPitch) => {
    setPlaylistPitches((prev) => prev.map((p) => (p.id === pitch.id ? pitch : p)));
  };

  const updateArtistProfile = (profile: ArtistProfile) => {
    setArtistProfile(profile);
  };

  // Switch to a fresh clean workspace for a real artist to set up from scratch
  const startFreshWorkspace = () => {
    localStorage.clear();
    setIsFreshWorkspace(true);
    setIsOnboarded(false);
    setArtistProfile(freshArtistProfile);
    setSocialAccounts(freshSocialAccounts);
    setMetrics([]);
    setContentItems([]);
    setLibraryAssets([]);
    setReleases([]);
    setCampaigns([]);
    setCollaborations([]);
    setPlaylistPitches([]);
  };

  // Optional: Load sample demo data so user can explore a full pre-populated artist
  const loadSampleData = () => {
    setIsFreshWorkspace(false);
    setIsOnboarded(true);
    setArtistProfile(sampleDemoArtistProfile);
    setSocialAccounts(sampleDemoSocialAccounts);
    setMetrics(generateDailyMetrics(false));
    setContentItems(sampleDemoContentItems);
    setLibraryAssets(sampleDemoLibraryAssets);
    setReleases(sampleDemoSongReleases);
    setCampaigns(sampleDemoCampaigns);
    setCollaborations(sampleDemoCollaborations);
    setPlaylistPitches(sampleDemoPlaylistPitches);
  };

  // Generate realistic starter 30-day activity telemetry for the artist's accounts
  const generateStarterActivity = () => {
    let accountsToUse = socialAccounts.filter((a) => a.status === 'connected');
    if (accountsToUse.length === 0) {
      quickConnectAllStarterAccounts();
      return;
    }

    const newMetrics: Metric[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const factor = (30 - i) / 30;

      accountsToUse.forEach((acc) => {
        const baseFollowers = Math.max(100, Math.round(acc.followers * (0.85 + factor * 0.15)));
        const dailyViews = Math.round((acc.views / 30) * (0.7 + Math.random() * 0.6));
        const dailyReach = Math.round(dailyViews * 0.65);
        const dailyEng = Number((acc.engagement * (0.8 + Math.random() * 0.4)).toFixed(1));

        newMetrics.push({
          id: `met_${acc.platform}_${dateStr}`,
          socialAccountId: acc.id,
          platform: acc.platform,
          date: dateStr,
          followers: baseFollowers,
          reach: dailyReach,
          impressions: Math.round(dailyReach * 1.3),
          views: dailyViews,
          engagement: dailyEng,
          clicks: Math.round(dailyViews * 0.035),
          saves: Math.round(dailyViews * 0.06),
          shares: Math.round(dailyViews * 0.02),
          streams:
            acc.platform.includes('spotify') || acc.platform.includes('apple')
              ? Math.round(dailyViews * 0.45)
              : 0,
          watchTimeHours: Math.round(dailyViews * 0.015),
        });
      });
    }
    setMetrics(newMetrics);
  };

  const quickConnectAllStarterAccounts = () => {
    const artistNameSlug = (artistProfile.name || 'artist').toLowerCase().replace(/\s+/g, '');
    const updated = socialAccounts.map((acc) => {
      if (acc.platform === 'instagram') {
        return {
          ...acc,
          status: 'connected' as const,
          accountName: artistProfile.name || 'Artist Project',
          handle: `@${artistNameSlug}music`,
          profileUrl: `https://instagram.com/${artistNameSlug}music`,
          followers: 2450,
          reach: 8400,
          engagement: 5.2,
          views: 14200,
          growthMoM: 14.5,
          lastSync: 'Just now',
          accessToken: 'ig_vaulted_token_live',
        };
      }
      if (acc.platform === 'tiktok') {
        return {
          ...acc,
          status: 'connected' as const,
          accountName: artistProfile.name || 'Artist Project',
          handle: `@${artistNameSlug}.official`,
          profileUrl: `https://tiktok.com/@${artistNameSlug}.official`,
          followers: 4120,
          reach: 18900,
          engagement: 7.8,
          views: 29500,
          growthMoM: 22.4,
          lastSync: 'Just now',
          accessToken: 'tt_vaulted_token_live',
        };
      }
      if (acc.platform === 'spotify') {
        return {
          ...acc,
          status: 'connected' as const,
          accountName: artistProfile.name || 'Artist Project',
          handle: `spotify:artist:${artistNameSlug}`,
          profileUrl: `https://open.spotify.com/artist/${artistNameSlug}`,
          followers: 1280,
          reach: 6500,
          engagement: 6.1,
          views: 9200,
          growthMoM: 11.2,
          lastSync: 'Just now',
          accessToken: 'sp_vaulted_token_live',
        };
      }
      if (acc.platform === 'youtube') {
        return {
          ...acc,
          status: 'connected' as const,
          accountName: artistProfile.name || 'Artist Project',
          handle: `@${artistNameSlug}Official`,
          profileUrl: `https://youtube.com/@${artistNameSlug}Official`,
          followers: 890,
          reach: 4800,
          engagement: 4.9,
          views: 7400,
          growthMoM: 9.8,
          lastSync: 'Just now',
          accessToken: 'yt_vaulted_token_live',
        };
      }
      return acc;
    });

    setSocialAccounts(updated);

    const newMetrics: Metric[] = [];
    const today = new Date();
    const connectedOnes = updated.filter((a) => a.status === 'connected');

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const factor = (30 - i) / 30;

      connectedOnes.forEach((acc) => {
        const baseFollowers = Math.max(100, Math.round(acc.followers * (0.8 + factor * 0.2)));
        const dailyViews = Math.round((acc.views / 30) * (0.6 + Math.random() * 0.8));
        const dailyReach = Math.round(dailyViews * 0.65);
        const dailyEng = Number((acc.engagement * (0.8 + Math.random() * 0.4)).toFixed(1));

        newMetrics.push({
          id: `met_${acc.platform}_${dateStr}`,
          socialAccountId: acc.id,
          platform: acc.platform,
          date: dateStr,
          followers: baseFollowers,
          reach: dailyReach,
          impressions: Math.round(dailyReach * 1.3),
          views: dailyViews,
          engagement: dailyEng,
          clicks: Math.round(dailyViews * 0.035),
          saves: Math.round(dailyViews * 0.06),
          shares: Math.round(dailyViews * 0.02),
          streams: acc.platform.includes('spotify') ? Math.round(dailyViews * 0.5) : 0,
          watchTimeHours: Math.round(dailyViews * 0.015),
        });
      });
    }
    setMetrics(newMetrics);
  };

  const quickSeedStarterPipeline = () => {
    const artist = artistProfile.name || 'Artist';
    const single = artistProfile.currentSingle || 'New Single';
    const starterItems: ContentItem[] = [
      {
        id: `cnt_${Date.now()}_1`,
        title: `${single} - Kitchen Acoustic Cut`,
        platform: 'instagram',
        dateTime: new Date(Date.now() + 86400000).toISOString(),
        caption: `raw acoustic snippet of "${single}". should we drop this acoustic version too? link in bio for pre-save ✨`,
        hashtags: [`#${artist.replace(/\s+/g, '')}`, '#Acoustic', '#Unplugged', '#NewMusic'],
        mediaUrl: '/src/assets/images/album_cover_acoustic_1791446763851.jpg',
        mediaType: 'video',
        contentType: 'Reel',
        status: 'scheduled',
        approvalStatus: 'approved',
        campaignId: 'cmp_launch',
        campaignName: `${single} Rollout`,
        notes: 'Acoustic performances generate 2.4x higher save ratios than graphics.',
        performance: { views: 0, likes: 0, saves: 0, comments: 0 },
      },
      {
        id: `cnt_${Date.now()}_2`,
        title: `${single} - Studio Synth Sound Design BTS`,
        platform: 'tiktok',
        dateTime: new Date(Date.now() + 172800000).toISOString(),
        caption: `how we layered the analog synths for "${single}" 🎛️ sound is live on tiktok now! duet this with your harmonies`,
        hashtags: ['#SynthTok', '#MusicProducer', '#SoundDesign', '#ProducerLife'],
        mediaUrl: '/src/assets/images/artist_press_photo_1791446727519.jpg',
        mediaType: 'video',
        contentType: 'BTS',
        status: 'scheduled',
        approvalStatus: 'approved',
        campaignId: 'cmp_launch',
        campaignName: `${single} Rollout`,
        notes: 'Target peak evening window between 6:00 PM and 9:00 PM.',
        performance: { views: 0, likes: 0, saves: 0, comments: 0 },
      },
      {
        id: `cnt_${Date.now()}_3`,
        title: `${single} - Master Cover Artwork & Pre-Save Reveal`,
        platform: 'youtube',
        dateTime: new Date(Date.now() + 259200000).toISOString(),
        caption: `"${single}" is officially landing on Spotify, Apple Music, and YouTube. Pre-save now in bio to hear it first midnight on release day.`,
        hashtags: ['#SingleRelease', '#OfficialVisualizer', '#MusicDrop'],
        mediaUrl: '/src/assets/images/album_cover_single_1791446740671.jpg',
        mediaType: 'video',
        contentType: 'Lyric Video',
        status: 'review',
        approvalStatus: 'pending',
        campaignId: 'cmp_launch',
        campaignName: `${single} Rollout`,
        notes: 'Prepare YouTube Short with chorus audio link.',
        performance: { views: 0, likes: 0, saves: 0, comments: 0 },
      },
    ];
    setContentItems((prev) => [...starterItems, ...prev]);
  };

  const resetDemoData = startFreshWorkspace;

  return (
    <ArtistContext.Provider
      value={{
        artistProfile,
        socialAccounts,
        metrics,
        contentItems,
        libraryAssets,
        releases,
        campaigns,
        collaborations,
        playlistPitches,
        insights,
        audienceData,
        activeTab,
        setActiveTab,
        isFreshWorkspace,
        isOnboarded,
        setIsOnboarded,
        connectSocialAccount,
        syncSocialAccount,
        disconnectSocialAccount,
        addContentItem,
        updateContentItem,
        deleteContentItem,
        updateContentStatus,
        updateContentApproval,
        addLibraryAsset,
        deleteLibraryAsset,
        addSongRelease,
        updateSongRelease,
        addCampaign,
        updateCampaign,
        addCreator,
        updateCreator,
        deleteCreator,
        addPlaylistPitch,
        updatePlaylistPitch,
        updateArtistProfile,
        startFreshWorkspace,
        loadSampleData,
        resetDemoData,
        generateStarterActivity,
        quickSeedStarterPipeline,
        quickConnectAllStarterAccounts,
        syncingAccountId,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};
