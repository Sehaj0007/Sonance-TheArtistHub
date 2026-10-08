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
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenNewContentModal,
  onOpenConnectModal,
}) => {
  const { activeTab, syncSocialAccount, socialAccounts, artistProfile } = useArtist();
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
    // Sync each connected account sequentially
    for (const acc of socialAccounts) {
      if (acc.status === 'connected') {
        await syncSocialAccount(acc.id);
      }
    }
    setIsSyncingAll(false);
  };

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
            <span>{artistProfile.name}</span>
            <span aria-hidden="true">·</span>
            <span>Lead Single: “{artistProfile.currentSingle}”</span>
          </div>
        </div>
      </div>

      {/* Zone 2: Contextual Info */}
      <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
        <span className="font-mono text-slate-400">
          Thursday, Oct 8, 2026
        </span>
        <span aria-hidden="true" className="text-slate-600">
          |
        </span>
        <span className="text-slate-300">
          Active Campaign: <strong className="text-slate-100 font-medium">Midnight Echoes Push</strong>
        </span>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
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

        <button
          onClick={onOpenConnectModal}
          className="hidden sm:flex px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-slate-100 transition-colors items-center gap-1.5 whitespace-nowrap"
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
