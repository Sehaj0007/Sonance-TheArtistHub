import React, { useState } from 'react';
import { X, Megaphone, ListMusic } from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { PlacementStatus } from '../../types';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({ isOpen, onClose }) => {
  const { addCampaign, releases } = useArtist();

  const [name, setName] = useState('');
  const [songId, setSongId] = useState(releases[0]?.id || 'rel_01');
  const [budget, setBudget] = useState(4000);
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-11-20');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const song = releases.find((r) => r.id === songId);
    addCampaign({
      name: name || `${song?.title} Promo Campaign`,
      songId,
      songTitle: song?.title || 'Lead Single',
      status: 'active',
      startDate,
      endDate,
      budget,
      spend: 0,
      creatorsContacted: 0,
      creatorsConfirmed: 0,
      postsPublished: 0,
      reach: 0,
      engagement: 0,
      clicks: 0,
      streams: 0,
      costPerResult: {
        perStream: 0,
        perClick: 0,
        perPost: 0,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100">
              Create Growth Campaign
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Midnight Echoes - Acoustic Seeding Wave"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Associated Song Release
            </label>
            <select
              value={songId}
              onChange={(e) => setSongId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              {releases.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.version})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Total Budget ($ USD)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const NewPlaylistPitchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { addPlaylistPitch, releases } = useArtist();

  const [distributor, setDistributor] = useState('AWAL Direct Pitch');
  const [songTitle, setSongTitle] = useState(releases[0]?.title || 'Midnight Echoes');
  const [playlistPitched, setPlaylistPitched] = useState('');
  const [curator, setCurator] = useState('');
  const [platform, setPlatform] = useState<'Spotify' | 'Apple Music' | 'Amazon Music' | 'YouTube Music'>('Spotify');
  const [placement, setPlacement] = useState<PlacementStatus>('Pitched');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlaylistPitch({
      distributor,
      songTitle,
      submissionDate: new Date().toISOString().split('T')[0],
      playlistPitched,
      curator: curator || 'Editorial Curator',
      response: 'Pending',
      placement,
      streams: 0,
      notes,
      platform,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100">
              Submit Playlist Pitch
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Playlist Name
            </label>
            <input
              type="text"
              required
              value={playlistPitched}
              onChange={(e) => setPlaylistPitched(e.target.value)}
              placeholder="e.g. Fresh Finds Indie / New Music Friday"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="Spotify">Spotify</option>
                <option value="Apple Music">Apple Music</option>
                <option value="YouTube Music">YouTube Music</option>
                <option value="Amazon Music">Amazon Music</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Song
              </label>
              <select
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {releases.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Distributor / Channel
              </label>
              <input
                type="text"
                value={distributor}
                onChange={(e) => setDistributor(e.target.value)}
                placeholder="AWAL / Spotify for Artists"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Curator Name
              </label>
              <input
                type="text"
                value={curator}
                onChange={(e) => setCurator(e.target.value)}
                placeholder="Editorial Team"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Curator Pitch Angle / Audio Link Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Highlighting acoustic instrumentation, organic hook, and upcoming headline tour..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg"
            >
              Record Pitch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
