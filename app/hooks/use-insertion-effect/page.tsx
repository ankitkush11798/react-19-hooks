import { HookPageLayout } from '@/components/HookPageLayout';
import { InsertionEffectDemo } from '@/components/demos/use-insertion-effect/InsertionEffectDemo';
import { FileCode2, Layers } from 'lucide-react';

export default function UseInsertionEffectPage() {
    return (
        <HookPageLayout
            title="useInsertionEffect"
            subtitle="The Style Injector"
            icon={FileCode2}
            badges={['React 18', 'Library Authors', 'CSS-in-JS']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useInsertionEffect</code> is a specialized hook for CSS-in-JS library authors.
                        It runs <em>synchronously</em> before any DOM mutations (even before <code>useLayoutEffect</code>), allowing you to inject
                        <code>&lt;style&gt;</code> tags into the document head before React calculates layout, preventing styling issues.
                    </p>
                </div>

                {/* Demo */}
                <InsertionEffectDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        css-in-js-engine.ts
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`function useCSS(rule) {
  useInsertionEffect(() => {
    // 1. Create style tag
    const style = document.createElement('style');
    style.innerHTML = rule;

    // 2. Inject BEFORE layout calculation
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, [rule]);
}`}
                    </pre>
                </div>

                {/* Timeline Visualization */}
                <div className="p-6 rounded-xl bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-[var(--accent-violet)]" />
                        Rentering Timeline
                    </h4>
                    <div className="relative pt-6 pb-2">
                        {/* Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--glass-border)] -translate-y-1/2" />

                        <div className="flex justify-between relative z-10 text-xs text-center font-mono">
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                                <span className="text-emerald-300 font-bold">State Change</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-[var(--accent-violet)] ring-4 ring-black" />
                                <span className="text-[var(--accent-violet)] font-bold bg-black/50 px-2 py-1 rounded">useInsertionEffect</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-[var(--text-muted)]" />
                                <span>DOM Mutation</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-[var(--text-muted)]" />
                                <span>useLayoutEffect</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-[var(--text-muted)]" />
                                <span>Paint</span>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-[var(--text-muted)]" />
                                <span>useEffect</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
