import React, { useState } from 'react';
import {
  Menu,
  RefreshCw,
  Plus,
  Bell,
  Search,
  Calendar,
  Sparkles,
  Music,
  Share2,
} from 'lucide-react';
import { useArtist } from '../context/ArtistContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenNewContentModal: () => void;
  onOpenConnectModal: () => void;
  onOpenOnboardingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenNewContentModal,
  onOpenConnectModal,
  onOpenOnboardingModal,
}) => {
  const {
    activeTab,
    syncSocialAccount,
    socialAccounts,
    artistProfile,
    isFreshWorkspace,
    loadSampleData,
    startFreshWorkspace,
  } = useArtist();
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview & Daily Brief';
      case 'social_accounts':
        return 'Social Accounts & API Connections';
      case 'content_calendar':
        return 'Content Pipeline & Calendar';
      case 'content_library':
        return 'Brand Assets & Media Library';
      case 'releases':
        return 'Song Releases & Distribution';
      case 'analytics':
        return 'Analytics & Conversion Intelligence';
      case 'audience':
        return 'Audience Demographics & Heatmap';
      case 'campaigns':
        return 'Paid & Creator Campaigns';
      case 'collaborations':
        return 'Influencer & Creator CRM';
      case 'playlists':
        return 'Playlist Pitches & Distribution';
      case 'reports':
        return 'Executive Performance Reports';
      case 'settings':
        return 'Workspace Settings & API Schema';
      default:
        return 'Artist Workspace';
    }
  };

  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    for (const acc of socialAccounts) {
      if (acc.status === 'connected') {
        await syncSocialAccount(acc.id);
      }
    }
    setIsSyncingAll(false);
  };

  const connectedAccountsCount = socialAccounts.filter((a) => a.status === 'connected').length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 flex items-center justify-between">
      {/* Zone 1: Section Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
            {getSectionTitle()}
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>{artistProfile.name || 'Unconfigured Artist'}</span>
            <span aria-hidden="true">·</span>
            <span>
              {artistProfile.currentSingle
                ? `Single: “${artistProfile.currentSingle}”`
                : 'Fresh Workspace'}
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Workspace Mode & Quick Profile Setup */}
      <div className="hidden md:flex items-center gap-2 text-xs">
        {artistProfile.name ? (
          <button
            onClick={onOpenOnboardingModal}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>Artist: <strong>{artistProfile.name}</strong></span>
            <span className="text-[10px] text-cyan-400 font-mono">(Edit)</span>
          </button>
        ) : (
          <button
            onClick={onOpenOnboardingModal}
            className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/80 hover:bg-cyan-900 transition-colors flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Setup Artist Profile</span>
          </button>
        )}

        {isFreshWorkspace ? (
          <button
            onClick={loadSampleData}
            title="Load example artist data to explore the dashboard"
            className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 rounded hover:border-slate-700 transition-colors"
          >
            Load Sample Demo
          </button>
        ) : (
          <button
            onClick={startFreshWorkspace}
            title="Wipe sample data and start fresh for your own artist project"
            className="px-2.5 py-1 text-[11px] text-amber-400 hover:text-amber-300 bg-slate-950 border border-amber-900/60 rounded hover:border-amber-700 transition-colors"
          >
            Clear & Start Fresh
          </button>
        )}
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {connectedAccountsCount > 0 ? (
          <button
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-cyan-400 ${
                isSyncingAll ? 'animate-spin' : ''
              }`}
            />
            <span className="hidden sm:inline">
              {isSyncingAll ? 'Syncing...' : 'Sync All'}
            </span>
          </button>
        ) : null}

        <button
          onClick={onOpenConnectModal}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Connect Platform</span>
        </button>

        <button
          onClick={onOpenNewContentModal}
          className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors flex items-center gap-1.5 font-semibold shadow-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Content</span>
        </button>
      </div>
    </header>
  );
};
