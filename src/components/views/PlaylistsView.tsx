import React, { useState } from 'react';
import {
  ListMusic,
  Plus,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  Music,
  TrendingUp,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { PlaylistPitch, PlacementStatus } from '../../types';
import { formatNumber, formatDate, getPlatformMeta } from '../../utils/formatters';

interface PlaylistsViewProps {
  onOpenNewPitchModal: () => void;
}

export const PlaylistsView: React.FC<PlaylistsViewProps> = ({ onOpenNewPitchModal }) => {
  const { playlistPitches, updatePlaylistPitch } = useArtist();

  const [platformFilter, setPlatformFilter] = useState('all');

  const filteredPitches = playlistPitches.filter((p) => {
    if (platformFilter === 'all') return true;
    return p.platform.toLowerCase() === platformFilter.toLowerCase();
  });

  const totalStreamsFromPlaylists = playlistPitches.reduce((acc, p) => acc + p.streams, 0);
  const acceptedPlacements = playlistPitches.filter(
    (p) => p.placement.includes('Editorial') || p.placement.includes('Playlist')
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Playlist & Distributor Submission Tracker
          </h2>
          <p className="text-xs text-slate-400">
            Monitor Spotify for Artists, Apple Music, and independent curator pitches & stream yield
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
          >
            <option value="all">All Platforms</option>
            <option value="spotify">Spotify Editorial</option>
            <option value="apple music">Apple Music</option>
            <option value="youtube music">YouTube Music</option>
            <option value="amazon music">Amazon Music</option>
          </select>
          <button
            onClick={onOpenNewPitchModal}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Pitch</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Active Curated Streams</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {formatNumber(totalStreamsFromPlaylists)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            From {acceptedPlacements} confirmed editorial playlist inclusions
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Editorial Placement Rate</span>
          <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
            {Math.round((acceptedPlacements / (playlistPitches.length || 1)) * 100)}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {acceptedPlacements} accepted of {playlistPitches.length} pitched
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Primary Catalog Engine</span>
          <div className="text-xl font-bold text-slate-100 truncate mt-1">
            Indie Chill & Nighttime Beats
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            3,200 streams / day
          </div>
        </div>
      </div>

      {/* High-Density Pitch Table */}
      <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-mono">
              <th className="py-2.5 px-3">Playlist Pitched</th>
              <th className="py-2.5 px-3">Song</th>
              <th className="py-2.5 px-3">Distributor / Path</th>
              <th className="py-2.5 px-3">Submission Date</th>
              <th className="py-2.5 px-3">Curator</th>
              <th className="py-2.5 px-3">Response</th>
              <th className="py-2.5 px-3">Placement</th>
              <th className="py-2.5 px-3 text-right">Streams Driven</th>
              <th className="py-2.5 px-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredPitches.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500">
                  <ListMusic className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No playlist pitches logged yet</p>
                  <button
                    onClick={onOpenNewPitchModal}
                    className="mt-2 text-xs font-semibold text-cyan-400 hover:underline inline-block"
                  >
                    + Record Your First Playlist Pitch
                  </button>
                </td>
              </tr>
            ) : (
              filteredPitches.map((pitch) => (
                <tr key={pitch.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                      <span>{pitch.playlistPitched}</span>
                    </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {pitch.platform}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-200 font-medium">{pitch.songTitle}</td>
                <td className="py-3 px-3 text-slate-400">{pitch.distributor}</td>
                <td className="py-3 px-3 font-mono text-slate-400">
                  {formatDate(pitch.submissionDate)}
                </td>
                <td className="py-3 px-3 text-slate-300">{pitch.curator}</td>
                <td className="py-3 px-3">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      pitch.response === 'Accepted'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : pitch.response === 'In Review'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pitch.response}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-slate-200">
                  {pitch.placement}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-400 font-bold">
                  {formatNumber(pitch.streams)}
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs truncate">
                  {pitch.notes}
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
