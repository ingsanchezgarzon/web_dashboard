export type DomainId = 'finance' | 'systems' | 'supply_chain' | 'applied_ai';
export type StepId = 'simulate' | 'analyze' | 'publish';

export interface DomainMeta {
  id: DomainId;
  label: string;
  shortLabel: string;
  accent: string;       // tailwind color token base, e.g. 'amber'
  accentHex: string;    // literal hex for inline/canvas usage
  description: string;
}

export interface ProjectNode {
  id: string;
  domain: DomainId;
  step: StepId;
  name: string;
  path: string;          // relative path from repo root
  description: string;
  stack: string[];
  status: 'active' | 'prototype' | 'planned';
  /** 0-100 maturity/completion estimate, derived from real repo signals (tests, docs, working features). */
  progress: number;
  /** One-line justification for the progress score, shown next to the progress bar. */
  maturityNote: string;
}

export const DOMAINS: DomainMeta[] = [
  {
    id: 'finance',
    label: 'FINANCE',
    shortLabel: 'Finance',
    accent: 'amber',
    accentHex: '#c9973a',
    description:
      'Optimización patrimonial y estructuras fiscales del ecosistema francés (PEA, PEE, PER, LMNP, SCI) — simuladores de inversión, Libro Mayor analítico y contenido educativo de finanzas personales.',
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    shortLabel: 'Systems / PM',
    accent: 'teal',
    accentHex: '#0f9488',
    description:
      'Simulación de sistemas y juegos adversariales (Conway, AOE2), Torre de Control de PM y modelos de madurez de proyectos apoyados en Redes Bayesianas.',
  },
  {
    id: 'supply_chain',
    label: 'SUPPLY CHAIN',
    shortLabel: 'Supply Chain',
    accent: 'red',
    accentHex: '#b91c1c',
    description:
      'Simulador de resiliencia de cadena de suministro multi-echelon, Observatorio de Supply Chain y auditoría analítica de hojas de Excel.',
  },
  {
    id: 'applied_ai',
    label: 'APPLIED AI',
    shortLabel: 'Applied AI',
    accent: 'indigo',
    accentHex: '#4338ca',
    description:
      'Orquestación multi-agente, perfiles cognitivos (MBTI) y el motor NES que conecta la tesis doctoral con pipelines modernos de IA (Claude Code, Gemini).',
  },
];

export const STEP_LABELS: Record<StepId, string> = {
  simulate: '01_SIMULATE',
  analyze: '02_ANALYZE',
  publish: '03_PUBLISH',
};

