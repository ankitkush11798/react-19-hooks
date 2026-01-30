import { HookPageLayout } from '@/components/HookPageLayout';
import { EffectEventDemo } from '@/components/demos/use-effect-event/EffectEventDemo';
import { Anchor, Zap } from 'lucide-react';

export default function UseEffectEventPage() {
    return (
        <HookPageLayout
            title="useEffectEvent"
            subtitle="The Chain Breaker"
            icon={Anchor}
            badges={['Experimental', 'Canary', 'Stable Future']}
            experimental={true}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useEffectEvent</code> solves a classic React problem:
                        accessing the latest props/state inside `useEffect` <em>without</em> adding them to the dependency array.
                    </p>
                    <p className="text-sm bg-yellow-900/20 text-yellow-200 p-3 rounded border border-yellow-500/30">
                        <strong>Note:</strong> This hook is currently experimental. The demo below uses a polyfill implementation
                        to demonstrate the behavior and benefits that will be native in future React versions.
                    </p>
                </div>

                {/* Demo */}
                <EffectEventDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        example.tsx
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`function ChatRoom({ roomId, theme }) {
  // 1. Create a stable event handler
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme); // Reads latest 'theme'
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    // 2. Call it safely
    onConnected();

    return () => connection.disconnect();

    // 3. 'theme' is NOT needed here! Connection stays alive when theme changes.
  }, [roomId]);
}`}
                    </pre>
                </div>

                {/* Why it matters */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Zap size={16} className="text-red-400" />
                            Problem
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            Normally, if you use a value inside `useEffect`, you MUST add it to dependencies.
                            This often causes unwanted re-executions (e.g., reconnecting to a socket just because a user toggled dark mode).
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Anchor size={16} className="text-emerald-400" />
                            Solution
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            `useEffectEvent` creates a stable function identity. You can call it from your effect,
                            and it will always access the <em>latest</em> props/state, without needing to be a dependency.
                        </p>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
