import React, { useState } from 'react';
import { X, Calendar, Sparkles, Image, Video, CheckCircle, Tag } from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { ContentStatus, ContentApproval } from '../../types';

interface NewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewContentModal: React.FC<NewContentModalProps> = ({ isOpen, onClose }) => {
  const { addContentItem, libraryAssets, campaigns, artistProfile } = useArtist();

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [dateTime, setDateTime] = useState('2026-10-14T18:30');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('#MidnightEchoes #Acoustic #IndiePop');
  const [selectedMediaUrl, setSelectedMediaUrl] = useState(
    libraryAssets[0]?.url || '/src/assets/images/album_cover_acoustic_1791446763851.jpg'
  );
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'carousel'>('video');
  const [contentType, setContentType] = useState<
    'Reel' | 'Story' | 'Photo' | 'Lyric Video' | 'BTS' | 'Poster' | 'Live Clip'
  >('Reel');
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || 'cmp_midnight_echoes');
  const [status, setStatus] = useState<ContentStatus>('scheduled');
  const [approvalStatus, setApprovalStatus] = useState<ContentApproval>('approved');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCampaign = campaigns.find((c) => c.id === campaignId);
    const parsedHashtags = hashtags
      .split(' ')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addContentItem({
      title: title || `${contentType} for ${platform}`,
      platform,
      dateTime: new Date(dateTime).toISOString(),
      caption,
      hashtags: parsedHashtags,
      mediaUrl: selectedMediaUrl,
      mediaType,
      campaignId,
      campaignName: selectedCampaign?.name || 'General Release',
      contentType,
      status,
      approvalStatus,
      notes: `Created by ${artistProfile.name} team.`,
      performance: { views: 0, likes: 0, saves: 0, comments: 0 },
    });

    onClose();
    // Reset form
    setTitle('');
    setCaption('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Create / Schedule Content Item
            </h2>
            <p className="text-xs text-slate-400">
              Add new post to pipeline: Draft → Review → Approved → Scheduled → Published
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Content Title / Hook Summary
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Acoustic Bedroom Teaser Hook"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="tiktok">TikTok (@aura.vane)</option>
                <option value="instagram">Instagram (@auravanemusic)</option>
                <option value="youtube">YouTube Shorts (@AuraVaneOfficial)</option>
                <option value="spotify">Spotify Canvas / Clip</option>
                <option value="facebook">Facebook Page</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) =>
                  setContentType(
                    e.target.value as
                      | 'Reel'
                      | 'Story'
                      | 'Photo'
                      | 'Lyric Video'
                      | 'BTS'
                      | 'Poster'
                      | 'Live Clip'
                  )
                }
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="Reel">Reel / Vertical Video</option>
                <option value="Story">Story</option>
                <option value="Live Clip">Live / Acoustic Clip</option>
                <option value="BTS">BTS / Studio Video</option>
                <option value="Lyric Video">Lyric Video Snippet</option>
                <option value="Photo">Photo Carousel</option>
                <option value="Poster">Poster / Artwork</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Pipeline Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="approved">Approved</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Approval State
              </label>
              <select
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value as ContentApproval)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="approved">Approved by Manager</option>
                <option value="pending">Pending Review</option>
                <option value="changes_requested">Changes Requested</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Scheduled Date & Time
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Associated Campaign
              </label>
              <select
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">
                Caption
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {caption.length} chars
              </span>
            </div>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write the artist caption..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Hashtags (space separated)
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Media from Content Library
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-32 overflow-y-auto p-1 bg-slate-950 rounded-lg border border-slate-800">
              {libraryAssets.map((asset) => {
                const isSelected = selectedMediaUrl === asset.url;
                return (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedMediaUrl(asset.url);
                      setMediaType(asset.folder === 'Reels' || asset.folder === 'BTS' ? 'video' : 'image');
                    }}
                    className={`cursor-pointer rounded-md overflow-hidden border relative group ${
                      isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/40' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={asset.url}
                      alt={asset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-14 object-cover"
                    />
                    <div className="text-[9px] p-0.5 truncate bg-slate-900/90 text-slate-300">
                      {asset.folder}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors"
            >
              Add to Calendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
