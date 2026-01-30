import { HookPageLayout } from '@/components/HookPageLayout';
import { DebugValueDemo } from '@/components/demos/use-debug-value/DebugValueDemo';
import { Bug, Tag } from 'lucide-react';

export default function UseDebugValuePage() {
    return (
        <HookPageLayout
            title="useDebugValue"
            subtitle="The DevTools Labeler"
            icon={Bug}
            badges={['Stable', 'DevTools', 'Debugging']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useDebugValue</code> is a developer-experience hook.
                        It adds a readable label to your custom hooks in React DevTools, making it easier to inspect
                        their internal state or status without diving into the implementation details.
                    </p>
                </div>

                {/* Demo */}
                <DebugValueDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        useOnlineStatus.ts
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  // ... event listeners ...

  // Show "Online" or "Offline" next to the hook name in DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}`}
                    </pre>
                </div>

                {/* Best Practices */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Tag size={16} className="text-[var(--accent-cyan)]" />
                            When to use
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            Use it in shared, reusable custom hooks where the internal state is complex or not immediately obvious (e.g. <code>useMedia</code>, <code>useDate</code>).
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Bug size={16} className="text-yellow-400" />
                            Performance
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            For expensive formatting (like parsing dates), pass a formatting function as the second argument. React will only call it when DevTools is actually open.
                        </p>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
