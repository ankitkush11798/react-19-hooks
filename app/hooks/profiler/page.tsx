import { HookPageLayout } from '@/components/HookPageLayout';
import { ProfilerDemo } from '@/components/demos/profiler/ProfilerDemo';
import { Activity } from 'lucide-react';

export default function ProfilerPage() {
    return (
        <HookPageLayout
            title="<Profiler>"
            subtitle="The Performance Watchdog"
            icon={Activity}
            badges={['Stable', 'Performance', 'Dev Tools']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        The <code className="text-[var(--accent-violet)]">&lt;Profiler&gt;</code> component measures
                        the &quot;cost&quot; of rendering a part of your React tree. It gives you programmatic access to the same data
                        displayed in the React DevTools Profiler tab.
                    </p>
                </div>

                {/* Demo */}
                <ProfilerDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        app.tsx
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Log performance metrics to your analytics service
  sendToAnalytics({ id, phase, duration: actualDuration });
}

<Profiler id="Sidebar" onRender={onRender}>
  <Sidebar />
</Profiler>`}
                    </pre>
                </div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                    <MetricCard
                        label="actualDuration"
                        desc="Time spent rendering the Profiler and its descendants."
                        color="var(--accent-cyan)"
                    />
                    <MetricCard
                        label="baseDuration"
                        desc="Estimated time to render the entire subtree without memoization."
                        color="var(--accent-violet)"
                    />
                    <MetricCard
                        label="phase"
                        desc="'mount' (first render) or 'update' (subsequent renders)."
                        color="emerald-400"
                    />
                </div>
            </div>
        </HookPageLayout>
    );
}

function MetricCard({ label, desc, color }: { label: string, desc: string, color: string }) {
    return (
        <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
            <h4 className="font-mono font-bold text-sm mb-2" style={{ color }}>{label}</h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {desc}
            </p>
        </div>
    )
}
