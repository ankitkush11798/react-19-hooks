'use client';

import { ActivityDemo } from '@/components/demos/activity/ActivityDemo';
import { HookPageLayout } from '@/components/HookPageLayout';
import { Activity } from 'lucide-react';

export default function ActivityPage() {
    return (
        <HookPageLayout
            title="<Activity>"
            subtitle="The Offscreen API"
            icon={Activity}
            badges={['Experimental', 'Concurrent', 'Performance']}
        >
            <div className="space-y-8">
                <section>
                    <p className="text-lg text-[var(--text-secondary)] mb-6">
                        <code className="text-[var(--accent-violet)]">&lt;Activity&gt;</code> (formerly known as Offscreen) allows React to
                        render a component into the background without revealing it purely to the user. It can unmount the component visually
                        while keeping its state and DOM nodes alive.
                    </p>
                    <ActivityDemo />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="font-bold text-[var(--text-primary)] mb-2">Use Cases</h4>
                        <ul className="list-disc pl-4 space-y-2 text-sm text-[var(--text-secondary)]">
                            <li>Tab switching without losing scroll position or form state.</li>
                            <li>Pre-rendering next screens (e.g., eager loading routes).</li>
                            <li>Virtual lists (keeping off-screen rows alive).</li>
                        </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="font-bold text-[var(--text-primary)] mb-2">How it works</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                            When <code>mode=&quot;hidden&quot;</code>, React stops rendering updates to the component but keeps
                            the fiber tree in memory. It fires <code>useLayoutEffect</code> cleanup functions but preserves specific state.
                        </p>
                    </div>
                </section>
            </div>
        </HookPageLayout>
    );
}
