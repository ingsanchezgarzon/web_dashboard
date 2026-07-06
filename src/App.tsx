import { DomainProvider } from './contexts/DomainContext';
import { TopNav } from './components/TopNav';
import { StepColumn } from './components/StepColumn';
import { GraphCanvas } from './components/GraphCanvas';
import { NodeDrawer } from './components/NodeDrawer';

function App() {
  return (
    <DomainProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <TopNav />
        <main className="flex flex-col lg:flex-row w-full">
          <StepColumn step="simulate" />
          <StepColumn step="analyze" graphSlot={<GraphCanvas />} />
          <StepColumn step="publish" />
        </main>
        <NodeDrawer />
      </div>
    </DomainProvider>
  );
}

export default App;
