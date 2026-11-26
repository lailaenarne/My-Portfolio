import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BarChart3, RotateCcw } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ProjectCategory, ProjectItem } from '../data/portfolioData';
import { DatabaseSchemaIcon } from './IctIcons';

interface ProjectMetricsChartProps {
  projects: ProjectItem[];
  activeCategory: ProjectCategory;
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}

interface TechMetricDatum {
  tech: string;
  count: number;
  percentage: number;
  projectTitles: string[];
}

interface TooltipPayloadEntry {
  payload?: TechMetricDatum;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: readonly TooltipPayloadEntry[];
  totalProjects: number;
}

const LIGHT_BAR_COLORS = [
  '#BE4B72', // Roseberry
  '#3D4E81', // Slate Indigo
  '#2F7A70', // Sage Teal
  '#7A4988', // Warm Lilac
  '#A63D61', // Deep Berry
  '#5165A1', // Soft Cobalt
];

const DARK_BAR_COLORS = [
  '#F2A7C0', // Soft Rose
  '#8FA4E8', // Periwinkle
  '#7ED3C6', // Mint Teal
  '#D5A6E6', // Lavender
  '#E57BA0', // Coral Pink
  '#A5B7F0', // Sky Indigo
];

function CustomMetricsTooltip({
  active,
  payload,
  totalProjects,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const datum = payload[0]?.payload;
  if (!datum) {
    return null;
  }

  return (
    <div className="max-w-xs rounded-xl border border-[#E5C6D0] dark:border-[#3D2C35] bg-white/95 dark:bg-[#1D161A]/95 backdrop-blur-md p-3.5 shadow-lg">
      <div className="flex items-center justify-between gap-4 border-b border-[#F4E6EA] dark:border-[#2D2228] pb-2 mb-2">
        <span className="font-mono-code text-xs font-semibold text-[#1F171A] dark:text-[#F8EFF2]">
          {datum.tech}
        </span>
        <span className="tabular-nums text-xs font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
          {datum.count} / {totalProjects} ({datum.percentage}%)
        </span>
      </div>
      <p className="text-[11px] font-medium text-[#665058] dark:text-[#B59EA7] mb-1">
        Used in:
      </p>
      <ul className="space-y-0.5 text-xs text-[#4D3B42] dark:text-[#D5C2C9]">
        {datum.projectTitles.map((title) => (
          <li key={title} className="truncate">
            · {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectMetricsChart({
  projects,
  activeCategory,
  selectedTech,
  onSelectTech,
}: ProjectMetricsChartProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains('dark'));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const chartData = useMemo<TechMetricDatum[]>(() => {
    const counts = new Map<string, { count: number; projectTitles: string[] }>();

    for (const project of projects) {
      const uniqueTech = Array.from(new Set(project.techStack));
      for (const tech of uniqueTech) {
        const existing = counts.get(tech);
        if (existing) {
          existing.count += 1;
          existing.projectTitles.push(project.title);
        } else {
          counts.set(tech, { count: 1, projectTitles: [project.title] });
        }
      }
    }

    const total = Math.max(projects.length, 1);
    return Array.from(counts.entries())
      .map(([tech, info]) => ({
        tech,
        count: info.count,
        percentage: Math.round((info.count / total) * 100),
        projectTitles: info.projectTitles,
      }))
      .sort((a, b) => b.count - a.count || a.tech.localeCompare(b.tech));
  }, [projects]);

  const palette = isDark ? DARK_BAR_COLORS : LIGHT_BAR_COLORS;
  const gridStroke = isDark ? '#33262D' : '#EAD6DC';
  const axisStroke = isDark ? '#3D2C35' : '#E5C6D0';
  const xTickFill = isDark ? '#D5C2C9' : '#4D3B42';
  const yTickFill = isDark ? '#B59EA7' : '#665058';
  const cursorFill = isDark
    ? 'rgba(242, 167, 192, 0.08)'
    : 'rgba(190, 75, 114, 0.06)';

  const topStack = chartData[0];

  return (
    <motion.section
      aria-labelledby="project-metrics-heading"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 bg-white/95 dark:bg-[#1D161A]/95 border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-6 md:p-7"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 mb-5 border-b border-[#F4E6EA] dark:border-[#2D2228]">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl border border-[#C7D3EA] dark:border-[#333D5C] bg-[#EEF2FA] dark:bg-[#1E2438] text-[#3D4E81] dark:text-[#8FA4E8] flex items-center justify-center shrink-0">
            <DatabaseSchemaIcon className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="project-metrics-heading"
                className="font-display text-xl font-bold tracking-tight text-[#1F171A] dark:text-[#F8EFF2]"
              >
                Project Metrics
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2F7A70] dark:text-[#7ED3C6]">
                <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Recharts Stack Analytics</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#665058] dark:text-[#B59EA7]">
              Technology stack distribution across{' '}
              <span className="font-medium text-[#1F171A] dark:text-[#F8EFF2]">
                {projects.length}{' '}
                {activeCategory === 'All'
                  ? 'deployed projects'
                  : `${activeCategory} projects`}
              </span>
              . Click any bar to filter matching cards below.
            </p>
          </div>
        </div>

        {/* Summary Readouts + Optional Tech Filter Reset */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          <div className="flex items-center gap-5 text-left">
            <div>
              <p className="text-[11px] font-medium text-[#665058] dark:text-[#B59EA7]">
                Stack Tags
              </p>
              <p className="font-display text-lg font-bold tabular-nums text-[#3D4E81] dark:text-[#8FA4E8]">
                {chartData.length}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="h-7 w-px bg-[#EAD6DC] dark:bg-[#33262D]"
            />
            <div>
              <p className="text-[11px] font-medium text-[#665058] dark:text-[#B59EA7]">
                Most Used
              </p>
              <p className="font-mono-code text-sm font-semibold text-[#BE4B72] dark:text-[#F2A7C0]">
                {topStack ? `${topStack.tech} (${topStack.count})` : '—'}
              </p>
            </div>
          </div>

          {selectedTech && (
            <button
              type="button"
              onClick={() => onSelectTech(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5C6D0] dark:border-[#3D2C35] bg-[#FAF0F2] dark:bg-[#2A1D24] text-[#BE4B72] dark:text-[#F2A7C0] hover:border-[#BE4B72] dark:hover:border-[#F2A7C0] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear: {selectedTech}</span>
            </button>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      {chartData.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-sm text-[#665058] dark:text-[#B59EA7]">
          No technology metrics available for this filter.
        </div>
      ) : (
        <div
          className="w-full h-[265px]"
          role="img"
          aria-label={`Bar chart showing technology stack usage across ${projects.length} projects`}
        >
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 12, left: -16, bottom: 26 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={gridStroke}
              />
              <XAxis
                dataKey="tech"
                interval={0}
                angle={-18}
                textAnchor="end"
                height={52}
                tickLine={false}
                axisLine={{ stroke: axisStroke }}
                tick={{
                  fill: xTickFill,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <YAxis
                allowDecimals={false}
                domain={[0, Math.max(projects.length, 1)]}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: yTickFill,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <Tooltip
                cursor={{ fill: cursorFill, radius: 8 }}
                content={(tooltipProps) => (
                  <CustomMetricsTooltip
                    active={tooltipProps.active}
                    payload={
                      tooltipProps.payload as
                        | readonly TooltipPayloadEntry[]
                        | undefined
                    }
                    totalProjects={projects.length}
                  />
                )}
              />
              <Bar
                dataKey="count"
                name="Projects"
                radius={[8, 8, 0, 0]}
                maxBarSize={46}
                isAnimationActive={!prefersReducedMotion}
                className="cursor-pointer"
                onClick={(_barData, index) => {
                  const clicked = chartData[index];
                  if (!clicked) return;
                  onSelectTech(
                    selectedTech === clicked.tech ? null : clicked.tech
                  );
                }}
              >
                {chartData.map((entry, idx) => {
                  const color = palette[idx % palette.length];
                  const isDimmed =
                    selectedTech !== null && selectedTech !== entry.tech;
                  return (
                    <Cell
                      key={entry.tech}
                      fill={color}
                      fillOpacity={isDimmed ? 0.3 : 0.92}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.section>
  );
}
