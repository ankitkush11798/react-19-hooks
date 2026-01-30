'use client';

import { HookPageLayout } from '@/components/HookPageLayout';
import { SearchDemo } from '@/components/demos/use-deferred-value/SearchDemo';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Clock } from 'lucide-react';

export default function UseDeferredValuePage() {
    return (
        <HookPageLayout
            title="useDeferredValue"
            subtitle="Master the art of render priorities. Defer updating a part of the UI to keep the rest responsive."
            icon={Clock}
        >
            {/* Concept Visualization */}
            <section>
                <GlassCard className="p-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="text-[var(--accent-cyan)]" />
                        How it Works
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                        <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] w-full">
                            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide mb-2">Input State</div>
                            <div className="text-2xl font-bold text-[var(--accent-cyan)]">Updated Immediately</div>
                            <p className="text-xs mt-2 opacity-70">High Priority (User Interaction)</p>
                        </div>

                        <ArrowRight className="hidden md:block text-[var(--text-muted)]" />

                        <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] w-full">
                            <div className="text-sm text-[var(--text-muted)] uppercase tracking-wide mb-2">Deferred Value</div>
                            <div className="text-2xl font-bold text-[var(--accent-violet)]">Updated Later</div>
                            <p className="text-xs mt-2 opacity-70">Low Priority (Heavy Rendering)</p>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Interactive Demo */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Interactive Demo: Debouncing vs Deferring</h2>
                <GlassCard>
                    <SearchDemo />
                </GlassCard>
            </section>

            {/* Code Snippet */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Code Pattern</h2>
                <GlassCard className="font-mono text-sm overflow-x-auto bg-[#0d1117]">
                    <pre>
                        {`const [query, setQuery] = useState('');
// This version of the query lags behind the real query
const deferredQuery = useDeferredValue(query);

return (
  <>
    {/* Input uses the real, immediate state -> Responsive */}
    <input value={query} onChange={e => setQuery(e.target.value)} />

    {/* Heavy list uses the deferred state -> Won't block input */}
    <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
      <HeavyList query={deferredQuery} />
    </div>
  </>
);`}
                    </pre>
                </GlassCard>
            </section>
        </HookPageLayout>
    );
}
