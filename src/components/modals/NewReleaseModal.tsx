import React, { useState } from 'react';
import { X, Disc3, Music, Upload } from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';

interface NewReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewReleaseModal: React.FC<NewReleaseModalProps> = ({ isOpen, onClose }) => {
  const { addSongRelease, libraryAssets } = useArtist();

  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('Lead Single');
  const [releaseDate, setReleaseDate] = useState('2026-11-20');
  const [distributor, setDistributor] = useState('AWAL');
  const [isrc, setIsrc] = useState(`US-AWL-26-${Math.floor(Math.random() * 89999 + 10000)}`);
  const [upc, setUpc] = useState(`1971890${Math.floor(Math.random() * 89999 + 10000)}`);
  const [coverArtwork, setCoverArtwork] = useState(
    libraryAssets[0]?.url || '/src/assets/images/album_cover_single_1791446740671.jpg'
  );
  const [preSaveGoal, setPreSaveGoal] = useState(5000);
  const [adsBudget, setAdsBudget] = useState(3000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    addSongRelease({
      title,
      version,
      releaseDate,
      distributor,
      isrc,
      upc,
      spotifyUrl: `https://open.spotify.com/track/${slug}`,
      spotifyUri: `spotify:track:${slug}`,
      appleMusicUrl: `https://music.apple.com/album/${slug}`,
      youtubeMusicUrl: `https://music.youtube.com/watch?v=${slug}`,
      coverArtwork,
      preSaveUrl: `https://ffm.to/${slug}-aura`,
      preSavesCount: 0,
      preSaveGoal,
      teasers: [
        { id: `ts_${Date.now()}_1`, title: 'Studio Synthesizer Teaser', scheduledFor: '2026-11-05', status: 'planned', platform: 'TikTok' },
        { id: `ts_${Date.now()}_2`, title: 'Chorus Hook Reveal', scheduledFor: '2026-11-12', status: 'planned', platform: 'Instagram' },
      ],
      releaseContent: [
        { id: `rc_${Date.now()}_1`, title: 'Official Lyric Video 4K', type: 'Video', status: 'pending' },
        { id: `rc_${Date.now()}_2`, title: 'Spotify Canvas Loop', type: 'Canvas', status: 'ready' },
      ],
      influencerCampaign: `${title} Creator Campaign`,
      adsBudget,
      adsSpend: 0,
      results: {
        totalStreams: 0,
        spotifyStreams: 0,
        appleStreams: 0,
        ytMusicStreams: 0,
        playlistAdds: 0,
        saves: 0,
        milestonePassed: 'Pre-Save Campaign Initiated',
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc3 className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Register New Song Release
              </h2>
              <p className="text-xs text-slate-400">
                Configure metadata, ISRC, pre-save funnel, distributor & DSP links
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
                Song Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Velvet Horizon"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Version / Mix
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g. Lead Single / Acoustic Live"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Release Date
              </label>
              <input
                type="date"
                required
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Distributor
              </label>
              <select
                value={distributor}
                onChange={(e) => setDistributor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="AWAL">AWAL / Ghostwood</option>
                <option value="DistroKid">DistroKid</option>
                <option value="The Orchard">The Orchard</option>
                <option value="TuneCore">TuneCore</option>
                <option value="Stem">Stem Disintermedia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                ISRC Code
              </label>
              <input
                type="text"
                required
                value={isrc}
                onChange={(e) => setIsrc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                UPC / Barcode
              </label>
              <input
                type="text"
                value={upc}
                onChange={(e) => setUpc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Pre-Save Goal (Target Count)
              </label>
              <input
                type="number"
                value={preSaveGoal}
                onChange={(e) => setPreSaveGoal(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Initial Ads Budget ($)
              </label>
              <input
                type="number"
                value={adsBudget}
                onChange={(e) => setAdsBudget(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Cover Artwork
            </label>
            <div className="flex gap-3 overflow-x-auto p-1 bg-slate-950 rounded-lg border border-slate-800">
              {libraryAssets
                .filter((a) => a.folder === 'Covers' || a.folder === 'Posters')
                .map((asset) => {
                  const isSelected = coverArtwork === asset.url;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setCoverArtwork(asset.url)}
                      className={`cursor-pointer rounded-lg overflow-hidden border shrink-0 w-20 h-20 relative ${
                        isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/50' : 'border-slate-800'
                      }`}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
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
              Save Release
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
