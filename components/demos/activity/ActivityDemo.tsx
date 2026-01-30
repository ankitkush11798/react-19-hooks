'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Activity as ActivityIcon, Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { Suspense, useState } from 'react';

// NOTE: <Activity> is the modern name for <Offscreen>.
// It allows React to keep a component's state and DOM alive while hiding it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Activity = (React as any).unstable_Activity;
// If not available in this React version, we fallback to conditional rendering for demo.

function HeavyComponent({ mode }: { mode: string }) {
    // Simulate expensive initialization
    return (
        <div className="p-4 rounded-lg bg-[var(--bg-deep)] border border-[var(--glass-border)] animate-in fade-in zoom-in duration-300">
            <h4 className="font-bold text-[var(--accent-cyan)] mb-2">Heavy Component ({mode})</h4>
            <div className="space-y-2">
                <div className="h-2 w-full bg-[var(--text-muted)]/20 rounded animate-pulse" />
                <div className="h-2 w-3/4 bg-[var(--text-muted)]/20 rounded animate-pulse" />
                <div className="h-2 w-1/2 bg-[var(--text-muted)]/20 rounded animate-pulse" />
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
                Input State: <input className="bg-transparent border-b border-[var(--text-muted)] outline-none w-20 text-white" placeholder="Type here..." />
            </p>
        </div>
    );
}

// Fallback if Activity is not available
type ActivityProps = { children: React.ReactNode; mode: 'visible' | 'hidden' };
const ActivityFallback = ({ children, mode }: ActivityProps) => (
    <div style={{ display: mode === 'visible' ? 'block' : 'none' }}>{children}</div>
);

export function ActivityDemo() {
    const [show, setShow] = useState(true);

    // Check if Activity is available in this React build
    const ActivityComponent = Activity || ActivityFallback;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <ActivityIcon className="text-[var(--accent-violet)]" />
                        &lt;Activity&gt; (Offscreen)
                    </h3>
                    <button
                        onClick={() => setShow(s => !s)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] transition-colors text-xs border border-[var(--glass-border)]"
                    >
                        {show ? <Eye className="text-emerald-400" size={14} /> : <EyeOff className="text-[var(--text-muted)]" size={14} />}
                        {show ? 'Visible' : 'Hidden'}
                    </button>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Unlike standard conditional rendering <code>{`{show && <Component />}`}</code> which destroys state,
                        <code>&lt;Activity&gt;</code> keeps the component <strong>alive but hidden</strong>.
                    </p>

                    <div className="h-48 relative border border-dashed border-[var(--glass-border)] rounded-lg p-4 flex items-center justify-center overflow-hidden">
                        <Suspense fallback={<div>Loading...</div>}>
                            <ActivityComponent mode={show ? 'visible' : 'hidden'}>
                                <HeavyComponent mode="Preserved" />
                            </ActivityComponent>
                        </Suspense>

                        {!show && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-deep)]/80 backdrop-blur-sm text-[var(--text-muted)] text-sm font-mono">
                                Component is Hidden (State Preserved)
                            </div>
                        )}
                    </div>

                    <div className="p-3 rounded bg-[var(--accent-violet)]/10 border border-[var(--accent-violet)]/20 text-xs text-violet-200">
                        <strong>Try this:</strong> Type in the input, hide the component, then show it again.
                        The text should remain! (Native behavior)
                    </div>
                </div>
            </GlassCard>

            <GlassCard>
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--glass-border)] pb-4">
                    <span className="text-[var(--text-muted)]">Comparison:</span>
                    <strong>Standard Unmount</strong>
                </div>

                <div className="space-y-4">
                    <div className="h-48 border border-dashed border-[var(--glass-border)] rounded-lg p-4 flex items-center justify-center">
                        {show ? (
                            <HeavyComponent mode="Reset" />
                        ) : (
                            <div className="text-[var(--text-muted)] text-sm font-mono">
                                Component Unmounted
                            </div>
                        )}
                    </div>
                    <div className="p-3 rounded bg-red-900/20 border border-red-500/20 text-xs text-red-300">
                        <strong>Try this:</strong> Type in the input, hide the component, then show it again.
                        The text disappears because the component was destroyed.
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
