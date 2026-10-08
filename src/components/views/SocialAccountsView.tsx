import React, { useState } from 'react';
import {
  Share2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Code2,
  Plus,
  Sliders,
  TrendingUp,
  KeyRound,
  Database,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber, getPlatformMeta } from '../../utils/formatters';

interface SocialAccountsViewProps {
  onOpenConnectModal: () => void;
}

export const SocialAccountsView: React.FC<SocialAccountsViewProps> = ({
  onOpenConnectModal,
}) => {
  const {
    socialAccounts,
    syncSocialAccount,
    syncingAccountId,
    disconnectSocialAccount,
    quickConnectAllStarterAccounts,
  } = useArtist();

  const [showSchemaDrawer, setShowSchemaDrawer] = useState(false);
  const [selectedAccountForRaw, setSelectedAccountForRaw] = useState<string | null>(null);

  const connectedCount = socialAccounts.filter((a) => a.status === 'connected').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & OAuth Architecture Callout */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              AUTHENTICATION & TELEMETRY
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
              Generic Schema Pattern
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">
            Connected Social Accounts & DSPs
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1 leading-relaxed">
            All accounts are authenticated through standard OAuth 2.0 permission flows (no passwords stored). Data is ingested into generic <code className="text-cyan-300 font-mono">SocialAccount</code> and <code className="text-cyan-300 font-mono">Metric</code> tables.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {connectedCount === 0 && (
            <button
              onClick={quickConnectAllStarterAccounts}
              title="Connect top 4 accounts with starter follower metrics for testing"
              className="px-3 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Connect Core 4 Platforms</span>
            </button>
          )}
          <button
            onClick={() => setShowSchemaDrawer(!showSchemaDrawer)}
            className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Database Architecture</span>
          </button>
          <button
            onClick={onOpenConnectModal}
            className="px-3.5 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Platform</span>
          </button>
        </div>
      </div>

      {/* Schema / Generic Architecture Inspector Drawer */}
      {showSchemaDrawer && (
        <div className="p-4 bg-slate-950 border border-cyan-800/50 rounded-xl space-y-3 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <Code2 className="w-4 h-4" />
              <span>Generic Database Schema Blueprint (Zero Schema Migrations on New Platform)</span>
            </div>
            <button
              onClick={() => setShowSchemaDrawer(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Hide Schema
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-bold mb-2">TABLE SocialAccount</div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>├── <strong className="text-slate-200">platform</strong>: string (instagram, spotify, tiktok...)</li>
                <li>├── <strong className="text-slate-200">accountId</strong>: string (platform unique ID)</li>
                <li>├── <strong className="text-slate-200">accountName</strong>: string</li>
                <li>├── <strong className="text-slate-200">profileUrl</strong>: string</li>
                <li>├── <strong className="text-slate-200">accessToken</strong>: string (vaulted/encrypted)</li>
                <li>├── <strong className="text-slate-200">refreshToken</strong>: string</li>
                <li>└── <strong className="text-slate-200">status</strong>: 'connected' | 'disconnected'</li>
              </ul>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <div className="text-emerald-400 font-bold mb-2">TABLE Metric</div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>├── <strong className="text-slate-200">socialAccountId</strong>: FK &rarr; SocialAccount.id</li>
                <li>├── <strong className="text-slate-200">date</strong>: ISO date (YYYY-MM-DD)</li>
                <li>├── <strong className="text-slate-200">followers</strong>: integer</li>
                <li>├── <strong className="text-slate-200">reach</strong>: integer</li>
                <li>├── <strong className="text-slate-200">impressions / views</strong>: integer</li>
                <li>├── <strong className="text-slate-200">engagement</strong>: decimal %</li>
                <li>└── <strong className="text-slate-200">clicks / saves / streams</strong>: integer</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Social Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {socialAccounts.map((account) => {
          const meta = getPlatformMeta(account.platform);
          const isSyncing = syncingAccountId === account.id;

          return (
            <div
              key={account.id}
              className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow-xs"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                      style={{
                        backgroundColor: meta.bgLight,
                        color: meta.color,
                        border: `1px solid ${meta.borderColor}`,
                      }}
                    >
                      {account.platform.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-semibold text-slate-100">
                          {account.platformName}
                        </h3>
                        {account.isCustom && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                            Custom
                          </span>
                        )}
                      </div>
                      {account.handle ? (
                        <a
                          href={account.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 truncate"
                        >
                          <span className="truncate">{account.handle}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      ) : (
                        <button
                          onClick={onOpenConnectModal}
                          className="text-[11px] text-cyan-400 hover:underline text-left truncate"
                        >
                          + Click to authenticate & connect
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                        account.status === 'connected'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          account.status === 'connected'
                            ? 'bg-emerald-400'
                            : 'bg-rose-400'
                        }`}
                      />
                      {account.status}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      Sync: {account.lastSync}
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400">Followers / Subs</span>
                    <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                      {formatNumber(account.followers)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Total Reach</span>
                    <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                      {formatNumber(account.reach)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Views / Streams</span>
                    <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                      {formatNumber(account.views)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Engagement</span>
                    <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      {account.engagement}%
                    </div>
                  </div>
                </div>

                {/* MoM Growth Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 py-1">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MoM Growth Rate:</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-medium">
                    +{account.growthMoM}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    setSelectedAccountForRaw(
                      selectedAccountForRaw === account.id ? null : account.id
                    )
                  }
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3 text-slate-500" />
                  <span>Tokens & Scopes</span>
                </button>

                <div className="flex items-center gap-2">
                  {account.status === 'connected' ? (
                    <button
                      onClick={() => syncSocialAccount(account.id)}
                      disabled={isSyncing}
                      className="px-2.5 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`w-3 h-3 text-cyan-400 ${
                          isSyncing ? 'animate-spin' : ''
                        }`}
                      />
                      <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={onOpenConnectModal}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Connect</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible raw security info */}
              {selectedAccountForRaw === account.id && (
                <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                  <div>Account ID: <span className="text-slate-200">{account.accountId}</span></div>
                  <div>Token Hash: <span className="text-cyan-400">{account.accessToken.substring(0, 16)}...</span></div>
                  <div>Scopes: <span className="text-slate-300">{account.scopes.join(', ')}</span></div>
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => disconnectSocialAccount(account.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      Disconnect Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
