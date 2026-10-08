import React, { useState } from 'react';
import { X, UserCheck } from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { CreatorStatus } from '../../types';

interface NewCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCreatorModal: React.FC<NewCreatorModalProps> = ({ isOpen, onClose }) => {
  const { addCreator } = useArtist();

  const [creator, setCreator] = useState('');
  const [handle, setHandle] = useState('@');
  const [platform, setPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');
  const [followers, setFollowers] = useState(250000);
  const [niche, setNiche] = useState('Indie Music / Aesthetic Reels');
  const [location, setLocation] = useState('London, UK');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<CreatorStatus>('Research');
  const [fee, setFee] = useState(350);
  const [deliverables, setDeliverables] = useState('1x Reel / TikTok Sound Duet');
  const [postingDate, setPostingDate] = useState('2026-10-20');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCreator({
      creator,
      handle,
      avatar: '/src/assets/images/artist_press_photo_1791446727519.jpg',
      platform,
      followers,
      niche,
      location,
      contact,
      status,
      fee,
      deliverables,
      postingDate,
      reach: Math.round(followers * 0.7),
      engagement: 7.2,
      results: 'New campaign seed',
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Add Influencer / Creator Collaboration
              </h2>
              <p className="text-xs text-slate-400">
                Track rates, deliverables, outreach stage & results
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Creator / Channel Name
              </label>
              <input
                type="text"
                required
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Social Handle
              </label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@handle"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as 'tiktok' | 'instagram' | 'youtube')}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Follower Count
              </label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Fee ($ USD)
              </label>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Niche / Aesthetic
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Indie Vocals / Synth Jams"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Melbourne, AU"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Contact Email / DM
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="mgmt@creator.com"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Pipeline Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CreatorStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="Research">Research</option>
                <option value="Contacted">Contacted</option>
                <option value="Replied">Replied</option>
                <option value="Negotiating">Negotiating</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Posted">Posted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Deliverables Agreed
            </label>
            <input
              type="text"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder="e.g. 1x Reel Sound Duet + Link in bio 48h"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Outreach Notes / Sound Pack Sent
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add key notes, sound stem links, or curator correspondence..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
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
              Add to CRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
