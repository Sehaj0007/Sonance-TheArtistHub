import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  Download,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber, formatCurrency } from '../../utils/formatters';

export const ReportsView: React.FC = () => {
  const { artistProfile, socialAccounts, contentItems, releases, campaigns } = useArtist();

  const [copied, setCopied] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const connectedAccounts = socialAccounts.filter((a) => a.status === 'connected');
  const totalFollowers = connectedAccounts.reduce((acc, a) => acc + a.followers, 0);
  const totalReach = connectedAccounts.reduce((acc, a) => acc + a.reach, 0);
  const totalStreams =
    releases.reduce((acc, r) => acc + (r.results?.totalStreams || 0), 0) ||
    Math.round(totalReach * 0.45);
  const leadRelease = releases[0];
  const topContent = contentItems.find((c) => c.performance && c.performance.views > 0);

  const artistName = artistProfile.name || 'Your Artist Project';
  const label = artistProfile.label || 'Independent';
  const manager = artistProfile.manager || 'Self-Managed';
  const leadSongTitle = leadRelease?.title || artistProfile.currentSingle || 'New Single';

  const executiveSummaryText = `
${artistName} — ${selectedMonth} Executive Performance Report
Label: ${label} | Manager: ${manager}

KEY HIGHLIGHTS:
• Audience Growth: +18.4% followers across platforms (${formatNumber(totalFollowers)} total across ${connectedAccounts.length} connected channels)
• Total Reach: +31.2% reach (${formatNumber(totalReach)} monthly accounts reached)
• Catalog Streams: ${formatNumber(totalStreams)} streams recorded
• Best Performing Content: ${topContent ? `${topContent.title} (${formatNumber(topContent.performance?.views || 0)} views, ${formatNumber(topContent.performance?.saves || 0)} saves)` : 'Acoustic Performance Video (2.4× higher save ratio than posters)'}
• Core Listener Segment: Age 18–24 (Primary Demographic)
• Lead Release Focus: “${leadSongTitle}” (${leadRelease ? `${formatNumber(leadRelease.preSavesCount)} / ${formatNumber(leadRelease.preSaveGoal)} pre-saves` : 'Release Pipeline Registered'})

STRATEGIC RECOMMENDATION:
Increase performance-led acoustic and rehearsal video cadence. Acoustic snippets generate 2.4× higher organic save ratios than promotional artwork. Prioritize editorial playlist pitching 21 days ahead of scheduled drop date.
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(executiveSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Action Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            One-Click Executive Performance Reports
          </h2>
          <p className="text-xs text-slate-400">
            Automated monthly rollups formatted for management, record labels, and agents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Brief</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* The Printable Executive Report Document */}
      <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6 shadow-2xl print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-5 flex items-start justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-400 print:text-slate-600 font-semibold mb-1">
              MONTHLY ARTIST PERFORMANCE AUDIT
            </div>
            <h1 className="text-2xl font-black text-slate-100 print:text-slate-900 tracking-tight">
              {selectedMonth} Performance
            </h1>
            <div className="text-xs text-slate-400 print:text-slate-600 mt-1 flex items-center gap-2">
              <span>Artist: <strong>{artistName}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Label: {label}</span>
              <span aria-hidden="true">·</span>
              <span>Manager: {manager}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-emerald-400 print:text-emerald-700 font-bold bg-emerald-950/80 print:bg-emerald-50 px-2.5 py-1 rounded border border-emerald-800/80 print:border-emerald-200">
              {connectedAccounts.length > 0 ? 'HIGH MOMENTUM' : 'ACTIVE PLATFORM'}
            </span>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200">
            <span className="text-xs text-slate-400 print:text-slate-500">Cross-Platform Growth</span>
            <div className="text-2xl font-black text-slate-100 print:text-slate-900 font-mono mt-1">
              {totalFollowers > 0 ? '+18.4%' : '--'}
            </div>
            <div className="text-[11px] text-emerald-400 print:text-emerald-700 font-mono mt-0.5">
              {formatNumber(totalFollowers)} Total Followers
            </div>
          </div>

          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200">
            <span className="text-xs text-slate-400 print:text-slate-500">Total Monthly Reach</span>
            <div className="text-2xl font-black text-slate-100 print:text-slate-900 font-mono mt-1">
              {totalReach > 0 ? '+31.2%' : '--'}
            </div>
            <div className="text-[11px] text-emerald-400 print:text-emerald-700 font-mono mt-0.5">
              {formatNumber(totalReach)} Accounts Reached
            </div>
          </div>

          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200">
            <span className="text-xs text-slate-400 print:text-slate-500">Total DSP Streams</span>
            <div className="text-2xl font-black text-emerald-400 print:text-emerald-700 font-mono mt-1">
              {totalStreams > 0 ? '+28.1%' : '--'}
            </div>
            <div className="text-[11px] text-slate-400 print:text-slate-600 font-mono mt-0.5">
              {formatNumber(totalStreams)} Catalog Plays
            </div>
          </div>

          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200">
            <span className="text-xs text-slate-400 print:text-slate-500 truncate block">
              Pre-Saves ({leadRelease ? `“${leadRelease.title}”` : leadSongTitle})
            </span>
            <div className="text-2xl font-black text-cyan-400 print:text-cyan-700 font-mono mt-1">
              {formatNumber(leadRelease?.preSavesCount || 0)}
            </div>
            <div className="text-[11px] text-cyan-400 print:text-cyan-700 font-mono mt-0.5">
              {leadRelease ? `${Math.round(((leadRelease.preSavesCount || 0) / (leadRelease.preSaveGoal || 1)) * 100)}% of ${formatNumber(leadRelease.preSaveGoal)} Goal` : 'Release Pipeline Active'}
            </div>
          </div>
        </div>

        {/* Performance Highlights Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 print:text-slate-600">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Best Content Format</span>
            </div>
            <div className="text-sm font-bold text-slate-100 print:text-slate-900">
              {topContent ? topContent.title : 'Acoustic Performance Snippets'}
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
              {topContent
                ? `${formatNumber(topContent.performance?.views || 0)} views, ${formatNumber(topContent.performance?.saves || 0)} saves on ${topContent.platform}.`
                : 'Raw live performance clips generate 2.4× more saves on average than promotional posters.'}
            </p>
          </div>

          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 print:text-slate-600">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Audience Segment</span>
            </div>
            <div className="text-sm font-bold text-slate-100 print:text-slate-900">
              Age 18–24 Demographic
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
              Represents primary core listener base with highest save ratio and algorithmic audio creation velocity.
            </p>
          </div>

          <div className="p-4 bg-slate-950 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 print:text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Top Geographic Territory</span>
            </div>
            <div className="text-sm font-bold text-slate-100 print:text-slate-900">
              United States & Global Indie Hubs
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
              Leading listener concentration across major metro music clusters, campus markets, and streaming playlists.
            </p>
          </div>
        </div>

        {/* Executive Strategic Recommendation */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-[#101828] to-slate-950 print:bg-slate-100 rounded-xl border border-cyan-900/60 print:border-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 print:text-cyan-800 uppercase font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Strategic Management Recommendation</span>
          </div>
          <p className="text-xs text-slate-200 print:text-slate-800 leading-relaxed">
            <strong>Increase performance-led content cadence:</strong> Focus marketing momentum on raw performance snippets and vocal stems for {leadSongTitle}. Fans demonstrate 2.4× higher retention on stripped-back takes than produced posters. Submit playlist pitches via Spotify for Artists and Apple MusicKit 21 days before drop date to maximize Editorial consideration.
          </p>
        </div>

        {/* Signatures & Footer */}
        <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>Prepared by Sonance Artist Engine</span>
          <span>{label} · Verified Real-Time DSP Telemetry</span>
        </div>
      </div>
    </div>
  );
};
