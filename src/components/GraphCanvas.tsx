import { useMemo } from 'react';
import { DOMAINS, PROJECTS, type StepId } from '../data/projectRegistry';
import { useDomain } from '../contexts/DomainContext';

const STEP_ORDER: StepId[] = ['simulate', 'analyze', 'publish'];
const COL_X: Record<StepId, number> = { simulate: 40, analyze: 220, publish: 400 };

export function GraphCanvas() {
  const { activeDomain, setSelectedProject } = useDomain();
  const domains = activeDomain === 'all' ? DOMAINS : DOMAINS.filter((d) => d.id === activeDomain);

  const rows = useMemo(() => {
    return domains.map((domain, rowIndex) => {
      const nodes = STEP_ORDER.map((step) => {
        const projs = PROJECTS.filter((p) => p.domain === domain.id && p.step === step);
        return { step, projs };
      });
      return { domain, nodes, y: 36 + rowIndex * 64 };
    });
  }, [domains]);

  const height = 56 + rows.length * 64;

  return (
    <div className="border border-[var(--hairline)] bg-white p-3">
      <h3 className="text-[10px] font-mono tracking-widest text-neutral-400 mb-2">
        DEPENDENCY GRAPH — NES CORE
      </h3>
      <svg viewBox={`0 0 460 ${height}`} className="w-full" style={{ height: Math.min(height, 260) }}>
        {rows.map(({ domain, nodes, y }) => (
          <g key={domain.id}>
            <line
              x1={COL_X.simulate}
              y1={y}
              x2={COL_X.publish}
              y2={y}
              stroke={domain.accentHex}
              strokeOpacity={0.25}
              strokeWidth={1.5}
            />
            {nodes.map(({ step, projs }) => (
              <g key={step}>
                {projs.map((p, i) => (
                  <circle
                    key={p.id}
                    cx={COL_X[step] + i * 10}
                    cy={y}
                    r={5}
                    fill={domain.accentHex}
                    stroke="white"
                    strokeWidth={1}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(p)}
                  >
                    <title>{p.name}</title>
                  </circle>
                ))}
              </g>
            ))}
            <text x={4} y={y - 10} fontSize={8} fontFamily="ui-monospace, monospace" fill={domain.accentHex}>
              {domain.shortLabel}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
