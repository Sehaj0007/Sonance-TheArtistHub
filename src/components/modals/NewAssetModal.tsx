import React, { useState } from 'react';
import { X, FolderOpen, Upload } from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { AssetFolder } from '../../types';

interface NewAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewAssetModal: React.FC<NewAssetModalProps> = ({ isOpen, onClose }) => {
  const { addLibraryAsset, campaigns } = useArtist();

  const [name, setName] = useState('');
  const [folder, setFolder] = useState<AssetFolder>('Reels');
  const [tags, setTags] = useState('Acoustic, Hook, 9:16');
  const [fileType, setFileType] = useState('MP4 / 4K');
  const [fileSize, setFileSize] = useState('32 MB');
  const [url, setUrl] = useState('/src/assets/images/album_cover_acoustic_1791446763851.jpg');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [campaign, setCampaign] = useState(campaigns[0]?.name || 'Midnight Echoes Launch');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagList = tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
    addLibraryAsset({
      name: name || `${folder} Asset - ${Date.now()}`,
      folder,
      tags: tagList,
      fileType,
      fileSize,
      url,
      aspectRatio,
      campaign,
      usagesCount: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Register New Media Asset
              </h2>
              <p className="text-xs text-slate-400">
                Organize into folders, tag formats & attach to campaigns
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
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Asset Name / Description
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acoustic Studio Take 02 - Vertical Master"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Folder Category
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value as AssetFolder)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="Posters">Posters</option>
                <option value="Reels">Reels</option>
                <option value="Stories">Stories</option>
                <option value="Photos">Photos</option>
                <option value="Lyric videos">Lyric videos</option>
                <option value="BTS">BTS</option>
                <option value="Covers">Covers</option>
                <option value="Logos">Logos</option>
                <option value="Brand assets">Brand assets</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="9:16">9:16 (Stories / Reels / TikTok)</option>
                <option value="1:1">1:1 (Square Feed / Covers)</option>
                <option value="16:9">16:9 (YouTube Landscape / B-Roll)</option>
                <option value="3:4">3:4 (Tour Poster / Press Vertical)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                File Type / Codec
              </label>
              <input
                type="text"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                placeholder="MP4 / ProRes / WAV"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="48 MB"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Acoustic, Hook, Vocal Stems"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Select Asset Image
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                '/src/assets/images/album_cover_single_1791446740671.jpg',
                '/src/assets/images/album_cover_acoustic_1791446763851.jpg',
                '/src/assets/images/artist_press_photo_1791446727519.jpg',
                '/src/assets/images/release_poster_visual_1791446775711.jpg',
              ].map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => setUrl(imgUrl)}
                  className={`cursor-pointer rounded-md overflow-hidden border ${
                    url === imgUrl ? 'border-cyan-400 ring-2 ring-cyan-400/50' : 'border-slate-800'
                  }`}
                >
                  <img src={imgUrl} alt="Asset" className="w-full h-16 object-cover" />
                </div>
              ))}
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
              Upload Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
