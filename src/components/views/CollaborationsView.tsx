import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Columns,
  Table as TableIcon,
  Search,
  Filter,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Trash2,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { CreatorCollaboration, CreatorStatus } from '../../types';
import { formatNumber, formatCurrency, formatDate, getPlatformMeta } from '../../utils/formatters';

interface CollaborationsViewProps {
  onOpenNewCreatorModal: () => void;
}

export const CollaborationsView: React.FC<CollaborationsViewProps> = ({
  onOpenNewCreatorModal,
}) => {
  const { collaborations, updateCreator, deleteCreator } = useArtist();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');

  const statuses: { id: CreatorStatus; label: string; color: string }[] = [
    { id: 'Research', label: 'Research', color: 'border-slate-700 text-slate-300' },
    { id: 'Contacted', label: 'Contacted', color: 'border-blue-700/60 text-blue-400' },
    { id: 'Replied', label: 'Replied', color: 'border-indigo-700/60 text-indigo-400' },
    { id: 'Negotiating', label: 'Negotiating', color: 'border-amber-700/60 text-amber-400' },
    { id: 'Confirmed', label: 'Confirmed', color: 'border-emerald-700/60 text-emerald-400' },
    { id: 'Posted', label: 'Posted', color: 'border-cyan-700/60 text-cyan-400' },
    { id: 'Completed', label: 'Completed', color: 'border-purple-700/60 text-purple-400' },
  ];

  const filteredCollaborations = collaborations.filter((c) => {
    const matchesSearch =
      c.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform =
      platformFilter === 'all' || c.platform.toLowerCase() === platformFilter.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  const handleAdvanceStatus = (creator: CreatorCollaboration) => {
    const currentIdx = statuses.findIndex((s) => s.id === creator.status);
    if (currentIdx < statuses.length - 1) {
      updateCreator({
        ...creator,
        status: statuses[currentIdx + 1].id,
      });
    }
  };

  const totalFeeCommitted = collaborations
    .filter((c) => c.status === 'Confirmed' || c.status === 'Posted' || c.status === 'Completed')
    .reduce((acc, c) => acc + c.fee, 0);

  const totalCreatorsConfirmed = collaborations.filter(
    (c) => c.status === 'Confirmed' || c.status === 'Posted' || c.status === 'Completed'
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Influencer & Creator CRM
          </h2>
          <p className="text-xs text-slate-400">
            Pipeline: <code className="text-slate-300">Research → Contacted → Replied → Negotiating → Confirmed → Posted → Completed</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View toggle */}
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creator, niche, city..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-56"
            />
          </div>

          <button
            onClick={onOpenNewCreatorModal}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Creator</span>
          </button>
        </div>
      </div>

      {/* CRM Top Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-slate-400 font-mono">TOTAL CREATORS</span>
          <div className="text-base font-bold text-slate-100 font-mono mt-0.5">
            {collaborations.length} Creators
          </div>
        </div>
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-slate-400 font-mono">CONFIRMED / POSTED</span>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
            {totalCreatorsConfirmed} Confirmed
          </div>
        </div>
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-slate-400 font-mono">TOTAL COMMITTED FEES</span>
          <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
            {formatCurrency(totalFeeCommitted)}
          </div>
        </div>
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-slate-400 font-mono">ESTIMATED CREATOR REACH</span>
          <div className="text-base font-bold text-slate-100 font-mono mt-0.5">
            {formatNumber(collaborations.reduce((acc, c) => acc + c.reach, 0))}
          </div>
        </div>
      </div>

      {/* View: Kanban vs Table */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-start overflow-x-auto pb-4">
          {statuses.map((st) => {
            const list = filteredCollaborations.filter((c) => c.status === st.id);
            return (
              <div
                key={st.id}
                className="bg-slate-900/50 border border-slate-800/90 rounded-xl p-2.5 flex flex-col min-w-[210px] min-h-[460px]"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">
                    {st.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ({list.length})
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {list.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-600 border border-dashed border-slate-800/80 rounded-lg">
                      No creators
                    </div>
                  ) : (
                    list.map((creator) => {
                      const meta = getPlatformMeta(creator.platform);
                      return (
                        <div
                          key={creator.id}
                          className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span
                                className="text-[9px] font-semibold uppercase tracking-wider font-mono px-1 rounded"
                                style={{
                                  backgroundColor: meta.bgLight,
                                  color: meta.color,
                                }}
                              >
                                {creator.platform}
                              </span>
                              <span className="text-[11px] font-mono text-slate-200 font-bold">
                                {formatCurrency(creator.fee)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-1.5">
                              <img
                                src={creator.avatar}
                                alt={creator.creator}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover border border-slate-800 shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-slate-100 truncate">
                                  {creator.creator}
                                </h4>
                                <span className="text-[10px] text-slate-400 font-mono truncate block">
                                  {creator.handle}
                                </span>
                              </div>
                            </div>

                            <div className="text-[10px] text-slate-400 space-y-0.5">
                              <div>{formatNumber(creator.followers)} followers · {creator.niche}</div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-slate-500" />
                                <span>{creator.location}</span>
                              </div>
                            </div>

                            <p className="text-[10px] text-slate-300 mt-1.5 p-1 bg-slate-900 rounded font-mono truncate">
                              {creator.deliverables}
                            </p>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-mono">
                              {formatDate(creator.postingDate)}
                            </span>
                            {st.id !== 'Completed' && (
                              <button
                                onClick={() => handleAdvanceStatus(creator)}
                                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-medium"
                              >
                                <span>Next</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* High-Density Table View */
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-mono">
                <th className="py-2 px-3">Creator</th>
                <th className="py-2 px-3">Platform</th>
                <th className="py-2 px-3 text-right">Followers</th>
                <th className="py-2 px-3">Niche</th>
                <th className="py-2 px-3">Location</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Fee</th>
                <th className="py-2 px-3">Deliverables</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Results</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCollaborations.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500">
                    <UserCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No creators in CRM yet</p>
                    <button
                      onClick={onOpenNewCreatorModal}
                      className="mt-2 text-xs font-semibold text-cyan-400 hover:underline inline-block"
                    >
                      + Add Your First Creator
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCollaborations.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-100">{c.creator}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{c.handle}</div>
                    </td>
                  <td className="py-2.5 px-3 capitalize font-mono text-cyan-400">
                    {c.platform}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-200">
                    {formatNumber(c.followers)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{c.niche}</td>
                  <td className="py-2.5 px-3 text-slate-400">{c.location}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-emerald-400 font-bold">
                    {formatCurrency(c.fee)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate">
                    {c.deliverables}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">
                    {formatDate(c.postingDate)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs truncate">
                    {c.results}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => deleteCreator(c.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
