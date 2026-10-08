import React from 'react';
import {
  Users,
  Eye,
  Activity,
  Music,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  Share2,
  Flame,
  Check,
  Disc3,
  ExternalLink,
  Plus,
  FolderOpen,
  UserCheck,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';

interface OverviewViewProps {
  onOpenConnectModal: () => void;
  onOpenNewContentModal: () => void;
  onOpenOnboardingModal: () => void;
  onOpenNewReleaseModal: () => void;
  onOpenNewCampaignModal: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onOpenConnectModal,
  onOpenNewContentModal,
  onOpenOnboardingModal,
  onOpenNewReleaseModal,
  onOpenNewCampaignModal,
}) => {
  const {
    artistProfile,
    socialAccounts,
    contentItems,
    campaigns,
    collaborations,
    releases,
    insights,
    setActiveTab,
    updateContentStatus,
    updateContentApproval,
    isFreshWorkspace,
    loadSampleData,
  } = useArtist();

  const connectedAccounts = socialAccounts.filter((a) => a.status === 'connected');
  const totalFollowers = connectedAccounts.reduce((acc, a) => acc + a.followers, 0);
  const totalReach = connectedAccounts.reduce((acc, a) => acc + a.reach, 0);
  const totalViews = connectedAccounts.reduce((acc, a) => acc + a.views, 0);
  const avgEngagement =
    connectedAccounts.length > 0
      ? (
          connectedAccounts.reduce((acc, a) => acc + a.engagement, 0) /
          connectedAccounts.length
        ).toFixed(1)
      : '0.0';

  const currentLeadRelease = releases[0];
  const totalStreams = releases.reduce(
    (acc, r) => acc + (r.results?.totalStreams || 0),
    0
  );
  const activeCampaign = campaigns[0];

  const upcomingPosts = contentItems
    .filter(
      (c) =>
        c.status === 'scheduled' || c.status === 'review' || c.status === 'approved'
    )
    .slice(0, 4);

  const topPerforming = contentItems
    .filter((c) => c.performance && c.performance.views > 0)
    .sort((a, b) => (b.performance?.views || 0) - (a.performance?.views || 0))
    .slice(0, 3);

  const isBrandNew = connectedAccounts.length === 0 && releases.length === 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner for Fresh Workspace */}
      {isBrandNew && (
        <div className="p-5 bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-800/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-700/60">
                FRESH ARTIST PLATFORM
              </span>
              <span className="text-xs text-slate-300">
                {artistProfile.name
                  ? `Active Workspace for ${artistProfile.name}`
                  : 'Ready for Configuration'}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-100 tracking-tight">
              Welcome to Sonance Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              This is your clean, dedicated artist command center. Connect your social & DSP platforms to begin syncing live telemetry, register your upcoming single release, and plan your content pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenOnboardingModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
            >
              {artistProfile.name ? 'Edit Artist Profile' : 'Set Up Artist Profile'}
            </button>
            <button
              onClick={loadSampleData}
              title="Explore the dashboard with populated demo data"
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 rounded-lg transition-colors"
            >
              Explore Sample Demo
            </button>
          </div>
        </div>
      )}

      {/* 3-Core Questions Executive Triage Banner */}
      <section className="p-5 bg-gradient-to-r from-slate-900 via-[#111726] to-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              EXECUTIVE TRIAGE · {artistProfile.name ? artistProfile.name.toUpperCase() : 'ARTIST WORKSPACE'}
            </span>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              Career Momentum & Daily Action Brief
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Active Strategy:{' '}
              <strong className="text-slate-200">
                {artistProfile.currentSingle
                  ? `“${artistProfile.currentSingle}” Rollout`
                  : 'Platform Onboarding & Audience Growth'}
              </strong>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {connectedAccounts.length > 0 ? `${connectedAccounts.length} DSPs Connected` : 'Ready to Connect'}
            </span>
          </div>
        </div>

        {/* 3 Answers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Answer 1: How is the artist doing? */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  1. How is {artistProfile.name || 'the artist'} doing?
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-medium">
                  {connectedAccounts.length > 0 ? '+18.4% MoM' : 'Awaiting Data'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {connectedAccounts.length > 0 ? (
                  <>
                    Audience velocity is active. Tracking <strong>{formatNumber(totalFollowers)}</strong> followers across connected channels with <strong>{formatNumber(totalReach)}</strong> monthly accounts reached.
                  </>
                ) : (
                  <>
                    Workspace initialized. Connect your Instagram, TikTok, Spotify for Artists, or YouTube to start ingesting live reach and follower analytics.
                  </>
                )}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Connected Platforms</span>
              <span className="font-semibold text-slate-200 font-mono">
                {connectedAccounts.length} / {socialAccounts.length}
              </span>
            </div>
          </div>

          {/* Answer 2: What am I supposed to do today? */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  2. What am I supposed to do today?
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-medium">
                  {upcomingPosts.length > 0 ? `${upcomingPosts.length} Scheduled` : 'Priority Tasks'}
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {upcomingPosts.length > 0 ? (
                  upcomingPosts.slice(0, 3).map((p) => (
                    <li key={p.id} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">·</span>
                      <span className="truncate">{p.title} ({p.platform})</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">·</span>
                      <span>Connect Instagram & Spotify for Artists</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">·</span>
                      <span>Register upcoming single in Release Manager</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">·</span>
                      <span>Schedule your first release teaser post</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Action</span>
              <button
                onClick={upcomingPosts.length > 0 ? () => setActiveTab('content_calendar') : onOpenNewContentModal}
                className="font-semibold text-amber-400 hover:text-amber-300 font-mono text-[11px]"
              >
                {upcomingPosts.length > 0 ? 'Review Pipeline' : '+ Schedule Post'}
              </button>
            </div>
          </div>

          {/* Answer 3: What should we do next? */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  3. What should we do next?
                </span>
                <span className="text-[11px] text-cyan-400 font-mono font-medium">
                  High Impact
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentLeadRelease ? (
                  <>
                    Maximize pre-save velocity for <strong>“{currentLeadRelease.title}”</strong>. Target 15-second acoustic chorus sound hooks on TikTok & Reels to drive early pre-saves ahead of release day.
                  </>
                ) : (
                  <>
                    Focus on building content momentum: raw unproduced rehearsal clips and synth sound design BTS drive <strong>2.4× more saves</strong> than promotional graphics.
                  </>
                )}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-[11px]"
              >
                <span>View Growth Intelligence</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stat Cards: High-Density & Tabular Numerals */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Followers</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(totalFollowers)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            {connectedAccounts.length > 0 ? `${connectedAccounts.length} accounts` : '0 connected'}
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Reach</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(totalReach)}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            Monthly reach
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Views</span>
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(totalViews)}
          </div>
          <div className="text-[11px] text-indigo-400 font-mono mt-1">
            Cross-platform
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Engagement Rate</span>
            <Activity className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {avgEngagement}%
          </div>
          <div className="text-[11px] text-amber-400 font-mono mt-1">
            Avg interaction
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Catalog Streams</span>
            <Music className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(totalStreams)}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            Tracked streams
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Active Pre-Saves</span>
            <Disc3 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(currentLeadRelease?.preSavesCount || 0)}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono mt-1">
            {currentLeadRelease ? `Goal: ${formatNumber(currentLeadRelease.preSaveGoal)}` : 'No release'}
          </div>
        </div>
      </section>

      {/* Middle Row: Current Campaign & Top Performing Content */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Current Active Campaign Spotlight (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-100">
                  {activeCampaign ? `Current Campaign: ${activeCampaign.name}` : 'Campaign Management'}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('campaigns')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>Campaign Hub</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {activeCampaign ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400">Budget Spent</span>
                    <div className="text-sm font-semibold text-slate-100 font-mono">
                      {formatCurrency(activeCampaign.spend)} /{' '}
                      <span className="text-slate-400">
                        {formatCurrency(activeCampaign.budget)}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400">Creators Engaged</span>
                    <div className="text-sm font-semibold text-slate-100 font-mono">
                      {activeCampaign.creatorsConfirmed} / {activeCampaign.creatorsContacted}
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400">Direct Streams</span>
                    <div className="text-sm font-semibold text-emerald-400 font-mono">
                      {formatNumber(activeCampaign.streams)}
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400">Cost Per Stream</span>
                    <div className="text-sm font-semibold text-cyan-400 font-mono">
                      ${activeCampaign.costPerResult.perStream}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      Budget Utilization (
                      {Math.round((activeCampaign.spend / (activeCampaign.budget || 1)) * 100)}%)
                    </span>
                    <span className="font-mono text-slate-300">
                      {formatCurrency(Math.max(0, activeCampaign.budget - activeCampaign.spend))} reserve
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (activeCampaign.spend / (activeCampaign.budget || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 bg-slate-950/80 border border-dashed border-slate-800 rounded-lg text-center space-y-2">
                <Megaphone className="w-6 h-6 text-slate-500 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-200">No Active Campaigns</h4>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  Launch a promotional campaign to track creator outreach, budget spend, and direct stream conversions.
                </p>
                <button
                  onClick={onOpenNewCampaignModal}
                  className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md font-semibold transition-colors mt-2"
                >
                  + Launch First Campaign
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Artist: <strong>{artistProfile.name || 'Setup Pending'}</strong> ·{' '}
              {artistProfile.label || 'Independent'}
            </span>
            <span className="font-mono text-slate-400">Sonance Growth Engine</span>
          </div>
        </div>

        {/* Top-Performing Content (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Top-Performing Content
              </h3>
              <button
                onClick={() => setActiveTab('content_calendar')}
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                All Content
              </button>
            </div>

            {topPerforming.length > 0 ? (
              <div className="space-y-2.5">
                {topPerforming.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover shrink-0 border border-slate-800"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-slate-200 truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="uppercase text-cyan-400 font-mono text-[10px]">
                          {item.platform}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-slate-300">
                          {formatNumber(item.performance?.views || 0)} views
                        </span>
                        <span>·</span>
                        <span className="text-emerald-400 font-mono">
                          {formatNumber(item.performance?.saves || 0)} saves
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-slate-950/80 border border-dashed border-slate-800 rounded-lg text-center space-y-2">
                <Calendar className="w-6 h-6 text-slate-500 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-200">No Content Published Yet</h4>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Published reels, stories, and videos will appear ranked by views and saves here.
                </p>
                <button
                  onClick={onOpenNewContentModal}
                  className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md font-semibold transition-colors mt-2"
                >
                  + Create Post
                </button>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 text-[11px] text-slate-400 italic">
            💡 Acoustic live cuts generate 2.4× more saves on average than promotional posters.
          </div>
        </div>
      </section>

      {/* Bottom Row: Upcoming Posts Queue & Priority Operational Tasks */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Upcoming Posts (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-100">
                Upcoming Content Pipeline
              </h3>
            </div>
            <button
              onClick={onOpenNewContentModal}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              + Schedule Post
            </button>
          </div>

          {upcomingPosts.length > 0 ? (
            <div className="space-y-2.5">
              {upcomingPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover shrink-0 border border-slate-800"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-slate-200 truncate">
                          {post.title}
                        </h4>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
                            post.status === 'scheduled'
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                              : post.status === 'review'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="capitalize">{post.platform}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-300">
                          {formatDate(post.dateTime)}
                        </span>
                        <span>·</span>
                        <span>{post.contentType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {post.status === 'review' && (
                      <button
                        onClick={() => {
                          updateContentStatus(post.id, 'scheduled');
                          updateContentApproval(post.id, 'approved');
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 rounded hover:bg-emerald-800"
                      >
                        Approve
                      </button>
                    )}
                    {post.status === 'scheduled' && (
                      <button
                        onClick={() => updateContentStatus(post.id, 'published')}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700 rounded hover:bg-slate-700"
                      >
                        Publish Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-slate-950/80 border border-dashed border-slate-800 rounded-lg text-center space-y-2">
              <Calendar className="w-6 h-6 text-slate-500 mx-auto" />
              <h4 className="text-xs font-semibold text-slate-200">No Posts Scheduled</h4>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Schedule your next teaser, acoustic snippet, or cover art reveal in the calendar pipeline.
              </p>
              <button
                onClick={onOpenNewContentModal}
                className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md font-semibold transition-colors mt-2"
              >
                + Schedule Post
              </button>
            </div>
          )}
        </div>

        {/* Operational Tasks & Alerts (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-100">
                Setup Checklist & Priority Tasks
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Active</span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 't1',
                text: artistProfile.name
                  ? `Artist Profile Configured (${artistProfile.name})`
                  : 'Set up Artist Profile & Stage Name',
                completed: !!artistProfile.name,
                action: onOpenOnboardingModal,
              },
              {
                id: 't2',
                text: connectedAccounts.length > 0
                  ? `Connected ${connectedAccounts.length} Platforms`
                  : 'Connect Instagram & Spotify for Artists',
                completed: connectedAccounts.length > 0,
                action: onOpenConnectModal,
              },
              {
                id: 't3',
                text: releases.length > 0
                  ? `Song Release Registered (${releases[0]?.title})`
                  : 'Register Upcoming Single in Release Manager',
                completed: releases.length > 0,
                action: onOpenNewReleaseModal,
              },
              {
                id: 't4',
                text: contentItems.length > 0
                  ? `${contentItems.length} Content Items in Pipeline`
                  : 'Schedule First Teaser in Content Calendar',
                completed: contentItems.length > 0,
                action: onOpenNewContentModal,
              },
            ].map((task) => (
              <div
                key={task.id}
                onClick={task.action}
                className={`p-2.5 bg-slate-950 rounded-lg border flex items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                  task.completed
                    ? 'border-emerald-800/60 hover:border-emerald-700'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      task.completed
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : 'border border-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span
                    className={`text-xs truncate ${
                      task.completed ? 'text-slate-300' : 'text-slate-200 font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 shrink-0 font-mono">
                  {task.completed ? 'Completed' : 'Setup →'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between text-xs">
            <button
              onClick={onOpenConnectModal}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Connect Another Platform</span>
            </button>
            <span className="text-slate-500 text-[11px]">Sync interval: 15m</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const Megaphone: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);
