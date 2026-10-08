import React from 'react';
import {
  LayoutDashboard,
  Share2,
  Calendar,
  FolderOpen,
  Disc3,
  BarChart3,
  Users2,
  Megaphone,
  UserCheck,
  ListMusic,
  FileText,
  Settings,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { useArtist } from '../context/ArtistContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, artistProfile } = useArtist();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'social_accounts', label: 'Social Accounts', icon: Share2 },
    { id: 'content_calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'content_library', label: 'Content Library', icon: FolderOpen },
    { id: 'releases', label: 'Releases', icon: Disc3 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audience', label: 'Audience', icon: Users2 },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'collaborations', label: 'Collaborations', icon: UserCheck },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0E131F] border-r border-slate-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Artist Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                🎤 ARTIST
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono tracking-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE SYNC
            </div>
          </div>

          {/* Active Artist Card */}
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <img
                src={artistProfile.avatarUrl || '/src/assets/images/artist_press_photo_1791446727519.jpg'}
                alt={artistProfile.name || 'Artist'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-md object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-100 truncate">
                    {artistProfile.name || 'Your Artist Name'}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 truncate">
                  {artistProfile.genre || 'Click to configure'}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">
                {artistProfile.currentSingle ? `Single: ${artistProfile.currentSingle}` : 'No active single'}
              </span>
              <button
                onClick={() => setActiveTab('settings')}
                className="text-cyan-400 hover:text-cyan-300 font-mono text-[10px]"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors text-left ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <button
            onClick={() => handleNavClick('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors text-left ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Settings</span>
          </button>

          <div className="pt-2 px-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Sonance Engine v2.4</span>
            <span className="font-mono">Oct 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
};
