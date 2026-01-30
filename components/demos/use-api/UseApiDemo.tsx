'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Database, Loader2, Package } from 'lucide-react';
import { createContext, Suspense, use, useState } from 'react';

// --- 1. Promise Support ---
// Simulating a data fetch
const fetchData = (id: number) => {
    return new Promise<{ id: number, title: string, details: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                title: `Resource Packet #${id}`,
                details: "Verified integrity. Ready for consumption."
            });
        }, 2000);
    });
};

// Cache the promise to avoid creating new ones on every render
// In a real app, use a framework or cache like React Cache or TanStack Query
const promiseCache = new Map<number, Promise<{ id: number, title: string, details: string }>>();
function getPromise(id: number) {
    if (!promiseCache.has(id)) {
        promiseCache.set(id, fetchData(id));
    }
    return promiseCache.get(id)!;
}

function PromiseComponent({ id }: { id: number }) {
    // 'use' unwraps the promise! If it's pending, it Suspends.
    const data = use(getPromise(id));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded bg-emerald-900/10 border border-emerald-500/20"
        >
            <h4 className="font-bold text-emerald-300 mb-1">{data.title}</h4>
            <p className="text-xs text-[var(--text-muted)]">{data.details}</p>
        </motion.div>
    );
}

// --- 2. Conditional Context ---
const ThemeContext = createContext("dark");

function ContextComponent({ show }: { show: boolean }) {
    // 'use' can be called conditionally! (unlike useContext)
    if (!show) return null;

    // This would throw a "Rules of Hooks" error with useContext
    const theme = use(ThemeContext);

    return (
        <div className="mt-4 p-2 rounded bg-yellow-900/10 border border-yellow-500/20 text-yellow-200 text-xs">
            Conditional Context Value: <strong>{theme}</strong>
        </div>
    );
}

export function UseApiDemo() {
    const [resourceId, setResourceId] = useState(1);

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <h3 className="font-bold flex items-center gap-2 border-b border-[var(--glass-border)] pb-4">
                    <Database className="text-[var(--accent-cyan)]" />
                    Data Stream
                </h3>

                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                        React 19&apos;s <code className="text-[var(--accent-violet)]">use</code> API can unwrap promises directly inside components, integrating seamlessly with Suspense.
                    </p>

                    <div className="flex gap-2">
                        {[1, 2, 3].map(id => (
                            <button
                                key={id}
                                onClick={() => setResourceId(id)}
                                className={`px-4 py-2 rounded font-bold transition-all ${resourceId === id ? 'bg-[var(--accent-violet)] text-white' : 'bg-[var(--bg-deep)] border border-[var(--glass-border)]'}`}
                            >
                                Load #{id}
                            </button>
                        ))}
                    </div>

                    <div className="h-32 relative flex items-center justify-center bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg">
                        <Suspense fallback={
                            <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
                                <Loader2 className="animate-spin" />
                                <span className="text-xs">Suspending...</span>
                            </div>
                        }>
                            <PromiseComponent id={resourceId} />
                        </Suspense>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="space-y-6">
                <h3 className="font-bold flex items-center gap-2 border-b border-[var(--glass-border)] pb-4">
                    <Package className="text-orange-400" />
                    Flexible Context
                </h3>

                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Unlike <code className="text-[var(--text-muted)]">useContext</code>, <code className="text-[var(--accent-violet)]">use</code> can be called inside loops and if-statements.
                    </p>

                    <ContextComponent show={true} />

                    <div className="p-4 rounded bg-white/5 border border-white/10 text-xs font-mono text-[var(--text-muted)]">
                        {`if (condition) {
  // ✅ Valid with 'use'
  const theme = use(ThemeContext);
}`}
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
