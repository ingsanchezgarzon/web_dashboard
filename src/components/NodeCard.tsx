import type { ProjectNode } from '../data/projectRegistry';
import { DOMAINS } from '../data/projectRegistry';
import { useDomain } from '../contexts/DomainContext';
import { ProgressBar } from './ProgressBar';

const STATUS_LABEL: Record<ProjectNode['status'], string> = {
  active: 'ACTIVE',
  prototype: 'PROTOTYPE',
  planned: 'PLANNED',
};

export function NodeCard({ project }: { project: ProjectNode }) {
  const { isDimmed, setSelectedProject } = useDomain();
  const domain = DOMAINS.find((d) => d.id === project.domain)!;
  const dimmed = isDimmed(project.domain);

  return (
    <button
      onClick={() => setSelectedProject(project)}
      className={`node-card w-full text-left bg-white border border-[var(--hairline)] p-3 mb-3 hover:shadow-md hover:-translate-y-0.5 ${
        dimmed ? 'node-card--dimmed' : ''
      }`}
      style={{ borderLeftWidth: '3px', borderLeftColor: domain.accentHex }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-neutral-900">{project.name}</h3>
        <span
          className="shrink-0 text-[10px] tracking-wide font-mono px-1.5 py-0.5 border"
          style={{ color: domain.accentHex, borderColor: domain.accentHex }}
        >
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed line-clamp-3">
        {project.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] font-mono text-neutral-400 border border-neutral-200 px-1">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <ProgressBar progress={project.progress} accentHex={domain.accentHex} />
        <span className="shrink-0 text-[10px] font-mono text-neutral-400">{project.progress}%</span>
      </div>
    </button>
  );
}
