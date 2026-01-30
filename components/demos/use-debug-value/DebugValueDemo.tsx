'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { Activity, Bug } from 'lucide-react';
import { useDebugValue, useEffect, useState } from 'react';

// --- Custom Hook with Debug Value ---
function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {


        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // 1. Basic Usage: Simple Label
    // Show "Online" or "Offline" in DevTools next to "useOnlineStatus"
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
}

function useDelayedValue<T>(value: T, delay: number) {
    const [delayedValue, setDelayedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDelayedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    // 2. Advanced Usage: Formatting Function (Lazy)
    // Only calculate the slow debug string if DevTools is actually open inspecting this component
    useDebugValue(value, (v) => `Delayed: ${v} (${delay}ms)`);

    return delayedValue;
}

// --- Demo Component ---
export function DebugValueDemo() {
    const isOnline = useOnlineStatus();
    const [count, setCount] = useState(0);
    const delayedCount = useDelayedValue(count, 1000);

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* The Actual App UI */}
            <GlassCard className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 border-b border-[var(--glass-border)] pb-4">
                    <Activity className="text-[var(--accent-cyan)]" />
                    Application State
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded bg-[var(--bg-deep)] border border-[var(--glass-border)]">
                        <span className="text-[var(--text-muted)]">Network Status</span>
                        <span className={clsx("font-bold", isOnline ? "text-emerald-400" : "text-red-400")}>
                            {isOnline ? "Online" : "Offline"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded bg-[var(--bg-deep)] border border-[var(--glass-border)]">
                        <span className="text-[var(--text-muted)]">Counter</span>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xl">{count}</span>
                            <button
                                onClick={() => setCount(c => c + 1)}
                                className="px-3 py-1 rounded bg-[var(--accent-violet)] text-white text-xs hover:bg-[var(--accent-violet)]/80"
                            >
                                +1
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded bg-[var(--bg-deep)] border border-[var(--glass-border)]">
                        <span className="text-[var(--text-muted)]">Delayed Value</span>
                        <span className="font-mono text-xl text-[var(--accent-cyan)]">{delayedCount}</span>
                    </div>
                </div>
            </GlassCard>

            {/* Simulated DevTools Panel */}
            <GlassCard className="bg-[#2b2b2b] border-l-4 border-l-[var(--accent-violet)] font-mono text-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[var(--text-muted)] flex items-center gap-1 opacity-50">
                    <Bug size={14} />
                    <span>React DevTools Simulation</span>
                </div>

                <div className="mt-8 space-y-1">
                    <div className="text-blue-300">
                        &lt;DebugValueDemo&gt;
                    </div>
                    <div className="pl-4 border-l border-white/10 space-y-1">
                        <div className="text-white/70">
                            State: <span className="text-yellow-300">{count}</span>
                        </div>

                        {/* Visualizing useOnlineStatus */}
                        <div className="flex items-start gap-2 group">
                            <span className="text-purple-400">Hooks</span>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/50">1. useOnlineStatus:</span>
                                    <span className="bg-white/10 px-1 rounded text-orange-300">
                                        &quot;{isOnline ? 'Online' : 'Offline'}&quot;
                                    </span>
                                </div>

                                {/* Visualizing useDelayedValue */}
                                <div className="flex items-center gap-2">
                                    <span className="text-white/50">2. useDelayedValue:</span>
                                    <span className="bg-white/10 px-1 rounded text-orange-300">
                                        &quot;Delayed: {delayedCount} (1000ms)&quot;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-blue-300">
                        &lt;/DebugValueDemo&gt;
                    </div>
                </div>

                <div className="mt-8 p-3 rounded bg-[#1e1e1e] border border-white/10 text-[10px] text-white/50 italic">
                    Note: The labels in orange above are generated by <code>useDebugValue</code>.
                    Without this hook, DevTools would only show &quot;State&quot; or &quot;Effect&quot;, making it hard to identify
                    what the hook is doing at a glance.
                </div>
            </GlassCard>
        </div>
    );
}
