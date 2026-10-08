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
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';

interface OverviewViewProps {
  onOpenConnectModal: () => void;
  onOpenNewContentModal: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onOpenConnectModal,
  onOpenNewContentModal,
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
  } = useArtist();

  // Calculate aggregated cross-platform totals
  const totalFollowers = socialAccounts.reduce((acc, a) => acc + a.followers, 0);
  const totalReach = socialAccounts.reduce((acc, a) => acc + a.reach, 0);
  const totalViews = socialAccounts.reduce((acc, a) => acc + a.views, 0);
  const avgEngagement = (
    socialAccounts.reduce((acc, a) => acc + a.engagement, 0) / (socialAccounts.length || 1)
  ).toFixed(1);
  const currentLeadRelease = releases[0];
  const totalStreams = currentLeadRelease?.results.totalStreams || 184500;
  const activeCampaign = campaigns[0];

  // Filter items
  const upcomingPosts = contentItems
    .filter((c) => c.status === 'scheduled' || c.status === 'review' || c.status === 'approved')
    .slice(0, 4);

  const topPerforming = contentItems
    .filter((c) => c.performance && c.performance.views > 0)
    .sort((a, b) => (b.performance?.views || 0) - (a.performance?.views || 0))
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 3-Core Questions Executive Triage Banner */}
      <section className="p-5 bg-gradient-to-r from-slate-900 via-[#111726] to-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              EXECUTIVE TRIAGE · OCT 2026
            </span>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              Artist Momentum & Action Brief
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Active Strategy:{' '}
              <strong className="text-slate-200">Pre-Save & Sound Seeding</strong>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              On Track for +25% MoM
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
                  1. How is {artistProfile.name} doing?
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-medium">
                  +18.4% this month
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Growth velocity is strong. Driven by viral acoustic reels and Spotify editorial adds, total audience reached <strong>{formatNumber(totalFollowers)}</strong> across platforms with <strong>{formatNumber(totalReach)}</strong> monthly reach.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Cross-Platform Reach</span>
              <span className="font-semibold text-slate-200 font-mono">
                {formatNumber(totalReach)}
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
                  3 Priority Tasks
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">·</span>
                  <span>Approve 6:30 PM TikTok sound teaser hook</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">·</span>
                  <span>Send stem pack to Creator @chloecurates</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">·</span>
                  <span>Confirm Spotify pitch for “Velvet Horizon”</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Scheduled Post</span>
              <span className="font-semibold text-amber-400 font-mono">
                Tonight at 6:30 PM
              </span>
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
                Scale acoustic performance snippets. Validated data shows acoustic clips yield <strong>2.4× more saves</strong> than posters. Seed uncompressed guitar audio to 4 confirmed micro-creators in the CRM pipeline.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-[11px]"
              >
                <span>View Full Insight Intelligence</span>
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
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            +18.4% MoM
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
            +31.2% MoM
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
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            +24.5% MoM
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
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            +0.6% vs avg
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Streams (Catalog)</span>
            <Music className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(totalStreams + 982000)}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            +28.1% streams
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
            <span>Pre-Saves (Active)</span>
            <Disc3 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatNumber(currentLeadRelease?.preSavesCount || 4120)}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono mt-1">
            82.4% of goal
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
                  Current Campaign: {activeCampaign?.name}
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Budget Spent</span>
                <div className="text-sm font-semibold text-slate-100 font-mono">
                  {formatCurrency(activeCampaign?.spend || 3840)} /{' '}
                  <span className="text-slate-400">
                    {formatCurrency(activeCampaign?.budget || 5000)}
                  </span>
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Creators Engaged</span>
                <div className="text-sm font-semibold text-slate-100 font-mono">
                  {activeCampaign?.creatorsConfirmed} confirmed / {activeCampaign?.creatorsContacted}
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Direct Streams Driven</span>
                <div className="text-sm font-semibold text-emerald-400 font-mono">
                  {formatNumber(activeCampaign?.streams || 184500)}
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400">Cost Per Stream</span>
                <div className="text-sm font-semibold text-cyan-400 font-mono">
                  ${activeCampaign?.costPerResult.perStream}
                </div>
              </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Budget Utilization (76.8%)</span>
                <span className="font-mono text-slate-300">$1,160 remaining reserve</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                  style={{ width: '76.8%' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Lead Single: “{artistProfile.currentSingle}” · AWAL Release</span>
            <span className="font-mono text-slate-300">Target Window: Ends Nov 5</span>
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
          </div>

          <div className="mt-3 pt-2 text-[11px] text-slate-400 italic">
            💡 Acoustic live clip drives 4.8× average organic reach on TikTok FYP.
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
                        {formatDate(post.dateTime)} at{' '}
                        {new Date(post.dateTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
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
        </div>

        {/* Operational Tasks & Alerts (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-100">
                Alerts & Label Tasks
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">4 Active</span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 't1',
                text: 'Review & sign off Apple Music Motion Artwork deliverable',
                due: 'Today 5:00 PM',
                urgent: true,
              },
              {
                id: 't2',
                text: 'Curator follow-up with @chloecurates on unreleased acoustic stem',
                due: 'Tomorrow',
                urgent: false,
              },
              {
                id: 't3',
                text: 'Spotify editorial pitch deadline for “Velvet Horizon” (14d rule)',
                due: 'Oct 12',
                urgent: true,
              },
              {
                id: 't4',
                text: 'DistroKid / AWAL split sheet verification with co-producer',
                due: 'Oct 15',
                urgent: false,
              },
            ].map((task) => (
              <div
                key={task.id}
                className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-slate-700 text-cyan-400 focus:ring-0 cursor-pointer"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-200">{task.text}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span
                      className={`font-mono ${
                        task.urgent ? 'text-amber-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      Due {task.due}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between text-xs">
            <button
              onClick={onOpenConnectModal}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Connect Another Social Platform</span>
            </button>
            <span className="text-slate-500 text-[11px]">Sync interval: 15m</span>
          </div>
        </div>
      </section>
    </div>
  );
};
