import React, { useState } from 'react';
import {
  FolderOpen,
  Plus,
  Tag,
  Copy,
  Check,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  Layers,
  Image,
  Video,
  FileText,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { AssetFolder, LibraryAsset } from '../../types';

interface ContentLibraryViewProps {
  onOpenNewAssetModal: () => void;
  onOpenNewContentModal: () => void;
}

export const ContentLibraryView: React.FC<ContentLibraryViewProps> = ({
  onOpenNewAssetModal,
  onOpenNewContentModal,
}) => {
  const { libraryAssets, setActiveTab } = useArtist();

  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const folders: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Assets', count: libraryAssets.length },
    { id: 'Posters', label: 'Posters', count: libraryAssets.filter((a) => a.folder === 'Posters').length },
    { id: 'Reels', label: 'Reels', count: libraryAssets.filter((a) => a.folder === 'Reels').length },
    { id: 'Stories', label: 'Stories', count: libraryAssets.filter((a) => a.folder === 'Stories').length },
    { id: 'Photos', label: 'Photos', count: libraryAssets.filter((a) => a.folder === 'Photos').length },
    { id: 'Lyric videos', label: 'Lyric videos', count: libraryAssets.filter((a) => a.folder === 'Lyric videos').length },
    { id: 'BTS', label: 'BTS', count: libraryAssets.filter((a) => a.folder === 'BTS').length },
    { id: 'Covers', label: 'Covers', count: libraryAssets.filter((a) => a.folder === 'Covers').length },
    { id: 'Logos', label: 'Logos', count: libraryAssets.filter((a) => a.folder === 'Logos').length },
    { id: 'Brand assets', label: 'Brand assets', count: libraryAssets.filter((a) => a.folder === 'Brand assets').length },
  ];

  const filteredAssets = libraryAssets.filter((asset) => {
    const matchesFolder = selectedFolder === 'all' || asset.folder === selectedFolder;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const handleCopyLink = (asset: LibraryAsset) => {
    navigator.clipboard.writeText(window.location.origin + asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Controls */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Content & Asset Library
          </h2>
          <p className="text-xs text-slate-400">
            High-res covers, stems, posters, 9:16 reels, kinetic typography & press stills
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or tag..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-64"
            />
          </div>
          <button
            onClick={onOpenNewAssetModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Asset</span>
          </button>
        </div>
      </div>

      {/* Folders Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFolder(f.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedFolder === f.id
                ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>{f.label}</span>
            <span className="text-[10px] font-mono text-slate-500">
              ({f.count})
            </span>
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative rounded-lg overflow-hidden bg-black/80 aspect-square mb-2.5 border border-slate-800/80">
                <img
                  src={asset.url}
                  alt={asset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/75 text-cyan-300 backdrop-blur-xs">
                  {asset.aspectRatio}
                </div>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/75 text-slate-300 backdrop-blur-xs">
                  {asset.fileType}
                </div>
              </div>

              {/* Asset Name & Folder */}
              <h3 className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                {asset.name}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <span>{asset.folder}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{asset.fileSize}</span>
                <span aria-hidden="true">·</span>
                <span className="text-cyan-400/90 font-mono">
                  {asset.usagesCount} posts
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {asset.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopyLink(asset)}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                title="Copy direct asset link"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenNewContentModal}
                className="px-2 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
              >
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>Use in Post</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
