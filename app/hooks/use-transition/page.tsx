'use client';

import { HookPageLayout } from '@/components/HookPageLayout';
import { TabDemo } from '@/components/demos/use-transition/TabDemo';
import { GlassCard } from '@/components/ui/GlassCard';
import { Activity, Zap } from 'lucide-react';

export default function UseTransitionPage() {
    return (
        <HookPageLayout
            title="useTransition"
            subtitle="Command your render priorities. Mark updates as non-urgent to keep the UI responsive."
            icon={Zap}
        >
            {/* Concept Visualization */}
            <section className="grid md:grid-cols-2 gap-8">
                <GlassCard className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Activity className="text-[var(--accent-cyan)]" />
                        The Problem
                    </h2>
                    <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-lg space-y-4">
                        <div className="flex items-center gap-4 text-red-200">
                            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center font-bold">1</div>
                            <p>User clicks &quot;Heavy Tab&quot;</p>
                        </div>
                        <div className="h-8 w-0.5 bg-red-500/20 mx-4" />
                        <div className="flex items-center gap-4 text-red-200">
                            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center font-bold">2</div>
                            <p>React freezes to render content</p>
                        </div>
                        <div className="h-8 w-0.5 bg-red-500/20 mx-4" />
                        <div className="flex items-center gap-4 text-red-200">
                            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center font-bold">3</div>
                            <p>UI becomes unresponsive</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap className="text-[var(--accent-success)]" />
                        The Solution
                    </h2>
                    <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-lg space-y-4">
                        <div className="flex items-center gap-4 text-emerald-200">
                            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center font-bold">1</div>
                            <p>User clicks &quot;Heavy Tab&quot;</p>
                        </div>
                        <div className="h-8 w-0.5 bg-emerald-500/20 mx-4" />
                        <div className="flex items-center gap-4 text-emerald-200">
                            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center font-bold">2</div>
                            <p>Updates marked as <span className="font-mono text-xs bg-emerald-500/20 p-1 rounded">transition</span></p>
                        </div>
                        <div className="h-8 w-0.5 bg-emerald-500/20 mx-4" />
                        <div className="flex items-center gap-4 text-emerald-200">
                            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center font-bold">3</div>
                            <p>UI stays responsive, renders in background</p>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Interactive Demo */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Interactive Demo: Interruptible Rendering</h2>
                <GlassCard>
                    <TabDemo />
                </GlassCard>
            </section>

            {/* Code Snippet */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Code Pattern</h2>
                <GlassCard className="font-mono text-sm overflow-x-auto bg-[#0d1117]">
                    <pre>
                        {`const [isPending, startTransition] = useTransition();

function selectTab(nextTab) {
  startTransition(() => {
    // This state update is marked as low priority
    setTab(nextTab);
  });
}

return (
  <div style={{ opacity: isPending ? 0.5 : 1 }}>
    {/* Renders even if tab change is processed later */}
    <Tabs />
  </div>
);`}
                    </pre>
                </GlassCard>
            </section>
        </HookPageLayout>
    );
}
