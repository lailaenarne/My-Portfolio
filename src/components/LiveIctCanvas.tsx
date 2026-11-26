import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from './Header';
import {
  CloudDeployIcon,
  DatabaseSchemaIcon,
  GitBranchNodeIcon,
  LaptopCodeIcon,
  NetworkMeshIcon,
  ServerStackIcon,
} from './IctIcons';

interface LiveIctCanvasProps {
  onNavigate: (pageId: PageId) => void;
}

const PIPELINE_NODES: {
  id: string;
  label: string;
  stack: string;
  detail: string;
  targetPage: PageId;
  icon: typeof LaptopCodeIcon;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  packetColor: string;
}[] = [
  {
    id: 'frontend',
    label: 'Semantic UI',
    stack: 'HTML5 · TypeScript · React',
    detail: 'Accessible landmark structure, fluid CSS Grid, and responsive motion controls.',
    targetPage: 'skills',
    icon: LaptopCodeIcon,
    accentText: 'text-[#BE4B72] dark:text-[#F2A7C0]',
    accentBorder: 'border-[#BE4B72] dark:border-[#F2A7C0]',
    accentBg: 'bg-[#FAF0F2] dark:bg-[#2A1D24]',
    packetColor: 'bg-[#BE4B72] dark:bg-[#F2A7C0]',
  },
  {
    id: 'backend',
    label: 'Application Layer',
    stack: 'PHP 8.3 · Python · Node.js',
    detail: 'Prepared server routes, input validation, and structured REST endpoints.',
    targetPage: 'projects',
    icon: ServerStackIcon,
    accentText: 'text-[#3D4E81] dark:text-[#8FA4E8]',
    accentBorder: 'border-[#3D4E81] dark:border-[#8FA4E8]',
    accentBg: 'bg-[#EEF2FA] dark:bg-[#1E2438]',
    packetColor: 'bg-[#3D4E81] dark:bg-[#8FA4E8]',
  },
  {
    id: 'database',
    label: 'Relational Data',
    stack: 'MySQL · PostgreSQL',
    detail: 'Normalized 3NF schemas, composite indexes, and foreign-key integrity.',
    targetPage: 'skills',
    icon: DatabaseSchemaIcon,
    accentText: 'text-[#7A4988] dark:text-[#D5A6E6]',
    accentBorder: 'border-[#7A4988] dark:border-[#D5A6E6]',
    accentBg: 'bg-[#F5EEF8] dark:bg-[#2A1E30]',
    packetColor: 'bg-[#7A4988] dark:bg-[#D5A6E6]',
  },
  {
    id: 'deploy',
    label: 'Git & Pages CI',
    stack: 'Git · Docker · GitHub Pages',
    detail: 'Conventional commits, containerized testing, and automated static builds.',
    targetPage: 'capstone',
    icon: CloudDeployIcon,
    accentText: 'text-[#2F7A70] dark:text-[#7ED3C6]',
    accentBorder: 'border-[#2F7A70] dark:border-[#7ED3C6]',
    accentBg: 'bg-[#EAF6F3] dark:bg-[#192D2A]',
    packetColor: 'bg-[#2F7A70] dark:bg-[#7ED3C6]',
  },
];

export function LiveIctCanvas({ onNavigate }: LiveIctCanvasProps) {
  const [selectedId, setSelectedId] = useState<string>(PIPELINE_NODES[0].id);
  const prefersReducedMotion = useReducedMotion();

  const activeNode =
    PIPELINE_NODES.find((node) => node.id === selectedId) ?? PIPELINE_NODES[0];

  return (
    <div className="bg-white/95 dark:bg-[#1D161A]/95 border border-[#E5C6D0] dark:border-[#3D2C35] ring-1 ring-inset ring-[#F7E6EA] dark:ring-[#2E2128] rounded-2xl p-5 md:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F4E6EA] dark:border-[#2D2228]">
        <div className="flex items-center gap-3">
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-xl bg-[#EEF2FA] dark:bg-[#1E2438] border border-[#C7D3EA] dark:border-[#333D5C] flex items-center justify-center shrink-0 text-[#3D4E81] dark:text-[#8FA4E8]"
          >
            <NetworkMeshIcon className="w-5 h-5" />
          </motion.div>
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-[#1F171A] dark:text-[#F8EFF2]">
              Interactive Engineering Workflow
            </h2>
            <p className="text-xs text-[#665058] dark:text-[#B59EA7]">
              Click any ICT stage below to inspect how my projects connect end-to-end
            </p>
          </div>
        </div>

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EAF6F3] dark:bg-[#192D2A] border border-[#B8DCD5] dark:border-[#2A4945] text-xs font-semibold text-[#2F7A70] dark:text-[#7ED3C6]"
        >
          <GitBranchNodeIcon className="w-4 h-4" />
          <span>Full-Stack Pipeline</span>
        </motion.div>
      </div>

      {/* Live Connected Nodes */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PIPELINE_NODES.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNode.id;
          return (
            <div key={node.id} className="relative flex items-stretch">
              <motion.button
                type="button"
                onClick={() => setSelectedId(node.id)}
                whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                aria-pressed={isSelected}
                className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? `${node.accentBg} ${node.accentBorder} shadow-sm`
                    : 'bg-[#FDF7F8] dark:bg-[#140F12] border-[#EAD6DC] dark:border-[#33262D] hover:border-[#C7D3EA] dark:hover:border-[#5E4750]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { y: [0, idx % 2 === 0 ? -3 : 3, 0] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 3.6 + idx * 0.4,
                      ease: 'easeInOut',
                    }}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 bg-white dark:bg-[#1D161A] ${
                      isSelected
                        ? `${node.accentBorder} ${node.accentText}`
                        : `border-[#EAD6DC] dark:border-[#33262D] ${node.accentText}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className={`font-mono-code text-[11px] font-semibold tabular-nums ${node.accentText}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <p className="font-display text-sm font-bold text-[#1F171A] dark:text-[#F8EFF2]">
                    {node.label}
                  </p>
                  <p className="mt-0.5 text-[11px] font-mono-code text-[#665058] dark:text-[#B59EA7]">
                    {node.stack}
                  </p>
                </div>
              </motion.button>

              {/* Animated Multi-Tone Data Packet Connector on Desktop */}
              {idx < PIPELINE_NODES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex items-center justify-center w-4 -mr-4 z-10 pointer-events-none"
                >
                  <div className="relative w-full h-[2px] bg-[#EAD6DC] dark:bg-[#3D2C35] overflow-hidden">
                    {!prefersReducedMotion && (
                      <motion.span
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          delay: idx * 0.35,
                          ease: 'linear',
                        }}
                        className={`block w-2.5 h-full ${node.packetColor}`}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Detail Strip */}
      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4 border-t border-[#F4E6EA] dark:border-[#2D2228] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <p className="text-xs md:text-sm text-[#4D3B42] dark:text-[#D5C2C9] leading-relaxed">
          <span className={`font-semibold ${activeNode.accentText}`}>
            {activeNode.label}:
          </span>{' '}
          {activeNode.detail}
        </p>

        <button
          type="button"
          onClick={() => onNavigate(activeNode.targetPage)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold hover:underline whitespace-nowrap shrink-0 ${activeNode.accentText}`}
        >
          <span>Explore in {activeNode.targetPage}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </motion.div>
    </div>
  );
}
