import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { DomainId, ProjectNode } from '../data/projectRegistry';
import { PROJECTS } from '../data/projectRegistry';

export type DomainFilter = DomainId | 'all';

interface DomainContextValue {
  activeDomain: DomainFilter;
  setActiveDomain: (domain: DomainFilter) => void;
  selectedProject: ProjectNode | null;
  setSelectedProject: (project: ProjectNode | null) => void;
  isDimmed: (domain: DomainId) => boolean;
}

const DomainContext = createContext<DomainContextValue | undefined>(undefined);

export function DomainProvider({ children }: { children: ReactNode }) {
  const [activeDomain, setActiveDomain] = useState<DomainFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectNode | null>(null);

  const isDimmed = useMemo(
    () => (domain: DomainId) => activeDomain !== 'all' && activeDomain !== domain,
    [activeDomain]
  );

  const value: DomainContextValue = {
    activeDomain,
    setActiveDomain,
    selectedProject,
    setSelectedProject,
    isDimmed,
  };

  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

export function useDomain() {
  const ctx = useContext(DomainContext);
  if (!ctx) throw new Error('useDomain must be used within a DomainProvider');
  return ctx;
}

export function useProjectsByStep(step: ProjectNode['step'], domain: DomainFilter) {
  return useMemo(
    () => PROJECTS.filter((p) => p.step === step && (domain === 'all' || p.domain === domain)),
    [step, domain]
  );
}
