import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DOMAINS, STEP_LABELS } from '../data/projectRegistry';
import { useDomain } from '../contexts/DomainContext';
import { PROJECT_DOCS } from '../data/projectDocs.generated';
import { ProgressBar } from './ProgressBar';

type Tab = 'overview' | 'docs' | 'telemetry' | 'live';

const TELEMETRY_COPY: Record<string, string> = {
  simulate: 'Inputs esperados: parámetros de simulación y reglas de juego. Salida obligatoria: data_logs/ determinista (mismo esquema de columnas/JSON en cada corrida) para alimentar 02_analyze.',
  analyze: 'Consume data_logs/ del paso 1. Ejecuta grafos de Redes Bayesianas / modelos de madurez (core_engine/nes) y produce probabilidades y diagnósticos accionables.',
  publish: 'Consume insights del paso 2. Objetivos de dissemination: repos de GitHub, borradores Medium/LinkedIn, y canvas de imágenes listas para publicar.',
};

const STATUS_COPY: Record<string, string> = {
  active: 'En uso real, con funcionalidad de punta a punta verificable.',
  prototype: 'Primeras piezas construidas; falta camino para ser end-to-end.',
  planned: 'Solo definido conceptualmente, sin código todavía.',
};

export function NodeDrawer() {
  const { selectedProject, setSelectedProject } = useDomain();
  const [tab, setTab] = useState<Tab>('overview');

  if (!selectedProject) return null;

  const domain = DOMAINS.find((d) => d.id === selectedProject.domain)!;
  const doc = PROJECT_DOCS[selectedProject.id];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setSelectedProject(null)}
      />
      <aside className="drawer-enter relative w-full sm:w-[460px] h-full bg-white border-l border-[var(--hairline)] flex flex-col shadow-2xl">
        <header
          className="px-5 py-4 border-b border-[var(--hairline)]"
          style={{ borderTopWidth: '3px', borderTopColor: domain.accentHex, borderTopStyle: 'solid' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono tracking-widest" style={{ color: domain.accentHex }}>
                {domain.label} · {STEP_LABELS[selectedProject.step]}
              </p>
              <h2 className="text-lg font-semibold text-neutral-900 mt-1">{selectedProject.name}</h2>
              <p className="text-[11px] font-mono text-neutral-400 mt-1">{selectedProject.path}</p>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-neutral-400 hover:text-neutral-900 text-lg leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <ProgressBar progress={selectedProject.progress} accentHex={domain.accentHex} size="md" />
            <span className="shrink-0 text-xs font-mono font-semibold" style={{ color: domain.accentHex }}>
              {selectedProject.progress}%
            </span>
          </div>
        </header>

        <nav className="flex border-b border-[var(--hairline)]">
          {(['overview', 'docs', 'telemetry', 'live'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 text-xs font-mono tracking-wide py-2.5 uppercase border-b-2 transition-colors ${
                tab === t ? 'text-neutral-900' : 'text-neutral-400 border-transparent hover:text-neutral-600'
              }`}
              style={tab === t ? { borderColor: domain.accentHex } : undefined}
            >
              {t === 'overview' ? 'Overview' : t === 'docs' ? 'Docs' : t === 'telemetry' ? 'Telemetry' : 'Live Control'}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-700 leading-relaxed">{selectedProject.description}</p>

              <div>
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 mb-1.5">
                  MADUREZ — {selectedProject.status.toUpperCase()}
                </p>
                <p className="text-xs text-neutral-500 italic mb-1">{STATUS_COPY[selectedProject.status]}</p>
                <p className="text-xs text-neutral-700 leading-relaxed border-l-2 pl-2" style={{ borderColor: domain.accentHex }}>
                  {selectedProject.maturityNote}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 mb-1.5">STACK</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className="text-[11px] font-mono border border-neutral-200 px-1.5 py-0.5 text-neutral-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {!doc && (
                <div className="text-[11px] text-neutral-400 border border-dashed border-neutral-200 p-2 font-mono">
                  Sin README/CLAUDE.md público en {selectedProject.path}. Ver pestaña Docs.
                </div>
              )}
            </div>
          )}

          {tab === 'docs' && (
            <div>
              {doc ? (
                <>
                  <p className="text-[10px] font-mono tracking-widest text-neutral-400 mb-3">
                    FUENTE: {doc.sourceFile}
                  </p>
                  <div className="prose prose-sm prose-neutral max-w-none prose-headings:font-semibold prose-a:break-words prose-pre:text-xs prose-pre:overflow-x-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
                  </div>
                </>
              ) : (
                <p className="text-sm text-neutral-400 font-mono">
                  No se encontró README.md ni CLAUDE.md en {selectedProject.path}.
                </p>
              )}
            </div>
          )}

          {tab === 'telemetry' && (
            <div className="space-y-3">
              <p className="text-[10px] font-mono tracking-widest text-neutral-400">
                {STEP_LABELS[selectedProject.step]} — CONTRATO DE DATOS
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {TELEMETRY_COPY[selectedProject.step]}
              </p>
            </div>
          )}

          {tab === 'live' && (
            <div className="space-y-3">
              <p className="text-[10px] font-mono tracking-widest text-neutral-400 mb-2">
                MACRO-COMANDOS
              </p>
              {['Run Simulation', 'Trigger Analysis', 'Publish Draft'].map((action) => (
                <button
                  key={action}
                  className="w-full text-left text-xs font-mono border border-neutral-200 px-3 py-2 hover:border-neutral-400 text-neutral-700"
                >
                  ▶ {action}
                </button>
              ))}
              <p className="text-[11px] text-neutral-400 mt-3">
                Los botones de control ejecutan protocolos de backend definidos por proyecto (no conectados en esta demo).
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
