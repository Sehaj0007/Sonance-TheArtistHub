import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Code2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { PlatformType } from '../../types';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectAccountModal: React.FC<ConnectAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectSocialAccount, artistProfile } = useArtist();

  const [step, setStep] = useState<'select' | 'oauth_flow' | 'success'>('select');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('instagram');
  const [handle, setHandle] = useState('@auravanemusic');
  const [customPlatformName, setCustomPlatformName] = useState('');
  const [customProfileUrl, setCustomProfileUrl] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);

  if (!isOpen) return null;

  const platformSpecs: Record<
    string,
    {
      name: string;
      defaultHandle: string;
      scopes: string[];
      description: string;
      oauthEndpoint: string;
      brandColor: string;
    }
  > = {
    instagram: {
      name: 'Instagram Graph API',
      defaultHandle: '@auravanemusic',
      scopes: [
        'instagram_basic',
        'instagram_manage_insights',
        'pages_show_list',
        'instagram_content_publish',
      ],
      description:
        'Official Meta Graph API OAuth. Requires professional or creator account permissions. Passwords are never shared.',
      oauthEndpoint: 'https://api.instagram.com/oauth/authorize?response_type=code',
      brandColor: '#E1306C',
    },
    tiktok: {
      name: 'TikTok for Developers API',
      defaultHandle: '@aura.vane',
      scopes: ['user.info.basic', 'video.list', 'video.insights', 'video.upload'],
      description:
        'TikTok Open Platform OAuth v2. Grants read access to sound analytics, video impressions, and engagement curves.',
      oauthEndpoint: 'https://www.tiktok.com/v2/auth/authorize/',
      brandColor: '#00F2FE',
    },
    spotify: {
      name: 'Spotify for Artists API',
      defaultHandle: 'spotify:artist:4Z8t9KqM1',
      scopes: [
        'user-read-email',
        'user-follow-read',
        'playlist-read-private',
        'artist-analytics-read',
      ],
      description:
        'Spotify Web API & Artist Insights. Authorizes stream velocity, monthly listener tracking, and editorial playlist metrics.',
      oauthEndpoint: 'https://accounts.spotify.com/authorize?response_type=code',
      brandColor: '#1DB954',
    },
    youtube: {
      name: 'YouTube Data API v3',
      defaultHandle: '@AuraVaneOfficial',
      scopes: [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/yt-analytics.readonly',
      ],
      description:
        'Google OAuth 2.0. Grants verified read-only access to channel analytics, Shorts views, watch time, and subscriber growth.',
      oauthEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      brandColor: '#FF0000',
    },
    apple_music: {
      name: 'Apple Music for Artists (MusicKit API)',
      defaultHandle: 'music.apple.com/artist/aura-vane/159203910',
      scopes: ['music-user-analytics', 'artist-insights-read', 'catalog-read'],
      description:
        'Apple MusicKit Developer Token & OAuth. Fetches plays, milestone badges, Shazam trends, and regional city charts.',
      oauthEndpoint: 'https://idmsa.apple.com/IDMSWebAuth/auth',
      brandColor: '#FC3C44',
    },
    facebook: {
      name: 'Meta Facebook Pages API',
      defaultHandle: '@auravanemusic',
      scopes: ['pages_read_engagement', 'pages_read_user_content', 'pages_show_list'],
      description:
        'Facebook Graph API token for official artist page reach, video views, and tour event RSVP engagement.',
      oauthEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
      brandColor: '#1877F2',
    },
    trends: {
      name: 'Global Sound & Airplay Trends (Chartmetric/Soundcharts)',
      defaultHandle: 'trend/auravane',
      scopes: ['trends:read', 'airplay:read', 'shazam:read', 'radio:monitor'],
      description:
        'Aggregated sound trending radar, viral audio tracking across TikTok/Reels, radio airplay logs, and playlist charting.',
      oauthEndpoint: 'https://api.soundcharts.com/v2/oauth/authorize',
      brandColor: '#8B5CF6',
    },
    custom: {
      name: 'Custom Platform / Webhook Connection',
      defaultHandle: '@artist',
      scopes: ['generic_metrics_read', 'webhook_event_receive'],
      description:
        'Connect any external DSP or social network (SoundCloud, Tidal, Threads, Bandcamp, Twitch) via the generic SocialAccount architecture.',
      oauthEndpoint: 'https://custom-dsp.com/oauth/authorize',
      brandColor: '#38BDF8',
    },
  };

  const currentSpec = platformSpecs[selectedPlatform] || platformSpecs.custom;

  const handleStartOAuth = () => {
    setStep('oauth_flow');
    setIsAuthorizing(false);
    setAuthComplete(false);
  };

  const handleSimulateOAuthConsent = async () => {
    setIsAuthorizing(true);
    // Simulate real OAuth popup roundtrip, token exchange and webhook registration
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsAuthorizing(false);
    setAuthComplete(true);

    const platformName =
      selectedPlatform === 'custom'
        ? customPlatformName || 'Custom DSP'
        : currentSpec.name.split(' ')[0];

    const profileUrl =
      selectedPlatform === 'custom'
        ? customProfileUrl || `https://${customPlatformName.toLowerCase()}.com/${handle.replace('@', '')}`
        : `https://${selectedPlatform}.com/${handle.replace('@', '')}`;

    // Store in generic SocialAccount schema
    connectSocialAccount({
      platform: selectedPlatform,
      platformName: platformName,
      accountName: artistProfile.name,
      handle: handle,
      profileUrl: profileUrl,
      scopes: currentSpec.scopes,
      followers: Math.floor(Math.random() * 80000) + 12000,
      reach: Math.floor(Math.random() * 250000) + 35000,
      engagement: Number((Math.random() * 4 + 3).toFixed(1)),
      views: Math.floor(Math.random() * 400000) + 60000,
      growthMoM: Number((Math.random() * 15 + 8).toFixed(1)),
      isCustom: selectedPlatform === 'custom',
    });

    setStep('success');
  };

  const handleFinish = () => {
    onClose();
    setStep('select');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1422] border border-slate-800 rounded-xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Connect Social Account via Secure OAuth
              </h2>
              <p className="text-xs text-slate-400">
                Zero passwords stored · Generic <code className="text-cyan-400">SocialAccount</code> schema
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {step === 'select' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Select Platform to Connect
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(platformSpecs).map(([key, spec]) => {
                    const isSelected = selectedPlatform === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedPlatform(key);
                          setHandle(spec.defaultHandle);
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-cyan-400/80 text-white shadow-xs'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full mb-1.5"
                          style={{ backgroundColor: spec.brandColor }}
                        />
                        <div className="text-xs font-semibold truncate">
                          {spec.name.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          OAuth 2.0
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedPlatform === 'custom' && (
                <div className="space-y-3 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Platform Name (e.g. SoundCloud, Threads, Tidal)
                    </label>
                    <input
                      type="text"
                      value={customPlatformName}
                      onChange={(e) => setCustomPlatformName(e.target.value)}
                      placeholder="e.g. SoundCloud"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Profile / API Endpoint URL
                    </label>
                    <input
                      type="text"
                      value={customProfileUrl}
                      onChange={(e) => setCustomProfileUrl(e.target.value)}
                      placeholder="https://soundcloud.com/auravane"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Artist Profile Handle / Identifier
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
                  placeholder="@handle"
                />
              </div>

              {/* Security info card */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How OAuth Works (No Password Required)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {currentSpec.description}
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[11px] font-medium text-slate-400 mb-1.5">
                    Requested Permission Scopes:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSpec.scopes.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generic Architecture Callout */}
              <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-lg flex items-start gap-2 text-xs text-cyan-200/90">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Architectural Guarantee:</strong> Stored in generic{' '}
                  <code className="text-cyan-300 font-mono">SocialAccount</code> and{' '}
                  <code className="text-cyan-300 font-mono">Metric</code> tables. Adding this platform requires zero database schema migrations.
                </p>
              </div>
            </>
          )}

          {step === 'oauth_flow' && (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentSpec.brandColor }}
                    />
                    <span className="text-xs font-semibold text-slate-100">
                      {currentSpec.name} Authorization Request
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    HTTPS SSL SECURE
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p>
                    <strong>Sonance Hub</strong> is requesting permission to access your{' '}
                    <strong>{handle}</strong> public profile and insights.
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                    <li>Read follower counts and reach telemetry</li>
                    <li>Fetch reel and post engagement metrics</li>
                    <li>Synchronize stream activity periodically</li>
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 font-mono truncate">
                  Callback URI: https://sonance-app.internal/api/oauth/callback/{selectedPlatform}
                </div>
              </div>

              {isAuthorizing ? (
                <div className="p-4 text-center space-y-2">
                  <div className="inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-300 font-medium">
                    Exchanging authorization code for vaulted access token...
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    POST /oauth/v2/token → 200 OK (AES-256 encrypted)
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('select')}
                    className="flex-1 py-2 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSimulateOAuthConsent}
                    className="flex-1 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Grant Permissions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-100">
                Account Successfully Linked
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {currentSpec.name} is now connected for {handle}. Initial metrics have been normalized into the database and are now live on your dashboard.
              </p>

              {/* JSON preview of generic record */}
              <div className="text-left p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 max-h-40 overflow-y-auto">
                <div className="text-slate-500">// Stored in Generic SocialAccount Record:</div>
                <pre>
{JSON.stringify(
  {
    platform: selectedPlatform,
    handle: handle,
    status: 'connected',
    accessToken: 'vaulted_sha256_token',
    lastSync: 'Just now',
    scopes: currentSpec.scopes,
  },
  null,
  2
)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-end gap-2">
          {step === 'select' && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleStartOAuth}
                className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Authorize & Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 'success' && (
            <button
              onClick={handleFinish}
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg transition-colors"
            >
              Done & Return to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
