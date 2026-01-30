'use client';

import { CheckCircle2 } from 'lucide-react';

export function TaintClientDemo({ safeData }: { safeData: { name: string, id: string } }) {
    return (
        <div className="p-4 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    Client Component
                </div>
            </div>

            <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-[var(--text-secondary)]">Name:</span>
                    <span className="text-[var(--text-primary)]">{safeData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-[var(--text-secondary)]">ID:</span>
                    <span className="text-[var(--text-primary)]">{safeData.id}</span>
                </div>
            </div>

            <div className="mt-4 p-2 rounded bg-yellow-900/20 border border-yellow-500/20 text-[10px] text-yellow-200">
                If the server tried to pass <code>creditCard</code> here, the build/render would fail instantly.
            </div>
        </div>
    );
}