export const PROJECTS: ProjectNode[] = [
  // ---- Domain 1: Finance ----
  {
    id: 'investing-game',
    domain: 'finance',
    step: 'simulate',
    name: 'Investing Game (Patrimoine)',
    path: '01_investment_core/01_simulate/investing_game/02-Investing-Game',
    description:
      'Juego de tablero educativo de inversión en Francia: PEA, CTO, PEE, Assurance Vie, LMNP, SCI IS/IR. Balance y cashflow personal turno a turno.',
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Tailwind'],
    status: 'active',
    progress: 55,
    maturityNote: 'Reconstrucción activa Excel→web; Fase 1 del roadmap en curso, docs de arquitectura y modelo de datos completos.',
  },
  {
    id: 'full-finance-game',
    domain: 'finance',
    step: 'simulate',
    name: 'The Money Game',
    path: '01_investment_core/01_simulate/full_finance_game',
    description:
      'Simulador de finanzas personales en tablero circular con niveles 0-5, cartas de eventos y catálogo de activos declarativo.',
    stack: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
    status: 'active',
    progress: 70,
    maturityNote: 'Jugable de punta a punta: motor de economía, niveles 0-5 y catálogo de activos ya implementados.',
  },
  {
    id: 'game-agents-simulation',
    domain: 'finance',
    step: 'simulate',
    name: 'Agent Wealth Simulation',
    path: '01_investment_core/01_simulate/game_agents_simulation/agent-wealth',
    description: 'Simulación de agentes de riqueza con prompts de comportamiento financiero.',
    stack: ['Python'],
    status: 'prototype',
    progress: 20,
    maturityNote: 'Solo prompts de comportamiento definidos; sin motor de simulación ejecutable todavía.',
  },
  {
    id: '360-invest-dashboard',
    domain: 'finance',
    step: 'analyze',
    name: '360 Invest Dashboard',
    path: '01_investment_core/02_Analyse/360 Invest Dashboard',
    description:
      'Dashboard que rastrea los índices bursátiles principales (S&P 500, NASDAQ 100, MSCI World, LQQ) y sus acciones motoras, enrutando cada idea de inversión hacia el wrapper fiscal francés óptimo (PEA/PEE/CTO).',
    stack: ['Python', 'FastAPI', 'yfinance', 'Next.js', 'Tailwind', 'Docker'],
    status: 'active',
    progress: 70,
    maturityNote: 'Backend y frontend completos, con Docker, hardening de seguridad y empaquetado móvil Android vía Capacitor.',
  },
  {
    id: 'agente-contenido',
    domain: 'finance',
    step: 'publish',
    name: 'Personal Finance Content Pipeline',
    path: '01_investment_core/03_publish/agente_contenido',
    description:
      'Pipeline multi-agente (research → strategist → writer → editor → publisher) que genera posts de finanzas para expats en Francia, listos para LinkedIn e Instagram.',
    stack: ['Python', 'Claude Code CLI', 'Tavily', 'Gemini'],
    status: 'active',
    progress: 80,
    maturityNote: 'Pipeline de 5 agentes end-to-end con outputs ya generados y publicados (drafts + published/).',
  },
  {
    id: 'agente-storytelling',
    domain: 'finance',
    step: 'publish',
    name: 'Agente de Storytelling',
    path: '01_investment_core/03_publish/agente_storytelling',
    description:
      'Pipeline de 6 agentes que investiga temas de finanzas personales, redacta artículos/guiones y genera prompts e imágenes para historias de Instagram dirigidas a expats en Francia.',
    stack: ['Python', 'Anthropic SDK', 'Google GenAI', 'Tavily', 'Streamlit'],
    status: 'active',
    progress: 65,
    maturityNote: 'App Streamlit funcional con historial de outputs generados; solapa parcialmente con el Content Pipeline.',
  },
  {
    id: 'historias-automatizadas',
    domain: 'finance',
    step: 'publish',
    name: 'Historias Automatizadas',
    path: '01_investment_core/03_publish/historias_automatizadas',
    description: 'Generación automatizada de historias visuales (Instagram) a partir de fotos y narrativas financieras.',
    stack: ['Python'],
    status: 'prototype',
    progress: 30,
    maturityNote: 'Generación de historias visuales en etapa temprana, catálogo de fotos definido pero pipeline no automatizado aún.',
  },

  // ---- Domain 2: Systems / PM ----
  {
    id: 'conway-1v1',
    domain: 'systems',
    step: 'simulate',
    name: "Conway's Game of Life 1v1",
    path: '02_pm_tower/01_simulate/conway_game_of_life_1v1',
    description:
      'Batalla de dos equipos en el Juego de la Vida de Conway, con capitanes inmunes controlados por agentes RL (Q-Learning, SARSA, Expected SARSA) o LLM vía API.',
    stack: ['Vanilla JS', 'Canvas', 'Python', 'Flask'],
    status: 'active',
    progress: 90,
    maturityNote: 'Muy maduro: 3 algoritmos RL comparables lado a lado + Fase 2 con cerebros vía API (Claude/Gemini) ya implementada.',
  },
  {
    id: 'aoe2-agents',
    domain: 'systems',
    step: 'simulate',
    name: 'AOE2 Agents (Conway Variant)',
    path: '02_pm_tower/01_simulate/aoe2_agents_conway_variant',
    description: 'Variante extendida del Game of Life 1v1 con analítica adicional de estrategia RTS.',
    stack: ['Vanilla JS', 'Canvas', 'Python'],
    status: 'prototype',
    progress: 45,
    maturityNote: 'Comparte base de código con Conway 1v1; variante extendida aún sin analítica RTS diferenciada completa.',
  },
  {
    id: 'civilization',
    domain: 'systems',
    step: 'simulate',
    name: 'Economic Evolution — Civilization',
    path: '02_pm_tower/01_simulate/Civilization',
    description:
      'Simulación de cuadrícula que combina un autómata celular con una economía multi-agente de cadena de suministro: trabajadores, producción y transporte evolucionando a través de 4 eras progresivas.',
    stack: ['Vanilla JS', 'Canvas', 'Python', 'React (en curso)'],
    status: 'active',
    progress: 60,
    maturityNote: 'Juego jugable con logs de simulación económica generados; migración de frontend a React todavía en desarrollo.',
  },
  {
    id: 'pm-control-tower',
    domain: 'systems',
    step: 'analyze',
    name: 'Agentic PM Control Tower',
    path: '02_pm_tower/02_analyze/agentic_pm_control_tower',
    description:
      'Torre de control de proyectos: aplica Redes Bayesianas a las dependencias de proyectos para predecir fallos y cuellos de botella según el PMMM.',
    stack: ['Python', 'Bayesian Networks'],
    status: 'active',
    progress: 60,
    maturityNote: 'Motor de predicción de dependencias funcional; documentación aún limitada a CLAUDE.md (sin README público).',
  },
  {
    id: 'pm-maturity-engine',
    domain: 'systems',
    step: 'analyze',
    name: 'PM Maturity Engine',
    path: '02_pm_tower/02_analyze/pm-maturity-engine',
    description:
      'Motor didáctico multi-paradigma que opera los capítulos 4-5 de la tesis doctoral: madurez de PM como causa de sobrecostos, con Causal AI (CausalNex) comparado contra ML correlacional.',
    stack: ['Python', 'CausalNex', 'Streamlit', 'pytest'],
    status: 'active',
    progress: 85,
    maturityNote: 'Suite de 26 tests, dashboard Streamlit y API funcionando; compara 3 paradigmas ML contra la red Bayesiana causal en cada corrida.',
  },
  {
    id: 'strategic-bn-pm-nes',
    domain: 'systems',
    step: 'analyze',
    name: 'Strategic BN — PM × NES',
    path: '02_pm_tower/02_analyze/strategic_bn_pm_nes',
    description: 'Red Bayesiana estratégica conectando madurez de PM con el motor NES central.',
    stack: ['Python', 'Bayesian Networks'],
    status: 'prototype',
    progress: 25,
    maturityNote: 'Red Bayesiana exploratoria conectando PM y NES; aún no integrada con los motores de madurez principales.',
  },

  // ---- Domain 3: Supply Chain ----
  {
    id: 'supplychain-game',
    domain: 'supply_chain',
    step: 'simulate',
    name: 'Supply Chain of Life',
    path: '03_supply_obs/01_simulate/supplychain_game',
    description:
      'Simulación de red de cadena de suministro (Supplier → Factory → Warehouse → Retailer → Market) en canvas, con agentes Supplier/Buyer compitiendo vía RL, campaña de 10 niveles.',
    stack: ['Vanilla JS', 'Canvas', 'Python', 'Flask'],
    status: 'active',
    progress: 55,
    maturityNote: 'Adaptado del motor Conway 1v1 con dashboard en vivo; el contrato data_logs/ hacia 02_analyze todavía no está estandarizado.',
  },
  {
    id: 'supply-chain-observatory',
    domain: 'supply_chain',
    step: 'analyze',
    name: 'Supply Chain Maturity Observatory',
    path: '03_supply_obs/02_analyze/supply_chain_maturity_observatory',
    description:
      'Observatorio analítico de madurez de cadena de suministro impulsado por agentes capaces de auditar y estructurar datos logísticos complejos.',
    stack: ['Python', 'scikit-learn'],
    status: 'active',
    progress: 65,
    maturityNote: 'Arquitectura documentada y módulo de observatorio operativo sobre scikit-learn.',
  },
  {
    id: 'excel-agent',
    domain: 'supply_chain',
    step: 'analyze',
    name: 'Excel Audit Agent',
    path: '03_supply_obs/02_analyze/excel_agent',
    description: 'Agente que audita y estructura hojas de cálculo Excel de supply chain de forma automatizada.',
    stack: ['Python', 'openpyxl'],
    status: 'prototype',
    progress: 25,
    maturityNote: 'Agente de auditoría de Excel en etapa inicial, sin README público todavía.',
  },

  // ---- Domain 4: Applied AI ----
  {
    id: 'mbti-agents',
    domain: 'applied_ai',
    step: 'simulate',
    name: 'MBTI Agents — The Personality Table',
    path: '04_nes_engine/01_Simulate/MBTI Agents',
    description:
      'Simulador donde 4 agentes con personalidades aleatorias (vector MBTI continuo + Teoría de Colores) negocian y completan una tarea colaborativa, generando logs estructurados para el motor NES.',
    stack: ['JavaScript', 'Canvas', 'Node.js'],
    status: 'prototype',
    progress: 55,
    maturityNote: 'Motor determinista con RNG sembrado y generación de datos batch funcional; precursor directo de civ-agent-sim.',
  },
  {
    id: 'civ-agent-sim',
    domain: 'applied_ai',
    step: 'simulate',
    name: 'Civ Agent Sim',
    path: '04_nes_engine/01_Simulate/civ-agent-sim',
    description:
      'Simulación de dos capas: un mundo estilo Civilization habitado por agentes 8-bit con personalidad que discuten, deciden y actúan sobre misiones asignadas por el jugador, con diálogo opcional vía LLM (Claude/OpenAI).',
    stack: ['Node.js', 'Express', 'Vanilla JS', 'Anthropic API', 'OpenAI API'],
    status: 'active',
    progress: 65,
    maturityNote: 'Servidor Express funcional con modo offline y modo LLM opcional; evolución directa de MBTI Agents.',
  },
  {
    id: 'fractal-to-ai',
    domain: 'applied_ai',
    step: 'simulate',
    name: 'Fractal to AI — FractalMind',
    path: '04_nes_engine/01_Simulate/Fractal to AI',
    description:
      'Simulador/juego educativo que visualiza arquitecturas de IA fractal en Canvas y SVG, pensado para ejecutarse como artifact interactivo de Claude.',
    stack: ['React', 'TypeScript', 'esbuild'],
    status: 'prototype',
    progress: 35,
    maturityNote: 'Código fuente completo con build configurado, pero sigue en fase exploratoria/conceptual.',
  },
  {
    id: 'thesis-brain',
    domain: 'applied_ai',
    step: 'analyze',
    name: 'Thesis Brain — Second Brain Vault',
    path: '04_nes_engine/02_analyze/thesis_brain',
    description:
      'Vault de notas interconectadas que proyecta dos décadas de investigación (sistemas industriales, causalidad Bayesiana, madurez de PM, supply chain, multi-agente) hacia arquitecturas de IA 2026. Incluye el Sparring Agent, un crítico socrático vía Claude.',
    stack: ['Markdown', 'Obsidian', 'Python', 'Anthropic API'],
    status: 'active',
    progress: 85,
    maturityNote: 'Vault de 5 etapas (conceptos→proyectos accionables) totalmente enlazado, con Sparring Agent funcional vía API de Anthropic.',
  },
  {
    id: 'thesis-raw-materials',
    domain: 'applied_ai',
    step: 'analyze',
    name: 'Thesis Raw Materials',
    path: '04_nes_engine/02_analyze/thesis_raw_materials',
    description: 'Materiales fuente originales de la tesis doctoral que alimentan la síntesis del Thesis Brain.',
    stack: ['PDF', 'Markdown'],
    status: 'active',
    progress: 90,
    maturityNote: 'Materiales fuente (tesis, papers, capítulos) completos y disponibles; es contenido crudo, no un pipeline de análisis.',
  },
];
