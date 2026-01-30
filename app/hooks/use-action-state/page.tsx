import { HookPageLayout } from '@/components/HookPageLayout';
import { FormDemo } from '@/components/demos/use-action-state/FormDemo';
import { Info, Workflow } from 'lucide-react';

export default function UseActionStatePage() {
    return (
        <HookPageLayout
            title="useActionState"
            subtitle="The Form Orchestrator"
            icon={Workflow}
            badges={['React 19', 'Stable', 'Forms']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useActionState</code> (formerly <code>useFormState</code>)
                        streamlines form submissions by automatically tracking execution status, handling results, and managing errors—all without manual <code>useState</code> or <code>useEffect</code> wiring.
                    </p>
                </div>

                {/* Main Demo */}
                <FormDemo />

                {/* Concept Visualizer */}
                <div className="grid md:grid-cols-3 gap-4">
                    <StatusCard
                        step="1"
                        title="Invocation"
                        desc="User submits form. React intercepts the action."
                        color="var(--accent-cyan)"
                    />
                    <StatusCard
                        step="2"
                        title="Pending State"
                        desc="React automatically sets `isPending` to true during async work."
                        color="var(--accent-violet)"
                    />
                    <StatusCard
                        step="3"
                        title="State Update"
                        desc="Returns the new state payload when action completes."
                        color="var(--accent-success)"
                    />
                </div>

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        example.tsx
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`const [state, formAction, isPending] = useActionState(serverAction, initialState);

return (
  <form action={formAction}>
    <input name="email" />
    <button disabled={isPending}>
      {isPending ? "Submitting..." : "Join"}
    </button>
    {state.error && <p className="error">{state.error}</p>}
  </form>
);`}
                    </pre>
                </div>

                {/* Note Alert */}
                <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] flex items-start gap-3">
                    <Info className="text-[var(--accent-cyan)] mt-1" size={20} />
                    <div className="text-sm text-[var(--text-secondary)]">
                        <strong>Evolution Node:</strong> This hook replaces the common pattern of manually creating <code>isLoading</code>, <code>error</code>, and <code>data</code> states for every single form in your application. It integrates deeply with Server Actions.
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}

function StatusCard({ step, title, desc, color }: { step: string, title: string, desc: string, color: string }) {
    return (
        <div className="p-6 rounded-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] relative overflow-hidden group hover:bg-[var(--glass-highlight)] transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black" style={{ color }}>
                {step}
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-4" style={{ backgroundColor: `${color}20`, color: color }}>
                {step}
            </div>
            <h4 className="font-bold text-[var(--text-primary)] mb-2">{title}</h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
        </div>
    )
}
