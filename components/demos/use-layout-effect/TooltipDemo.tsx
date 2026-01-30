'use client';

import { ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

export function TooltipDemo() {
    const [useLayout, setUseLayout] = useState(true);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between bg-[var(--bg-subtle)] p-4 rounded-lg border border-[var(--glass-border)]">
                <div>
                    <span className="text-sm font-bold block text-[var(--accent-cyan)]">Current Strategy:</span>
                    <span className="font-mono text-xs">{useLayout ? 'useLayoutEffect (Clean)' : 'useEffect (Glitchy)'}</span>
                </div>
                <button
                    onClick={() => setUseLayout(!useLayout)}
                    className="px-4 py-2 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-sm font-medium border border-[var(--accent-cyan)]/50 hover:bg-[var(--accent-cyan)]/30 transition-colors"
                >
                    Toggle Effect Type
                </button>
            </div>

            <div className="h-[300px] relative border border-[var(--glass-border)] rounded-xl bg-[var(--bg-deep)] overflow-hidden flex items-center justify-center">
                <p className="absolute top-4 left-4 text-xs text-[var(--text-muted)] pointer-events-none">
                    Hover randomly to see tooltip positioning.
                </p>

                <div className="flex gap-8">
                    <TooltipTarget useLayout={useLayout} label="Hover Me" />
                    <TooltipTarget useLayout={useLayout} label="Top" placement="top" />
                    <TooltipTarget useLayout={useLayout} label="Bottom" placement="bottom" />
                </div>
            </div>
        </div>
    );
}

function TooltipTarget({ useLayout, label, placement = 'top' }: { useLayout: boolean, label: string, placement?: 'top' | 'bottom' }) {
    const [hovered, setHovered] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="relative">
            <button
                ref={triggerRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="px-6 py-3 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:bg-[var(--glass-highlight)] transition-colors"
            >
                {label}
            </button>
            {hovered && (
                <Tooltip
                    triggerRef={triggerRef as RefObject<HTMLElement>}
                    useLayout={useLayout}
                    placement={placement}
                >
                    {useLayout ? 'Correct Position' : 'Flickering Position'}
                </Tooltip>
            )}
        </div>
    )
}

function Tooltip({ children, triggerRef, useLayout, placement }: { children: ReactNode, triggerRef: RefObject<HTMLElement>, useLayout: boolean, placement?: 'top' | 'bottom' }) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, top: 0, left: 0 });

    // The effect to use
    const useHook = useLayout ? useLayoutEffect : useEffect;

    useHook(() => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        if (!trigger || !tooltip) return;

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // Artificial slow calculation to exaggerate effect for demo
        // In real apps, this is just DOM painting delay
        const now = performance.now();
        while (performance.now() - now < 5) { /* BLOCK for 5ms */ }

        if (placement === 'top') {
            top = triggerRect.top - tooltipRect.height - 10;
        } else {
            top = triggerRect.bottom + 10;
        }

        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

        // Relative to the offset parent (which is the container in this case, but here we use fixed for demo simplicity or standard calculation)
        // Actually, since we are inside a relative container, we need to adjust or use fixed.
        // For this demo, let's assume we want to correct the position relative to the container.
        // We will simple render it slightly offset initially (via css default) and then correct it.

        setStyle({
            opacity: 1,
            top: top - trigger.parentElement!.getBoundingClientRect().top + (placement === 'top' ? -20 : 20), // Local logic simplified
            left: left - trigger.parentElement!.getBoundingClientRect().left
        });

    }, [useLayout, placement]);

    return (
        <div
            ref={tooltipRef}
            className="absolute px-3 py-1.5 rounded bg-[var(--accent-violet)] text-white text-xs font-bold whitespace-nowrap z-50 pointer-events-none"
            style={{
                // If using useLayoutEffect, the paint waits for the style update above.
                // If using useEffect, it paints at 0,0 first (flicker), then moves.
                ...style
            }}
        >
            {children}
        </div>
    )
}
