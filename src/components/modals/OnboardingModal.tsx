import React, { useState } from 'react';
import {
  Sparkles,
  Music,
  CheckCircle2,
  ArrowRight,
  Disc3,
  Layers,
  User,
  Sliders,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { updateArtistProfile, setIsOnboarded, loadSampleData, addSongRelease } = useArtist();

  const [step, setStep] = useState<1 | 2>(1);
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('Indie Pop / Alternative');
  const [tagline, setTagline] = useState('');
  const [label, setLabel] = useState('Independent');
  const [manager, setManager] = useState('Self-Managed');
  const [currentSingle, setCurrentSingle] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [selectedAvatar, setSelectedAvatar] = useState(
    '/src/assets/images/artist_press_photo_1791446727519.jpg'
  );

  if (!isOpen) return null;

  const handleCompleteSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = artistName.trim() || 'My Artist Project';
    const singleTitle = currentSingle.trim();

    updateArtistProfile({
      name: finalName,
      genre: genre.trim() || 'Independent Artist',
      tagline: tagline.trim() || `Artist & Songwriter · ${label}`,
      label: label.trim() || 'Independent',
      manager: manager.trim() || 'Self-Managed',
      currentSingle: singleTitle || '',
      currency,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      avatarUrl: selectedAvatar,
    });

    if (singleTitle) {
      const slug = singleTitle.toLowerCase().replace(/\s+/g, '-');
      addSongRelease({
        title: singleTitle,
        version: 'Lead Single (Original Mix)',
        releaseDate: new Date(Date.now() + 24 * 86400000).toISOString().split('T')[0],
        distributor: label.includes('Independent') ? 'DistroKid' : label,
        isrc: `US-ART-26-${Math.floor(Math.random() * 89999 + 10000)}`,
        upc: `198290${Math.floor(Math.random() * 89999 + 10000)}`,
        spotifyUrl: `https://open.spotify.com/track/${slug}`,
        spotifyUri: `spotify:track:${slug}`,
        appleMusicUrl: `https://music.apple.com/album/${slug}`,
        youtubeMusicUrl: `https://music.youtube.com/watch?v=${slug}`,
        coverArtwork: selectedAvatar,
        preSaveUrl: `https://ffm.to/${slug}-${finalName.toLowerCase().replace(/\s+/g, '')}`,
        preSavesCount: 0,
        preSaveGoal: 2500,
        teasers: [
          {
            id: `ts_${Date.now()}_1`,
            title: 'Studio Rehearsal Clip',
            scheduledFor: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
            status: 'planned',
            platform: 'TikTok',
          },
          {
            id: `ts_${Date.now()}_2`,
            title: 'Acoustic Chorus Hook',
            scheduledFor: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            status: 'planned',
            platform: 'Instagram',
          },
        ],
        releaseContent: [
          { id: `rc_${Date.now()}_1`, title: 'Official 4K Lyric Visualizer', type: 'Video', status: 'pending' },
          { id: `rc_${Date.now()}_2`, title: 'Spotify Canvas Loop (9:16)', type: 'Canvas', status: 'ready' },
        ],
        influencerCampaign: `${singleTitle} Creator Wave`,
        adsBudget: 1500,
        adsSpend: 0,
        results: {
          totalStreams: 0,
          spotifyStreams: 0,
          appleStreams: 0,
          ytMusicStreams: 0,
          playlistAdds: 0,
          saves: 0,
          milestonePassed: 'Release Pipeline Registered',
        },
      });
    }

    setIsOnboarded(true);
    onClose();
  };

  const handleUseSampleData = () => {
    loadSampleData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-cyan-900/60 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80">
              WELCOME TO SONANCE HUB
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Step {step} of 2
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-100 tracking-tight">
            Set Up Your Artist Workspace
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Personalize your music growth command center for your career and team.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCompleteSetup} className="p-6 space-y-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Artist or Band Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="e.g. Maya Lin / Nova Drift"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Primary Music Genre
                  </label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="e.g. Indie Pop, Alt-R&B, Electronic"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Distribution / Label Setup
                  </label>
                  <select
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Independent (Self-Released)">Independent (Self-Released)</option>
                    <option value="DistroKid">DistroKid</option>
                    <option value="AWAL / Kobalt">AWAL / Kobalt</option>
                    <option value="TuneCore">TuneCore</option>
                    <option value="The Orchard">The Orchard</option>
                    <option value="Major Label Partner">Major Label Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Short Tagline or Bio
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Electronic producer & vocalist based in Melbourne"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Select Profile Photo Avatar
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    '/src/assets/images/artist_press_photo_1791446727519.jpg',
                    '/src/assets/images/album_cover_single_1791446740671.jpg',
                    '/src/assets/images/album_cover_acoustic_1791446763851.jpg',
                    '/src/assets/images/release_poster_visual_1791446775711.jpg',
                  ].map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedAvatar(imgUrl)}
                      className={`cursor-pointer rounded-lg overflow-hidden border transition-all ${
                        selectedAvatar === imgUrl
                          ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img src={imgUrl} alt="Avatar" className="w-full h-16 object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleUseSampleData}
                  className="text-xs text-slate-400 hover:text-cyan-400 underline underline-offset-4"
                >
                  Or explore with example demo artist
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Current Single or Next Release Title
                </label>
                <input
                  type="text"
                  value={currentSingle}
                  onChange={(e) => setCurrentSingle(e.target.value)}
                  placeholder="e.g. Summer Haze"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Management / Team Contact
                  </label>
                  <input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    placeholder="e.g. Self-Managed or Manager Name"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Currency Preference
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready for Live Career Telemetry</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Upon completion, your workspace will initialize with empty databases and disconnected social APIs. You can then connect your real Instagram, TikTok, Spotify, and YouTube accounts via OAuth.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Launch Workspace</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
