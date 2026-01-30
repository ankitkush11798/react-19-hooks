import { HookPageLayout } from '@/components/HookPageLayout';
import { VideoPlayerDemo } from '@/components/demos/use-imperative-handle/VideoPlayerDemo';
import { Gamepad2, ShieldAlert } from 'lucide-react';

export default function UseImperativeHandlePage() {
    return (
        <HookPageLayout
            title="useImperativeHandle"
            subtitle="The Custom Interface"
            icon={Gamepad2}
            badges={['Stable', 'Advanced', 'Refs']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useImperativeHandle</code> allows you to customize the instance value
                        that is exposed to parent components when using <code>ref</code>. Instead of exposing the raw DOM node,
                        you can expose a limited, safe set of imperative methods (an API).
                    </p>
                </div>

                {/* Demo */}
                <VideoPlayerDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        CustomInput.tsx
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    shake: () => {
      // Trigger animation logic
      inputRef.current.classList.add('shake');
    }
  }));

  return <input ref={inputRef} />;
});`}
                    </pre>
                </div>

                {/* Best Practices */}
                <div className="p-4 rounded-lg bg-orange-900/10 border border-orange-500/20 flex items-start gap-3">
                    <ShieldAlert className="text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-orange-300 mb-1">Use Sparingly</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            In 95% of cases, you should use props (declarative) instead of refs (imperative).
                            This hook is useful for imperative behaviors like scrolling, focusing, or triggering media playback/animations
                            that don&apos;t map cleanly to state.
                        </p>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
