import React, { useState } from 'react';
import {
  Users,
  Globe,
  Clock,
  Heart,
  Activity,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber } from '../../utils/formatters';

export const AudienceView: React.FC = () => {
  const { audienceData } = useArtist();

  const [activePlatformFilter, setActivePlatformFilter] = useState('Cross-Platform Aggregate');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight">
            Audience Demographics & Behavioral Heatmap
          </h2>
          <p className="text-xs text-slate-400">
            Synthesized listener profiles across Spotify, TikTok, Instagram & Apple Music
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Audience Segment:</span>
          <select
            value={activePlatformFilter}
            onChange={(e) => setActivePlatformFilter(e.target.value)}
            className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
          >
            <option value="Cross-Platform Aggregate">Cross-Platform Aggregate</option>
            <option value="Spotify Dedicated Listeners">Spotify Dedicated Listeners</option>
            <option value="TikTok Viral Reach">TikTok Viral Reach</option>
            <option value="Instagram Superfans">Instagram Superfans</option>
          </select>
        </div>
      </div>

      {/* Row 1: Age & Gender Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Age Demographics (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Age Breakdown
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Primary: 18–24 (46.2%)
            </span>
          </div>

          <div className="space-y-3">
            {audienceData.ageDemographics.map((ageGroup) => (
              <div key={ageGroup.age} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{ageGroup.age}</span>
                  <span className="text-slate-100 font-bold">
                    {ageGroup.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                    style={{ width: `${ageGroup.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            High affinity with Gen-Z bedroom-pop and indie-electronic university demographic.
          </div>
        </div>

        {/* Gender Breakdown (5 cols) */}
        <div className="md:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Gender Identification
              </h3>
              <span className="text-xs text-slate-400 font-mono">Meta + Spotify</span>
            </div>

            <div className="space-y-3">
              {audienceData.genderDemographics.map((item) => (
                <div key={item.gender} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">{item.gender}</span>
                  <span className="text-xs font-bold text-slate-100 font-mono">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            Female listeners demonstrate 1.8× higher comment interaction and acoustic cover sharing frequency.
          </div>
        </div>
      </div>

      {/* Row 2: Geographic Distribution (Countries & Cities) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Top Countries */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Top Countries by Stream Volume
            </h3>
            <span className="text-xs text-slate-400 font-mono">US & AU #1</span>
          </div>

          <div className="space-y-2">
            {audienceData.topCountries.map((c) => (
              <div
                key={c.code}
                className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold w-6">
                    {c.code}
                  </span>
                  <span className="text-slate-200">{c.country}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">
                    {formatNumber(c.listeners)} listeners
                  </span>
                  <span className="text-slate-100 font-semibold w-12 text-right">
                    {c.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Top Metro Cities (Tour Routing Priority)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Melbourne Lead</span>
          </div>

          <div className="space-y-2">
            {audienceData.topCities.map((city) => (
              <div
                key={city.city}
                className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-slate-200 font-medium">{city.city}</span>
                  <span className="text-slate-500 text-[11px] ml-1.5">
                    ({city.country})
                  </span>
                </div>
                <span className="font-mono font-semibold text-cyan-400">
                  {city.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Active Times Heatmap & Content Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Active Times Heatmap (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Follower Peak Active Windows (Heatmap)
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Peak: Fri & Sun 6–9 PM
            </span>
          </div>

          <div className="space-y-1 overflow-x-auto">
            {audienceData.activeTimes.map((dayRow) => (
              <div key={dayRow.day} className="flex items-center gap-1.5">
                <span className="w-8 text-[11px] font-mono text-slate-400 shrink-0">
                  {dayRow.day}
                </span>
                <div className="grid grid-cols-24 gap-0.5 flex-1 min-w-[340px]">
                  {dayRow.hours.map((val, hIdx) => {
                    const intensity = val / 100;
                    return (
                      <div
                        key={hIdx}
                        title={`${dayRow.day} at ${hIdx}:00 — Index: ${val}`}
                        className="h-5 rounded-xs transition-colors hover:ring-1 hover:ring-cyan-300"
                        style={{
                          backgroundColor: `rgba(0, 242, 254, ${Math.max(
                            0.08,
                            intensity * 0.95
                          )})`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex justify-between pl-9 text-[9px] text-slate-500 font-mono pt-1">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>
        </div>

        {/* Content Preferences (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Format Save & Share Preference
              </h3>
            </div>

            <div className="space-y-2.5">
              {audienceData.contentPreferences.map((pref) => (
                <div
                  key={pref.format}
                  className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">
                      {pref.format}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                      {pref.savesRatio}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-100">
                    {pref.score}/100
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 italic pt-2">
            Prioritize raw performance videos over studio glossy graphics by 3:1 ratio.
          </div>
        </div>
      </div>
    </div>
  );
};
