import { HookPageLayout } from '@/components/HookPageLayout';
import { NetworkStatusDemo } from '@/components/demos/use-sync-external-store/NetworkStatusDemo';
import { Database, Radio } from 'lucide-react';

export default function UseSyncExternalStorePage() {
    return (
        <HookPageLayout
            title="useSyncExternalStore"
            subtitle="The Hardware Link"
            icon={Radio}
            badges={['React 18', 'Stable', 'Library Authors']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useSyncExternalStore</code> is the safe way to read data
                        from external data sources (like global variables, browser APIs, or third-party libraries) while avoiding
                        tearing during concurrent rendering.
                    </p>
                </div>

                {/* Demo */}
                <NetworkStatusDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        store.ts
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`// 1. Snapshot Function (Read Data)
const getSnapshot = () => navigator.onLine;

// 2. Subscribe Function (Listen for Changes)
const subscribe = (callback) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 3. Subscription Hook
const isOnline = useSyncExternalStore(subscribe, getSnapshot);`}
                    </pre>
                </div>

                {/* Comparison Logic */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Database className="text-[var(--accent-cyan)]" />
                        Why not useEffect + useState?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/20 opacity-80">
                            <h4 className="font-bold text-red-300 mb-2">The Old Way (Effect)</h4>
                            <p className="text-sm text-[var(--text-muted)]">
                                Manually managing subscriptions in <code>useEffect</code> can lead to &quot;tearing&quot; (inconsistent UI)
                                if the external store updates <em>while</em> React is rendering a concurrent tree.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-900/10 border border-emerald-500/20">
                            <h4 className="font-bold text-emerald-300 mb-2">The New Way (uSES)</h4>
                            <p className="text-sm text-[var(--text-muted)]">
                                <code>useSyncExternalStore</code> enforces that updates to the store are synchronous and atomic,
                                pausing React rendering if necessary to ensure the UI always reflects the true external state.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
