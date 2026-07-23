import { useReducedMotion } from 'motion/react'

// Hero anchor: a quietly animated pipeline DAG — sources → transform → serving,
// pulses tracing the edges, a live-looking run status underneath. Pure inline
// SVG + CSS (keyframes in index.css); pulses are skipped for reduced motion.
const EDGES = [
  { id: 'pl-e1', d: 'M100 41 C 122 41, 118 86, 138 92' },
  { id: 'pl-e2', d: 'M100 100 L 138 100' },
  { id: 'pl-e3', d: 'M100 159 C 122 159, 118 114, 138 108' },
  { id: 'pl-e4', d: 'M240 94 C 258 90, 254 68, 268 64' },
  { id: 'pl-e5', d: 'M240 106 C 258 110, 254 132, 268 136' },
]

const PULSES = [
  { edge: '#pl-e1', dur: '2.2s', begin: '0s' },
  { edge: '#pl-e2', dur: '2.2s', begin: '0.7s' },
  { edge: '#pl-e3', dur: '2.2s', begin: '1.4s' },
  { edge: '#pl-e4', dur: '1.8s', begin: '0.9s' },
  { edge: '#pl-e5', dur: '1.8s', begin: '1.6s' },
]

const NODES = [
  { x: 12, y: 28, w: 88, h: 26, label: 'Salesforce', tx: 24, ty: 45, stage: 0 },
  { x: 12, y: 87, w: 88, h: 26, label: 'Keka · APIs', tx: 24, ty: 104, stage: 0 },
  { x: 12, y: 146, w: 88, h: 26, label: 'OneLake files', tx: 22, ty: 163, stage: 0 },
  { x: 138, y: 84, w: 102, h: 32, label: 'Transform · dbt', tx: 150, ty: 104, stage: 1 },
  { x: 268, y: 50, w: 62, h: 26, label: 'Lakehouse', tx: 276, ty: 67, stage: 2 },
  { x: 268, y: 122, w: 62, h: 26, label: 'Power BI', tx: 280, ty: 139, stage: 2 },
]

export default function PipelineCard({ className = '' }) {
  const reduce = useReducedMotion()

  return (
    <div className={`pipe-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-elevate/70 px-3.5 py-2.5">
        <i className="h-[7px] w-[7px] rounded-full bg-[#2e2e3a]" />
        <i className="h-[7px] w-[7px] rounded-full bg-[#2e2e3a]" />
        <i className="h-[7px] w-[7px] rounded-full bg-[#2e2e3a]" />
        <span className="ml-1 font-mono text-[10px] tracking-[0.1em] text-faint">fabric · prod · daily refresh</span>
      </div>
      <div className="px-2.5 pb-1.5 pt-3">
        <svg viewBox="0 0 340 200" className="block h-auto w-full" aria-hidden="true">
          <defs>
            <radialGradient id="pl-pulse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>
          {EDGES.map((e) => (
            <path key={e.id} id={e.id} d={e.d} className="pipe-edge" />
          ))}
          {NODES.map((n) => (
            <g key={n.label}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="7" className={`pipe-node s${n.stage}`} />
              <text x={n.tx} y={n.ty} className={`pipe-label s${n.stage}`}>
                {n.label}
              </text>
            </g>
          ))}
          {!reduce &&
            PULSES.map((p) => (
              <circle key={p.edge + p.begin} r="2.6" fill="url(#pl-pulse)">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={p.edge} />
                </animateMotion>
              </circle>
            ))}
        </svg>
      </div>
      <div className="flex items-center gap-2 px-3.5 pb-3 pt-1.5 font-mono text-[10px] tracking-[0.05em] text-faint">
        <span className="pipe-ok h-1.5 w-1.5 rounded-full bg-emerald-400" />
        run #1284 · 2.4M rows · integrity 100% · 4m12s
      </div>
    </div>
  )
}
