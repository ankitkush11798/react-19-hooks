'use client';

import { ViewTransitionDemo } from '@/components/demos/view-transition/ViewTransitionDemo';
import { HookPageLayout } from '@/components/HookPageLayout';
import { Layers } from 'lucide-react';

export default function ViewTransitionPage() {
    return (
        <HookPageLayout
            title="View Transitions"
            subtitle="Native DOM Morphing"
            icon={Layers}
            badges={['Browser API', 'Visual', 'Zero-Config']}
        >
            <div className="space-y-8">
                <section>
                    <p className="text-lg text-[var(--text-secondary)] mb-6">
                        While not strictly a React Component yet, React 19 integrates tightly with the
                        <code className="text-[var(--accent-pink)]"> View Transitions API</code>.
                        By wrapping state updates in <code>startViewTransition</code> (often auto-wrapped by frameworks),
                        you get native, high-performance DOM morphing.
                    </p>
                    <ViewTransitionDemo />
                </section>
            </div>
        </HookPageLayout>
    );
}
