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
  initialArtistProfile,
  initialSocialAccounts,
  initialMetrics,
  initialContentItems,
  initialLibraryAssets,
  initialSongReleases,
  initialCampaigns,
  initialCollaborations,
  initialPlaylistPitches,
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
  resetDemoData: () => void;
  // Sync state
  syncingAccountId: string | null;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

const STORAGE_KEY = 'sonance_artist_hub_data_v1';

export const ArtistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [syncingAccountId, setSyncingAccountId] = useState<string | null>(null);

  // Initialize state from localStorage or mock defaults
  const [artistProfile, setArtistProfile] = useState<ArtistProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : initialArtistProfile;
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_accounts`);
    return saved ? JSON.parse(saved) : initialSocialAccounts;
  });

  const [metrics, setMetrics] = useState<Metric[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_metrics`);
    return saved ? JSON.parse(saved) : initialMetrics;
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_content`);
    return saved ? JSON.parse(saved) : initialContentItems;
  });

  const [libraryAssets, setLibraryAssets] = useState<LibraryAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_assets`);
    return saved ? JSON.parse(saved) : initialLibraryAssets;
  });

  const [releases, setReleases] = useState<SongRelease[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_releases`);
    return saved ? JSON.parse(saved) : initialSongReleases;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [collaborations, setCollaborations] = useState<CreatorCollaboration[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_collabs`);
    return saved ? JSON.parse(saved) : initialCollaborations;
  });

  const [playlistPitches, setPlaylistPitches] = useState<PlaylistPitch[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_playlists`);
    return saved ? JSON.parse(saved) : initialPlaylistPitches;
  });

  const [insights] = useState<PerformanceInsight[]>(initialPerformanceInsights);
  const [audienceData] = useState(initialAudienceData);

  // Persist to localStorage
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

  // Account Handlers
  const connectSocialAccount = (accountData: Partial<SocialAccount>) => {
    const newId = accountData.id || `acc_${Date.now()}`;
    const newAccount: SocialAccount = {
      id: newId,
      platform: accountData.platform || 'custom',
      platformName: accountData.platformName || 'Custom Platform',
      accountId: accountData.accountId || `id_${Date.now()}`,
      accountName: accountData.accountName || artistProfile.name,
      handle: accountData.handle || `@${artistProfile.name.toLowerCase().replace(/\s+/g, '')}`,
      profileUrl: accountData.profileUrl || `https://${accountData.platform}.com/${artistProfile.name}`,
      avatarUrl: accountData.avatarUrl || artistProfile.avatarUrl,
      status: 'connected',
      lastSync: 'Just now',
      accessToken: accountData.accessToken || `tok_${Math.random().toString(36).substring(2, 15)}`,
      refreshToken: accountData.refreshToken || `ref_${Math.random().toString(36).substring(2, 15)}`,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      scopes: accountData.scopes || ['read_insights', 'profile_basic'],
      followers: accountData.followers || 15400,
      reach: accountData.reach || 42000,
      engagement: accountData.engagement || 4.2,
      views: accountData.views || 89000,
      growthMoM: accountData.growthMoM || 12.5,
      isCustom: accountData.isCustom ?? true,
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

    // Generate metric entry for today
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
      streams: newAccount.platform.includes('spotify') || newAccount.platform.includes('apple') ? 24000 : 0,
      watchTimeHours: Math.round(newAccount.views * 0.01),
    };
    setMetrics((prev) => [...prev, newMetric]);
  };

  const syncSocialAccount = async (accountId: string) => {
    setSyncingAccountId(accountId);
    // Simulate real backend OAuth token handshake and metric retrieval
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSocialAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          const delta = Math.floor(Math.random() * 240) + 20;
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

  // Content Handlers
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

  // Library Handlers
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

  // Release Handlers
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

  // Campaign Handlers
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

  // Creator CRM Handlers
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

  // Playlist Pitch Handlers
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

  // Profile
  const updateArtistProfile = (profile: ArtistProfile) => {
    setArtistProfile(profile);
  };

  const resetDemoData = () => {
    localStorage.clear();
    setArtistProfile(initialArtistProfile);
    setSocialAccounts(initialSocialAccounts);
    setMetrics(initialMetrics);
    setContentItems(initialContentItems);
    setLibraryAssets(initialLibraryAssets);
    setReleases(initialSongReleases);
    setCampaigns(initialCampaigns);
    setCollaborations(initialCollaborations);
    setPlaylistPitches(initialPlaylistPitches);
  };

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
        resetDemoData,
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
