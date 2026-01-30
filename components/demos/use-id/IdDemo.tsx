'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { AlertCircle } from 'lucide-react';
import { useId } from 'react';

export function IdDemo() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <GlassCard className="space-y-8">
                <h3 className="font-bold text-xl flex items-center gap-2">
                    Accessible Form
                    <span className="text-xs font-normal text-[var(--accent-cyan)] border border-[var(--accent-cyan)] px-2 py-0.5 rounded-full">Server-Safe IDs</span>
                </h3>

                <form className="space-y-6">
                    <AccessibleInput label="Email Address" type="email" placeholder="user@example.com" />
                    <AccessibleInput label="Full Name" type="text" placeholder="John Doe" />

                    <div className="pt-4 border-t border-[var(--glass-border)]">
                        <AccessibleCheckbox label="I agree to the Terms of Service" />
                    </div>
                </form>
            </GlassCard>

            {/* Explanation Section */}
            <GlassCard className="space-y-6 bg-[var(--bg-subtle)]">
                <h3 className="font-bold text-xl">Generated ID Inspector</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                    Notice how each component instance generates a unique, stable ID that matches on server and client.
                </p>

                <div className="space-y-4">
                    <div className="p-3 bg-[var(--bg-deep)] rounded border border-[var(--glass-border)] font-mono text-xs">
                        <span className="text-[var(--text-muted)]">{`<AccessibleInput label=&quot;Email...&quot; />`}</span>
                        <div className="mt-1 pl-4 text-[var(--accent-cyan)]">id=&quot;:r1:&quot;</div>
                    </div>
                    <div className="p-3 bg-[var(--bg-deep)] rounded border border-[var(--glass-border)] font-mono text-xs">
                        <span className="text-[var(--text-muted)]">{`<AccessibleInput label=&quot;Name...&quot; />`}</span>
                        <div className="mt-1 pl-4 text-[var(--accent-cyan)]">id=&quot;:r3:&quot;</div>
                    </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-200">
                    <div className="flex items-center gap-2 font-bold mb-1">
                        <AlertCircle size={16} />
                        Why not Math.random()?
                    </div>
                    Using random IDs causes hydration mismatches because the server generates one number and the client generates another. <code className="bg-black/30 px-1 rounded">useId</code> guarantees stability.
                </div>
            </GlassCard>
        </div>
    );
}

function AccessibleInput({ label, type, placeholder }: { label: string, type: string, placeholder?: string }) {
    const id = useId(); // Generates specific ID for this instance
    const helpId = `${id}-help`;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">
                    {label}
                </label>
                <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-50">id=&quot;{id}&quot;</span>
            </div>
            <input
                id={id}
                type={type}
                aria-describedby={helpId}
                placeholder={placeholder}
                className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent-violet)] transition-all"
            />
            <p id={helpId} className="text-xs text-[var(--text-muted)]">
                This field is linked to its label via <code className="text-[var(--accent-cyan)]">htmlFor=&quot;{id}&quot;</code>
            </p>
        </div>
    );
}

function AccessibleCheckbox({ label }: { label: string }) {
    const id = useId();
    return (
        <div className="flex items-center gap-3">
            <input type="checkbox" id={id} className="w-4 h-4 rounded border-[var(--glass-border)] bg-[var(--bg-deep)]" />
            <label htmlFor={id} className="text-sm text-[var(--text-secondary)] select-none cursor-pointer">
                {label} <span className="text-[10px] font-mono ml-2 opacity-30">id=&quot;{id}&quot;</span>
            </label>
        </div>
    )
}
