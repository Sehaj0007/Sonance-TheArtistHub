import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Columns,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Filter,
  Eye,
  Send,
  MoreVertical,
  X,
  FileEdit,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { ContentItem, ContentStatus, ContentApproval } from '../../types';
import { formatDate, getPlatformMeta } from '../../utils/formatters';

interface ContentCalendarViewProps {
  onOpenNewContentModal: () => void;
}

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  onOpenNewContentModal,
}) => {
  const { contentItems, updateContentStatus, updateContentApproval, deleteContentItem } =
    useArtist();

  const [viewMode, setViewMode] = useState<'kanban' | 'calendar'>('kanban');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const stages: { id: ContentStatus; label: string; color: string }[] = [
    { id: 'draft', label: 'Draft', color: 'border-slate-700 text-slate-300' },
    { id: 'review', label: 'Review', color: 'border-amber-700/60 text-amber-400' },
    { id: 'approved', label: 'Approved', color: 'border-emerald-700/60 text-emerald-400' },
    { id: 'scheduled', label: 'Scheduled', color: 'border-cyan-700/60 text-cyan-400' },
    { id: 'published', label: 'Published', color: 'border-indigo-700/60 text-indigo-400' },
  ];

  const filteredItems = contentItems.filter((item) => {
    if (platformFilter === 'all') return true;
    return item.platform.toLowerCase() === platformFilter.toLowerCase();
  });

  const handleAdvanceStatus = (item: ContentItem) => {
    const currentIndex = stages.findIndex((s) => s.id === item.status);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1].id;
      updateContentStatus(item.id, nextStage);
      if (nextStage === 'approved' || nextStage === 'scheduled') {
        updateContentApproval(item.id, 'approved');
      }
    }
  };

  const handleRegressStatus = (item: ContentItem) => {
    const currentIndex = stages.findIndex((s) => s.id === item.status);
    if (currentIndex > 0) {
      const prevStage = stages[currentIndex - 1].id;
      updateContentStatus(item.id, prevStage);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Calendar Header & Controls */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Content Pipeline & Publishing Calendar
          </h2>
          <p className="text-xs text-slate-400">
            Lifecycle: <code className="text-slate-300">Draft → Review → Approved → Scheduled → Published</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Pipeline Stages</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'calendar'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Monthly Grid</span>
            </button>
          </div>

          {/* Platform Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-xs">
            {['all', 'tiktok', 'instagram', 'youtube', 'spotify', 'facebook'].map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize whitespace-nowrap ${
                  platformFilter === p
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenNewContentModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Item</span>
          </button>
        </div>
      </div>

      {/* Kanban Stages View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-start">
          {stages.map((stage) => {
            const stageItems = filteredItems.filter((i) => i.status === stage.id);
            return (
              <div
                key={stage.id}
                className="bg-slate-900/50 border border-slate-800/90 rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200 tracking-tight">
                      {stage.label}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      ({stageItems.length})
                    </span>
                  </div>
                </div>

                {/* Items in Stage */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageItems.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-600 border border-dashed border-slate-800/80 rounded-lg">
                      No posts in {stage.label}
                    </div>
                  ) : (
                    stageItems.map((item) => {
                      const meta = getPlatformMeta(item.platform);
                      return (
                        <div
                          key={item.id}
                          className="p-3 bg-slate-950/90 border border-slate-800 rounded-lg hover:border-slate-700 transition-all shadow-xs flex flex-col justify-between group"
                        >
                          <div>
                            {/* Card Top */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span
                                className="text-[10px] font-semibold uppercase tracking-wider font-mono px-1.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: meta.bgLight,
                                  color: meta.color,
                                }}
                              >
                                {item.platform}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {item.contentType}
                              </span>
                            </div>

                            {/* Media & Title */}
                            <div className="flex gap-2.5 mb-2">
                              <img
                                src={item.mediaUrl}
                                alt={item.title}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded object-cover shrink-0 border border-slate-800 cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                              />
                              <div className="min-w-0">
                                <h4
                                  onClick={() => setSelectedItem(item)}
                                  className="text-xs font-semibold text-slate-200 hover:text-cyan-400 cursor-pointer line-clamp-2 leading-snug"
                                >
                                  {item.title}
                                </h4>
                                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                                  {item.campaignName}
                                </span>
                              </div>
                            </div>

                            {/* Caption excerpt */}
                            <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 italic">
                              "{item.caption}"
                            </p>

                            {/* Scheduled Time & Hashtags */}
                            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                              <span className="font-mono flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 text-slate-500" />
                                {formatDate(item.dateTime)}
                              </span>
                              <span
                                className={`font-mono text-[9px] uppercase px-1 rounded ${
                                  item.approvalStatus === 'approved'
                                    ? 'text-emerald-400 bg-emerald-950/60'
                                    : 'text-amber-400 bg-amber-950/60'
                                }`}
                              >
                                {item.approvalStatus}
                              </span>
                            </div>
                          </div>

                          {/* Quick Stage Progression Buttons */}
                          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                            <button
                              onClick={() => setSelectedItem(item)}
                              className="text-[11px] text-slate-400 hover:text-slate-200"
                            >
                              Inspect
                            </button>

                            <div className="flex items-center gap-1">
                              {stage.id !== 'draft' && (
                                <button
                                  onClick={() => handleRegressStatus(item)}
                                  className="text-[10px] text-slate-500 hover:text-slate-300 px-1"
                                  title="Move to previous stage"
                                >
                                  ← Back
                                </button>
                              )}
                              {stage.id !== 'published' && (
                                <button
                                  onClick={() => handleAdvanceStatus(item)}
                                  className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded flex items-center gap-0.5"
                                  title="Advance to next stage"
                                >
                                  <span>Next</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </div>
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
        /* Calendar Month View */
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100">
              October 2026 Schedule
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Release Target: Oct 18 (“Midnight Echoes”)
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 font-medium pb-2 border-b border-slate-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const dayNum = i + 1;
              const datePrefix = `2026-10-${dayNum.toString().padStart(2, '0')}`;
              const daysPosts = filteredItems.filter((item) =>
                item.dateTime.startsWith(datePrefix)
              );
              const isToday = dayNum === 8;
              const isReleaseDay = dayNum === 18;

              return (
                <div
                  key={dayNum}
                  className={`min-h-[90px] p-1.5 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'bg-slate-900 border-cyan-400/80 shadow-xs'
                      : isReleaseDay
                      ? 'bg-indigo-950/40 border-indigo-500/80'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-mono font-medium ${
                        isToday
                          ? 'text-cyan-400 font-bold'
                          : isReleaseDay
                          ? 'text-indigo-400 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1 rounded font-mono">
                        TODAY
                      </span>
                    )}
                    {isReleaseDay && (
                      <span className="text-[9px] bg-indigo-950 text-indigo-300 px-1 rounded font-mono">
                        SINGLE DROP
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 my-1 overflow-hidden">
                    {daysPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedItem(post)}
                        className="text-[10px] p-1 rounded bg-slate-900 border border-slate-800 text-slate-200 truncate cursor-pointer hover:border-cyan-400"
                      >
                        <span className="font-semibold capitalize text-cyan-400 mr-1">
                          {post.platform.slice(0, 2)}:
                        </span>
                        {post.title}
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] text-slate-500 text-right">
                    {daysPosts.length > 0 ? `${daysPosts.length} posts` : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Content Item Inspector Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-lg w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">
                  {selectedItem.platform} · {selectedItem.contentType}
                </span>
                <h3 className="text-sm font-semibold text-slate-100">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-800 max-h-56 bg-black flex items-center justify-center">
              <img
                src={selectedItem.mediaUrl}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                <div className="text-[10px] text-slate-400 mb-1 font-mono uppercase">
                  Caption & Copy
                </div>
                <p className="leading-relaxed">{selectedItem.caption}</p>
                <div className="mt-2 text-cyan-400 font-mono text-[11px]">
                  {selectedItem.hashtags.join(' ')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  Scheduled:{' '}
                  <span className="text-slate-200 font-mono">
                    {formatDate(selectedItem.dateTime)}
                  </span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  Campaign:{' '}
                  <span className="text-slate-200">
                    {selectedItem.campaignName}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteContentItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="text-xs text-rose-400 hover:text-rose-300"
              >
                Delete Post
              </button>
              <div className="flex gap-2">
                {selectedItem.status !== 'published' && (
                  <button
                    onClick={() => {
                      updateContentStatus(selectedItem.id, 'published');
                      setSelectedItem(null);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-lg"
                  >
                    Publish Now
                  </button>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
