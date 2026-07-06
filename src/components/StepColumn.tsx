import type { ReactNode } from 'react';
import type { StepId } from '../data/projectRegistry';
import { STEP_LABELS } from '../data/projectRegistry';
import { useDomain, useProjectsByStep } from '../contexts/DomainContext';
import { NodeCard } from './NodeCard';

const STEP_WIDTH: Record<StepId, string> = {
  simulate: 'lg:w-[30%]',
  analyze: 'lg:w-[40%]',
  publish: 'lg:w-[30%]',
};

export function StepColumn({ step, graphSlot }: { step: StepId; graphSlot?: ReactNode }) {
  const { activeDomain } = useDomain();
  const projects = useProjectsByStep(step, activeDomain);

  return (
    <section className={`w-full ${STEP_WIDTH[step]} border-r last:border-r-0 border-[var(--hairline)] px-4 py-4`}>
      <header className="mb-3 pb-2 border-b border-[var(--hairline)]">
        <h2 className="text-xs font-mono font-semibold tracking-widest text-neutral-500">
          {STEP_LABELS[step]}
        </h2>
      </header>
      {graphSlot && <div className="mb-4">{graphSlot}</div>}
      <div>
        {projects.length === 0 ? (
          <p className="text-xs text-neutral-400 font-mono">— sin proyectos —</p>
        ) : (
          projects.map((p) => <NodeCard key={p.id} project={p} />)
        )}
      </div>
    </section>
  );
}
