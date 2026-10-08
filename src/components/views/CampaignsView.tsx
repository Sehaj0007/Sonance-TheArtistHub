import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  DollarSign,
  TrendingUp,
  Users,
  MousePointer,
  Music,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber, formatCurrency, formatDate } from '../../utils/formatters';

interface CampaignsViewProps {
  onOpenNewCampaignModal: () => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ onOpenNewCampaignModal }) => {
  const { campaigns } = useArtist();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'planning' | 'completed'>('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalStreamsDriven = campaigns.reduce((acc, c) => acc + c.streams, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Growth & Marketing Campaigns
          </h2>
          <p className="text-xs text-slate-400">
            Multi-channel promotional budgets, creator seeding waves, and cost-per-result analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            {(['all', 'active', 'planning', 'completed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenNewCampaignModal}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Overview Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Total Campaign Budget</span>
          <div className="text-xl font-bold text-slate-100 font-mono mt-1">
            {formatCurrency(totalBudget)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Active spend: <span className="text-cyan-400 font-mono">{formatCurrency(totalSpend)}</span> (
            {Math.round((totalSpend / totalBudget) * 100)}%)
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Direct Streams Generated</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {formatNumber(totalStreamsDriven)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Blended Cost per Stream:{' '}
            <span className="text-slate-200 font-mono font-semibold">
              ${(totalSpend / (totalStreamsDriven || 1)).toFixed(3)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Creator Posts Delivered</span>
          <div className="text-xl font-bold text-slate-100 font-mono mt-1">
            {campaigns.reduce((acc, c) => acc + c.postsPublished, 0)} posts
          </div>
          <div className="text-[11px] text-cyan-400 font-mono mt-1">
            {campaigns.reduce((acc, c) => acc + c.creatorsConfirmed, 0)} creators active
          </div>
        </div>
      </div>

      {/* Campaigns Detailed List */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl text-center space-y-3">
            <Megaphone className="w-10 h-10 text-cyan-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-100">No Growth Campaigns Active</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Launch a structured release campaign to monitor promotional budgets, influencer outreach pipelines, sound seeding, and cost-per-stream return on investment.
            </p>
            <button
              onClick={onOpenNewCampaignModal}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Launch First Campaign</span>
            </button>
          </div>
        ) : (
          filteredCampaigns.map((camp) => {
            const spendPct = Math.min(100, Math.round((camp.spend / camp.budget) * 100));
            return (
              <div
                key={camp.id}
                className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-colors"
              >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100">
                      {camp.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        camp.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : camp.status === 'planning'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono">
                    Target Song: <strong className="text-slate-200">{camp.songTitle}</strong> · Duration: {formatDate(camp.startDate)} – {formatDate(camp.endDate)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-300">
                    Budget: <strong>{formatCurrency(camp.spend)}</strong> / {formatCurrency(camp.budget)}
                  </span>
                  <div className="w-36 h-2 rounded-full bg-slate-800 overflow-hidden mt-1 ml-auto">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${spendPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Exact Metrics Specified by User */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-xs">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Creators Contacted</span>
                  <span className="font-mono font-bold text-slate-200">{camp.creatorsContacted}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Creators Confirmed</span>
                  <span className="font-mono font-bold text-emerald-400">{camp.creatorsConfirmed}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Posts Published</span>
                  <span className="font-mono font-bold text-cyan-400">{camp.postsPublished}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Reach</span>
                  <span className="font-mono font-bold text-slate-100">{formatNumber(camp.reach)}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Engagement</span>
                  <span className="font-mono font-bold text-slate-100">{formatNumber(camp.engagement)}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Clicks</span>
                  <span className="font-mono font-bold text-slate-100">{formatNumber(camp.clicks)}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Streams</span>
                  <span className="font-mono font-bold text-emerald-400">{formatNumber(camp.streams)}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cost / Stream</span>
                  <span className="font-mono font-bold text-cyan-400">${camp.costPerResult.perStream}</span>
                </div>
              </div>

              {/* Cost Per Result Breakdown */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span>
                    Cost Per Click: <strong className="text-slate-200 font-mono">${camp.costPerResult.perClick}</strong>
                  </span>
                  <span>
                    Average Creator Fee: <strong className="text-slate-200 font-mono">${camp.costPerResult.perPost}</strong>
                  </span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">
                  ✓ Algorithmic Target Reached
                </span>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
};
