import React, { useState } from 'react';
import {
  Settings,
  Save,
  RotateCcw,
  Code2,
  Database,
  ShieldCheck,
  Check,
  Download,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';

export const SettingsView: React.FC = () => {
  const { artistProfile, updateArtistProfile, resetDemoData, socialAccounts, metrics } =
    useArtist();

  const [name, setName] = useState(artistProfile.name);
  const [tagline, setTagline] = useState(artistProfile.tagline);
  const [genre, setGenre] = useState(artistProfile.genre);
  const [label, setLabel] = useState(artistProfile.label);
  const [manager, setManager] = useState(artistProfile.manager);
  const [currentSingle, setCurrentSingle] = useState(artistProfile.currentSingle);
  const [currency, setCurrency] = useState(artistProfile.currency);
  const [timezone, setTimezone] = useState(artistProfile.timezone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateArtistProfile({
      ...artistProfile,
      name,
      tagline,
      genre,
      label,
      manager,
      currentSingle,
      currency,
      timezone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportJSON = () => {
    const fullState = {
      artistProfile,
      socialAccounts,
      metricsCount: metrics.length,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullState, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sonance-artist-data-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Workspace Settings & Database Blueprint
          </h2>
          <p className="text-xs text-slate-400">
            Artist profile metadata, generic OAuth schema configuration, and system persistence
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export State JSON</span>
        </button>
      </div>

      {/* Artist Profile Form */}
      <form
        onSubmit={handleSave}
        className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4"
      >
        <h3 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-2">
          Artist & Management Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Artist Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Music Genre
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Artist Bio / Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Record Label / Distributor
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Primary Manager
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Current Lead Single
            </label>
            <input
              type="text"
              value={currentSingle}
              onChange={(e) => setCurrentSingle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Reporting Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Primary Timezone
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={resetDemoData}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Clean Demo State</span>
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Profile Saved</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Architectural Guarantee Card */}
      <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Database Schema Design: Extensibility Without Redesign
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Rather than rigid platform-specific tables (<code className="text-slate-400 font-mono">instagram_followers</code>, <code className="text-slate-400 font-mono">youtube_followers</code>), Sonance utilizes a polymorphic schema:
        </p>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-400 leading-relaxed">
          <div><strong className="text-cyan-400">SocialAccount</strong> (id, platform, accountId, accountName, profileUrl, accessToken, refreshToken)</div>
          <div className="mt-1"><strong className="text-emerald-400">Metric</strong> (id, socialAccountId, date, followers, reach, impressions, views, engagement, clicks, streams)</div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This architectural choice guarantees that plugging in novel platforms (e.g. Bandcamp, Threads, Tidal, Audius) creates a new record in <code className="text-cyan-300 font-mono">SocialAccount</code> with standard telemetry rows in <code className="text-emerald-300 font-mono">Metric</code>, requiring 0% backend redesign.
        </p>
      </div>
    </div>
  );
};
