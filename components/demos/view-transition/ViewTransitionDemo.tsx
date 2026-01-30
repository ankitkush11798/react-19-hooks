'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { flushSync } from 'react-dom';

// Note: React 19 might have built-in support, but currently we generally wrap startViewTransition
// "unstable_ViewTransition" might exist or we use the browser API directly wrapped in React logic.

export function ViewTransitionDemo() {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const items = [
        { id: 1, color: 'bg-emerald-400', title: 'Forest' },
        { id: 2, color: 'bg-blue-400', title: 'Ocean' },
        { id: 3, color: 'bg-purple-400', title: 'Cosmos' },
    ];

    const toggleView = () => {
        if (!document.startViewTransition) {
            setView(v => v === 'grid' ? 'list' : 'grid');
            return;
        }

        // Use flushSync to ensure DOM updates happen strictly within the transition callback
        document.startViewTransition(() => {
            flushSync(() => {
                setView(v => v === 'grid' ? 'list' : 'grid');
            });
        });
    };

    return (
        <div className="space-y-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Layers className="text-[var(--accent-pink)]" />
                        Layout Transitions
                    </h3>
                    <button
                        onClick={toggleView}
                        className="px-4 py-2 rounded-lg bg-[var(--accent-violet)] text-white text-xs font-bold hover:bg-[var(--accent-violet)]/80 transition-colors"
                    >
                        Toggle Layout
                    </button>
                </div>

                <div className={view === 'grid' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            style={{ viewTransitionName: `card-${item.id}` } as React.CSSProperties}
                            className={`
                                p-4 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-deep)]
                                ${view === 'list' ? 'flex items-center gap-4' : 'aspect-square flex flex-col items-center justify-center'}
                            `}
                        >
                            <div
                                className={`rounded-full ${item.color} ${view === 'list' ? 'w-10 h-10' : 'w-16 h-16 mb-2'}`}
                                style={{ viewTransitionName: `icon-${item.id}` } as React.CSSProperties}
                            />
                            <span className="font-bold text-[var(--text-primary)]">{item.title}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>

            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/20 text-sm text-blue-200">
                <strong className="block mb-2 flex items-center gap-2"><Sparkles size={16} /> Browser Support Required</strong>
                This demo uses the native <code>document.startViewTransition</code> API. If you don&apos;t see smooth morphing animations,
                your browser might not support it yet (Try Chrome 111+).
            </div>
        </div>
    );
}
