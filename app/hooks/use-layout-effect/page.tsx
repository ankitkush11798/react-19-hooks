'use client';

import { HookPageLayout } from '@/components/HookPageLayout';
import { TooltipDemo } from '@/components/demos/use-layout-effect/TooltipDemo';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eye, LayoutTemplate } from 'lucide-react';

export default function UseLayoutEffectPage() {
    return (
        <HookPageLayout
            title="useLayoutEffect"
            subtitle="Measure and mutate DOM before the user sees. Prevent visual flickering."
            icon={LayoutTemplate}
        >
            {/* Concept Visualization */}
            <section className="grid md:grid-cols-2 gap-8">
                <GlassCard className="p-8 space-y-4 border-red-500/20">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-red-300">
                        <Eye className="text-red-400" />
                        useEffect Algorithm
                    </h2>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="p-2 border border-[var(--glass-border)] rounded">1. React Updates DOM</div>
                        <div className="p-2 bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold rounded">2. Browser Paints Screen (Flicker!)</div>
                        <div className="p-2 border border-[var(--glass-border)] rounded text-red-300">3. useEffect Runs</div>
                        <div className="p-2 border border-[var(--glass-border)] rounded">4. State Updates (Repaint)</div>
                    </div>
                </GlassCard>

                <GlassCard className="p-8 space-y-4 border-green-500/20">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-green-300">
                        <LayoutTemplate className="text-green-400" />
                        useLayoutEffect Algorithm
                    </h2>
                    <div className="space-y-4 font-mono text-xs">
                        <div className="p-2 border border-[var(--glass-border)] rounded">1. React Updates DOM</div>
                        <div className="p-2 border border-[var(--glass-border)] rounded text-green-300">2. useLayoutEffect Runs (Measure/Mutate)</div>
                        <div className="p-2 bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold rounded">3. Browser Paints Screen (Correct!)</div>
                    </div>
                </GlassCard>
            </section>

            {/* Interactive Demo */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Interactive Demo: Tooltip Positioning</h2>
                <GlassCard>
                    <TooltipDemo />
                </GlassCard>
            </section>

            {/* Code Snippet */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Code Pattern</h2>
                <GlassCard className="font-mono text-sm overflow-x-auto bg-[#0d1117]">
                    <pre>
                        {`useLayoutEffect(() => {
  // Can read DOM immediately after mutation
  const { height } = ref.current.getBoundingClientRect();

  // Can synchronously update state BEFORE paint
  if (height > 100) {
    setHeight('compact');
  }
}, []); // Blocks browser paint until finished`}
                    </pre>
                </GlassCard>
            </section>
        </HookPageLayout>
    );
}
