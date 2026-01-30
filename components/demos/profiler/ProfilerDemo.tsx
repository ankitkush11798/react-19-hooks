'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, BarChart3, RefreshCw } from 'lucide-react';
import { Profiler, useState } from 'react';

type RenderData = {
    id: string;
    phase: "mount" | "update" | "nested-update";
    actualDuration: number;
    baseDuration: number;
    startTime: number;
    commitTime: number;
};

export function ProfilerDemo() {
    const [renderHistory, setRenderHistory] = useState<RenderData[]>([]);
    const [count, setCount] = useState(0);
    const [heavyLoad, setHeavyLoad] = useState(false);

    function onRender(
        id: string,
        phase: "mount" | "update" | "nested-update",
        actualDuration: number,
        baseDuration: number,
        startTime: number,
        commitTime: number
    ) {
        setRenderHistory(prev => [{
            id,
            phase,
            actualDuration: Number(actualDuration.toFixed(2)),
            baseDuration: Number(baseDuration.toFixed(2)),
            startTime: Number(startTime.toFixed(2)),
            commitTime: Number(commitTime.toFixed(2))
        }, ...prev].slice(0, 5));
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Activity className="text-[var(--accent-cyan)]" />
                        Live Profiling Target
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[var(--text-secondary)]">Simulate Load:</span>
                            <div className="flex items-center gap-2">
                                <span className={heavyLoad ? "text-orange-400 font-bold" : "text-[var(--text-muted)]"}>
                                    {heavyLoad ? "HEAVY CALC" : "NORMAL"}
                                </span>
                                <button
                                    onClick={() => setHeavyLoad(!heavyLoad)}
                                    className={`w-10 h-6 rounded-full p-1 transition-colors ${heavyLoad ? 'bg-orange-500' : 'bg-slate-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${heavyLoad ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>

                        <Profiler id="CounterComponent" onRender={onRender}>
                            <TargetComponent count={count} heavy={heavyLoad} />
                        </Profiler>

                        <button
                            onClick={() => setCount(c => c + 1)}
                            className="w-full mt-4 py-3 rounded-md bg-[var(--accent-violet)] text-white font-bold hover:bg-[var(--accent-violet)]/80 flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <RefreshCw size={18} />
                            Trigger Update
                        </button>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="h-[450px] flex flex-col">
                <h3 className="font-bold border-b border-[var(--glass-border)] pb-4 mb-4 flex items-center gap-2">
                    <BarChart3 className="text-emerald-400" />
                    Profiler Output
                </h3>

                <div className="flex-1 overflow-y-auto space-y-3">
                    <AnimatePresence initial={false}>
                        {renderHistory.length === 0 ? (
                            <div className="text-center text-[var(--text-muted)] mt-10 text-sm">
                                Interact with the component to see render metrics.
                            </div>
                        ) : (
                            renderHistory.map((data) => (
                                <motion.div
                                    key={`${data.id}-${data.commitTime}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs space-y-2"
                                >
                                    <div className="flex justify-between items-center text-[var(--text-primary)] font-bold">
                                        <span>{data.id}</span>
                                        <span className={data.phase === 'mount' ? 'text-emerald-400' : 'text-blue-400'}>
                                            {data.phase.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[var(--text-muted)]">
                                        <div>Duration: <span className="text-[var(--accent-cyan)]">{data.actualDuration}ms</span></div>
                                        <div>Base: {data.baseDuration}ms</div>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(data.actualDuration * 10, 100)}%` }}
                                            className="h-full bg-[var(--accent-cyan)]"
                                        />
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </GlassCard>
        </div>
    );
}

function TargetComponent({ count, heavy }: { count: number, heavy: boolean }) {
    // Artificial slowdown
    if (heavy) {
        // eslint-disable-next-line react-hooks/purity
        const start = performance.now();
        // eslint-disable-next-line react-hooks/purity
        while (performance.now() - start < 10) {
            // Spin for 10ms
        }
    }

    return (
        <div className="text-center py-8">
            <div className="text-4xl font-black text-white mb-2 font-mono">
                {count}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
                Render Count
            </div>
        </div>
    );
}
