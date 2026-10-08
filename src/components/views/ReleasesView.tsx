import React, { useState } from 'react';
import {
  Disc3,
  Calendar,
  ExternalLink,
  Plus,
  Play,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  DollarSign,
  Share2,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { SongRelease } from '../../types';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';

interface ReleasesViewProps {
  onOpenNewReleaseModal: () => void;
}

export const ReleasesView: React.FC<ReleasesViewProps> = ({ onOpenNewReleaseModal }) => {
  const { releases, updateSongRelease } = useArtist();

  const [selectedReleaseId, setSelectedReleaseId] = useState<string>(
    releases[0]?.id || 'rel_01'
  );

  const currentRelease =
    releases.find((r) => r.id === selectedReleaseId) || releases[0];

  const preSavePercent = currentRelease
    ? Math.min(
        100,
        Math.round((currentRelease.preSavesCount / currentRelease.preSaveGoal) * 100)
      )
    : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Releases Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Release Manager & Distribution Architecture
          </h2>
          <p className="text-xs text-slate-400">
            End-to-end song rollout lifecycle: Artwork → ISRC → Pre-save → Teasers → Creator Seeding → Streaming Milestones
          </p>
        </div>

        <button
          onClick={onOpenNewReleaseModal}
          className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Song Release</span>
        </button>
      </div>

      {/* Catalog Song Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {releases.map((rel) => {
          const isSelected = rel.id === selectedReleaseId;
          return (
            <button
              key={rel.id}
              onClick={() => setSelectedReleaseId(rel.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-3 transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-800 border-cyan-400 text-white shadow-xs'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <img
                src={rel.coverArtwork}
                alt={rel.title}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded object-cover border border-slate-700"
              />
              <div className="text-left">
                <div className="text-xs font-bold truncate">{rel.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {formatDate(rel.releaseDate)} · {rel.distributor}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {currentRelease && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Metadata Dossier & DSP Links (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
              {/* Cover Artwork */}
              <div className="aspect-square rounded-lg overflow-hidden border border-slate-800 shadow-lg relative group">
                <img
                  src={currentRelease.coverArtwork}
                  alt={currentRelease.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {currentRelease.version}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {currentRelease.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Release: {formatDate(currentRelease.releaseDate)}
                  </p>
                </div>
              </div>

              {/* Technical Codes */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">ISRC:</span>
                  <span className="text-slate-200 font-bold">{currentRelease.isrc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">UPC / Barcode:</span>
                  <span className="text-slate-200">{currentRelease.upc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Distributor:</span>
                  <span className="text-cyan-400">{currentRelease.distributor}</span>
                </div>
              </div>

              {/* Streaming Platform Direct Links */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  DSP Endpoints
                </span>
                <div className="space-y-1.5 text-xs">
                  <a
                    href={currentRelease.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-950 hover:bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Spotify for Artists</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href={currentRelease.appleMusicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-950 hover:bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>Apple Music</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <a
                    href={currentRelease.youtubeMusicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-950 hover:bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>YouTube Music</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Song Tree Components (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Pre-Save Funnel Card */}
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                    Pre-Save Funnel & Velocity
                  </h4>
                </div>
                <a
                  href={currentRelease.preSaveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                >
                  <span>{currentRelease.preSaveUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400">Total Pre-Saves</span>
                  <div className="text-base font-bold text-slate-100 font-mono">
                    {formatNumber(currentRelease.preSavesCount)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Target Goal</span>
                  <div className="text-base font-bold text-slate-300 font-mono">
                    {formatNumber(currentRelease.preSaveGoal)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Progress</span>
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    {preSavePercent}%
                  </div>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${preSavePercent}%` }}
                />
              </div>
            </div>

            {/* Teaser Schedule & Release Content Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teaser rollout */}
              <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                    Teaser Schedule
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {currentRelease.teasers.length} items
                  </span>
                </div>
                <div className="space-y-2">
                  {currentRelease.teasers.map((t) => (
                    <div
                      key={t.id}
                      className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-medium text-slate-200 truncate">
                          {t.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {t.platform} · {formatDate(t.scheduledFor)}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          t.status === 'posted'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Release Content Deliverables */}
              <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                    Release Day Deliverables
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {currentRelease.releaseContent.length} deliverables
                  </span>
                </div>
                <div className="space-y-2">
                  {currentRelease.releaseContent.map((rc) => (
                    <div
                      key={rc.id}
                      className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-medium text-slate-200 truncate">
                          {rc.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Type: {rc.type}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          rc.status === 'ready'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {rc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign & Ads Matrix */}
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                    Influencer Campaign & Paid Media
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {currentRelease.influencerCampaign}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400">Ads Budget</span>
                  <div className="text-sm font-bold text-slate-100 font-mono">
                    {formatCurrency(currentRelease.adsBudget)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400">Ads Spent</span>
                  <div className="text-sm font-bold text-slate-100 font-mono">
                    {formatCurrency(currentRelease.adsSpend)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400">Total Streams</span>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    {formatNumber(currentRelease.results.totalStreams)}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400">Playlist Adds</span>
                  <div className="text-sm font-bold text-cyan-400 font-mono">
                    {formatNumber(currentRelease.results.playlistAdds)}
                  </div>
                </div>
              </div>

              {/* Milestone Banner */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>
                    <strong>Milestone:</strong> {currentRelease.results.milestonePassed}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">
                  Verified Data
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
