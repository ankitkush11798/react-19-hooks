'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { memo, useDeferredValue, useState } from 'react';

export function SearchDemo() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const [compareMode, setCompareMode] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">Search Query</label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type quickly..."
                        className="w-full bg-[var(--bg-subtle)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-[var(--text-muted)]">Comparison Mode</label>
                    <button
                        onClick={() => setCompareMode(!compareMode)}
                        className={clsx(
                            "w-12 h-6 rounded-full transition-colors relative",
                            compareMode ? "bg-[var(--accent-cyan)]" : "bg-[var(--glass-border)]"
                        )}
                    >
                        <span className={clsx(
                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                            compareMode ? "translate-x-6" : "translate-x-0"
                        )} />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* OPTIMIZED COLUMN */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[var(--accent-cyan)]">Optimized (useDeferredValue)</h3>
                        {query !== deferredQuery && (
                            <span className="text-xs text-[var(--accent-cyan)] animate-pulse">Rendering...</span>
                        )}
                    </div>
                    <GlassCard className="h-[300px] overflow-y-auto">
                        <HeavyList query={deferredQuery} />
                    </GlassCard>
                    <p className="text-xs text-[var(--text-muted)]">
                        The input remains responsive because the list updates are deferred given lower priority.
                    </p>
                </div>

                {/* UNOPTIMIZED COLUMN */}
                <div className={clsx("space-y-4 transition-opacity", !compareMode && "opacity-30 grayscale pointer-events-none")}>
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-red-400">Unoptimized (Blocking)</h3>
                    </div>
                    <GlassCard className="h-[300px] overflow-y-auto border-red-500/20">
                        {compareMode ? <HeavyList query={query} /> : <div className="flex items-center justify-center h-full text-sm">Enable Comparison Mode</div>}
                    </GlassCard>
                    <p className="text-xs text-[var(--text-muted)]">
                        The input freezes while typing because the heavy list update blocks the main thread.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Heavy component - blocks render
const HeavyList = memo(function HeavyList({ query }: { query: string }) {
    if (!query) return <div className="text-[var(--text-muted)]">Type to search...</div>;

    const items = [];

    // Artificial slowdown
    // Note: In a real app, this would be complex rendering logic
    // We block for 20ms per item chunk to simulate "heavy render"
    // eslint-disable-next-line react-hooks/purity
    const start = performance.now();
    // eslint-disable-next-line react-hooks/purity
    while (performance.now() - start < 50) {
        // Burn CPU
    }

    for (let i = 0; i < 500; i++) {
        if (query && !`Item ${i}`.toLowerCase().includes(query.toLowerCase())) continue;
        items.push(<li key={i} className="py-1 border-b border-[var(--glass-border)] last:border-0">Result #{i} for &quot;{query}&quot;</li>);
    }

    return (
        <ul className="space-y-1 text-sm">
            {items}
            {items.length === 0 && <li>No results found</li>}
        </ul>
    );
});
