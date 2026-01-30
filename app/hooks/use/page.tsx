import { HookPageLayout } from '@/components/HookPageLayout';
import { UseApiDemo } from '@/components/demos/use-api/UseApiDemo';
import { Box, Code2 } from 'lucide-react';

export default function UseApiPage() {
    return (
        <HookPageLayout
            title="use"
            subtitle="The Universal Consumer"
            icon={Box}
            badges={['React 19', 'Stable', 'Async']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">use</code> is a new React API that lets you read the value of a resource
                        like a Promise or Context. Unlike standard hooks, it can be called within loops and conditional statements.
                    </p>
                </div>

                {/* Demo */}
                <UseApiDemo />

                {/* Usage Code */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                        <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                            Fetching Data
                        </div>
                        <pre className="p-4 text-xs font-mono text-[var(--text-primary)] overflow-x-auto">
                            {`// 1. Pass a Promise
function Message({ msgPromise }) {
  // 2. Suspends until resolved!
  const message = use(msgPromise);

  return <p>{message}</p>;
}`}
                        </pre>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                        <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                            Conditional Context
                        </div>
                        <pre className="p-4 text-xs font-mono text-[var(--text-primary)] overflow-x-auto">
                            {`function ThemeCard({ show }) {
  if (show) {
    // ✅ This works now!
    const theme = use(ThemeCtx);
    return <div className={theme} />;
  }
  return null;
}`}
                        </pre>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] flex items-start gap-3">
                    <Code2 className="text-[var(--accent-cyan)] mt-1" size={20} />
                    <div className="text-sm text-[var(--text-secondary)]">
                        <strong>Mental Model:</strong> Think of <code>use</code> as &quot;await&quot; for components, but instead of blocking the function, it &quot;suspends&quot; the component tree via Suspense.
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
