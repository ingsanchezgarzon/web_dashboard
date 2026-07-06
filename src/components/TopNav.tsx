import { DOMAINS } from '../data/projectRegistry';
import type { DomainFilter } from '../contexts/DomainContext';
import { useDomain } from '../contexts/DomainContext';

export function TopNav() {
  const { activeDomain, setActiveDomain } = useDomain();

  const chips: { id: DomainFilter; label: string; accentHex?: string }[] = [
    { id: 'all', label: 'ALL' },
    ...DOMAINS.map((d) => ({ id: d.id as DomainFilter, label: d.label, accentHex: d.accentHex })),
  ];

  return (
    <div className="border-b border-[var(--hairline)] bg-white sticky top-0 z-40">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--hairline)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-neutral-900" />
          <h1 className="text-sm font-semibold tracking-wide text-neutral-900">
            AI ARCHITECTURE ECOSYSTEM <span className="text-neutral-400 font-normal">— Interactive Hub</span>
          </h1>
        </div>
        <button className="text-[11px] font-mono tracking-wide border border-neutral-300 px-3 py-1.5 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900">
          CONFIG / DEPLOY
        </button>
      </div>
      <div className="flex items-center gap-2 px-5 py-2.5 overflow-x-auto">
        {chips.map((chip) => {
          const active = activeDomain === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveDomain(chip.id)}
              className="chip whitespace-nowrap text-[11px] font-mono tracking-wide px-3 py-1.5 border rounded-full"
              style={{
                borderColor: active ? (chip.accentHex ?? '#14151a') : 'var(--hairline)',
                backgroundColor: active ? (chip.accentHex ?? '#14151a') : 'transparent',
                color: active ? '#ffffff' : '#6b7280',
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
