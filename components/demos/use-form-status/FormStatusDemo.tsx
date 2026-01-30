'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

// NOTE: useFormStatus must be used in a component that is a child of a <form>
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-lg bg-[var(--accent-violet)] text-white font-bold hover:bg-[var(--accent-violet)]/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95 transition-all"
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                </>
            ) : (
                <>
                    <Send size={18} />
                    Transmit Data
                </>
            )}
        </button>
    );
}

function StatusInfo() {
    const { pending, data } = useFormStatus();

    if (!pending && !data) return null;

    return (
        <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">Live Form Status</h4>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Pending State:</span>
                    <span className={pending ? "text-orange-400 font-bold" : "text-emerald-400"}>
                        {pending ? "TRUE" : "FALSE"}
                    </span>
                </div>
                {data && (
                    <div className="flex justify-between items-start">
                        <div className="text-[var(--text-muted)]">{/* Server Side Code */}</div>
                        <code className="text-[var(--accent-cyan)] text-[10px] text-right ml-4">
                            {JSON.stringify(Object.fromEntries(data.entries()))}
                        </code>
                    </div>
                )}
            </div>
        </div>
    );
}

export function FormStatusDemo() {
    const [success, setSuccess] = useState(false);

    async function handleAction() {
        setSuccess(false);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSuccess(true);
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Send className="text-[var(--accent-violet)]" size={20} />
                        Mission Command Form
                    </h3>
                </div>

                <form action={handleAction} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-[var(--text-muted)] font-medium">COORDINATES</label>
                        <input
                            name="coords"
                            defaultValue="NEBULA-9"
                            className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent-cyan)] transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-[var(--text-muted)] font-medium">MESSAGE</label>
                        <textarea
                            name="message"
                            placeholder="Enter transmission..."
                            className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-sm h-24 focus:outline-none focus:border-[var(--accent-cyan)] transition-colors resize-none"
                        />
                    </div>

                    <SubmitButton />
                    <StatusInfo />
                </form>

                {success && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm justify-center animate-in zoom-in duration-300">
                        <CheckCircle2 size={16} />
                        Transmission Successful
                    </div>
                )}
            </GlassCard>

            <div className="space-y-6">
                <GlassCard className="bg-blue-500/5">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <Send className="text-blue-400" size={16} />
                        Component Structure
                    </h4>
                    <div className="p-4 rounded bg-black/40 font-mono text-[11px] leading-relaxed">
                        <div className="text-pink-400">&lt;form action={'{'}action{'}'}&gt;</div>
                        <div className="pl-4 text-blue-400">&lt;SubmitButton /&gt; </div>
                        <div className="pl-8 text-gray-500">{"// useFormStatus() works here"}</div>
                        <div className="pl-4 text-pink-400">&lt;/form&gt;</div>
                    </div>
                </GlassCard>

                <div className="p-4 rounded-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] space-y-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)]">Key Features</h4>
                    <ul className="space-y-2">
                        <li className="flex gap-2 text-xs text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)] mt-1 shrink-0" />
                            Eliminates the need for manual <code>loading</code> state in buttons.
                        </li>
                        <li className="flex gap-2 text-xs text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)] mt-1 shrink-0" />
                            Provides access to <code>FormData</code> while the action is pending.
                        </li>
                        <li className="flex gap-2 text-xs text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)] mt-1 shrink-0" />
                            Child components can deeply react to form state without prop drilling.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
