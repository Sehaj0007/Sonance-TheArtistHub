import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Zap,
  Users,
  Repeat,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useArtist } from '../../context/ArtistContext';
import { formatNumber } from '../../utils/formatters';

export const AnalyticsView: React.FC = () => {
  const { metrics, insights, socialAccounts } = useArtist();

  const [activeMetric, setActiveMetric] = useState<
    | 'views'
    | 'reach'
    | 'followers'
    | 'streams'
    | 'engagement'
    | 'saves'
    | 'shares'
    | 'clicks'
    | 'watchTimeHours'
  >('views');

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [insightFilter, setInsightFilter] = useState<string>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metricTabs = [
    { id: 'views', label: 'Views', unit: '' },
    { id: 'reach', label: 'Reach', unit: '' },
    { id: 'followers', label: 'Follower Growth', unit: '' },
    { id: 'streams', label: 'Streams', unit: '' },
    { id: 'engagement', label: 'Engagement Rate', unit: '%' },
    { id: 'saves', label: 'Saves / Bookmarks', unit: '' },
    { id: 'shares', label: 'Shares', unit: '' },
    { id: 'clicks', label: 'Link Clicks', unit: '' },
    { id: 'watchTimeHours', label: 'Watch Time (Hrs)', unit: 'h' },
  ];

  // Group metrics by date
  const filteredMetrics = metrics.filter((m) => {
    if (platformFilter === 'all') return true;
    return m.platform.toLowerCase() === platformFilter.toLowerCase();
  });

  // Unique sorted dates
  const uniqueDates = Array.from(new Set(filteredMetrics.map((m) => m.date))).sort();
  const daysToShow = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const targetDates = uniqueDates.slice(-daysToShow);

  // Aggregate metrics per day
  const chartData = targetDates.map((date) => {
    const dayRows = filteredMetrics.filter((m) => m.date === date);
    let val = 0;
    if (activeMetric === 'engagement') {
      const sum = dayRows.reduce((acc, r) => acc + r.engagement, 0);
      val = Number((sum / (dayRows.length || 1)).toFixed(1));
    } else {
      val = dayRows.reduce((acc, r) => acc + (r[activeMetric] || 0), 0);
    }
    return {
      date,
      value: val,
      shortDate: date.slice(5),
    };
  });

  const maxValue = Math.max(...chartData.map((d) => d.value), 10);
  const minValue = Math.min(...chartData.map((d) => d.value), 0);

  // SVG Chart Dimensions
  const svgWidth = 800;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, i) => {
    const x =
      paddingX +
      (i / (chartData.length - 1 || 1)) * (svgWidth - paddingX * 2);
    const range = maxValue - minValue || 1;
    const y =
      svgHeight -
      paddingY -
      ((d.value - minValue) / range) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${svgHeight - paddingY} L ${points[0]?.x || 0} ${svgHeight - paddingY} Z`;

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  const filteredInsights = insights.filter((ins) => {
    if (insightFilter === 'all') return true;
    return ins.category.toLowerCase() === insightFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Analytics Hero & Strategic Chain */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              ANALYTICS ENGINE · CONVERSION INTELLIGENCE
            </span>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">
              Cross-Platform Funnel & Performance Science
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Framework:</span>
            <div className="flex items-center text-xs font-mono text-cyan-300 gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              <span>Platform</span>
              <span className="text-slate-600">→</span>
              <span>Content</span>
              <span className="text-slate-600">→</span>
              <span>Audience</span>
              <span className="text-slate-600">→</span>
              <span>Campaign</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400 font-bold">Conversion</span>
            </div>
          </div>
        </div>

        {/* Funnel Waterfall Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">1. IMPRESSIONS</span>
            <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">6.82M</div>
            <div className="text-[10px] text-emerald-400 font-mono">+31.2% Reach</div>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">2. VIDEO VIEWS</span>
            <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">4.21M</div>
            <div className="text-[10px] text-cyan-400 font-mono">61.7% View-Through</div>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">3. SAVES & ENGAGEMENT</span>
            <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">284.5K</div>
            <div className="text-[10px] text-emerald-400 font-mono">6.8% High Intent</div>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">4. PROFILE CLICKS</span>
            <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">48.2K</div>
            <div className="text-[10px] text-cyan-400 font-mono">16.9% Bio CTR</div>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-emerald-400 font-mono font-bold">5. PRE-SAVES & STREAMS</span>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">24.1K</div>
            <div className="text-[10px] text-emerald-400 font-mono">50.0% Final Conversion</div>
          </div>
        </div>
      </div>

      {/* Interactive Serious Chart Studio */}
      <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
        {/* Controls: Timeframe, Platform, and Metric Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {metricTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMetric(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeMetric === tab.id
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Platform filter */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="spotify">Spotify</option>
              <option value="youtube">YouTube</option>
              <option value="apple_music">Apple Music</option>
            </select>

            {/* Timeframe selector */}
            <div className="flex items-center p-0.5 bg-slate-950 rounded-md border border-slate-800 text-xs font-mono">
              {(['7d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2 py-0.5 rounded text-[11px] uppercase ${
                    timeRange === r
                      ? 'bg-slate-800 text-slate-100 font-bold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Metric Scrubber Stat Banner */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 font-mono text-[11px]">
              {hoveredPoint ? `Date: ${hoveredPoint.date}` : 'Latest Day'}
            </span>
            <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
              {hoveredPoint
                ? activeMetric === 'engagement'
                  ? `${hoveredPoint.value}%`
                  : formatNumber(hoveredPoint.value)
                : '0'}
              <span className="text-xs text-slate-400 font-normal ml-1">
                {metricTabs.find((t) => t.id === activeMetric)?.label}
              </span>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <div>30-Day Velocity: <span className="text-emerald-400 font-mono font-bold">+26.4%</span></div>
            <div className="text-slate-500">Peak: {formatNumber(maxValue)} on Oct 6</div>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="relative w-full overflow-hidden bg-slate-950/60 rounded-lg border border-slate-800/80 p-2">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-56 transition-all"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = paddingY + pct * (svgHeight - paddingY * 2);
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#1E293B"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#metricGradient)" />

            {/* Stroke Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#00F2FE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {points.map((p, idx) => (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === idx ? 5 : 2}
                  fill={hoveredIndex === idx ? '#FFFFFF' : '#00F2FE'}
                  stroke="#0E131F"
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>

          {/* Date Axis Labels */}
          <div className="flex justify-between px-8 text-[10px] text-slate-500 font-mono mt-1">
            <span>{chartData[0]?.date}</span>
            <span>{chartData[Math.floor(chartData.length / 2)]?.date}</span>
            <span>{chartData[chartData.length - 1]?.date}</span>
          </div>
        </div>
      </div>

      {/* The Core “What Worked?” Section Turning Numbers Into Insights */}
      <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-[#121929] border border-cyan-900/40 rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                “What Worked?” — Numbers-to-Insights Engine
              </h3>
              <p className="text-xs text-slate-400">
                Algorithmic synthesis of video retention, sound creates, save ratios, and streaming conversion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'Content', 'Timing', 'Conversion', 'Campaign', 'Audience'].map((cat) => (
              <button
                key={cat}
                onClick={() => setInsightFilter(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  insightFilter === cat
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Insight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col justify-between hover:border-cyan-800/60 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    🎯 {insight.category} Insight
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                    {insight.confidence}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 mb-1.5 leading-snug">
                  {insight.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {insight.description}
                </p>

                {/* Metric Highlight Box */}
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 text-xs font-mono text-cyan-300 font-semibold mb-3">
                  {insight.metricHighlight}
                </div>
              </div>

              {/* Actionable Strategy Recommendation */}
              <div className="pt-2.5 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="text-slate-300 font-semibold block mb-0.5">
                  Recommendation:
                </span>
                <span className="text-slate-300">{insight.actionRecommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
