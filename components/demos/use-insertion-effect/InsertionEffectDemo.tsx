'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Layers, Palette } from 'lucide-react';
import { useInsertionEffect, useState } from 'react';

// --- Mini CSS-in-JS Engine ---
// In a real library like styled-components or emotion, this would be much more complex.
// useInsertionEffect is SPECIFICALLY tied to this use case.

function useCSS(rule: string) {
    useInsertionEffect(() => {
        // This runs BEFORE all DOM mutations (React updates)
        // Perfect for injecting critical CSS so the new elements are styled *immediately*
        const style = document.createElement('style');
        style.innerHTML = rule;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [rule]);
}

export function InsertionEffectDemo() {
    const [color, setColor] = useState('hotpink');


    // Generate a unique class name and style rule based on state
    const className = `box-${color.replace('#', '')}`;
    const rule = `
        .${className} {
            background-color: ${color};
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            transition: all 0.5s ease;
            box-shadow: 0 0 20px ${color}40;
            font-weight: bold;
            text-align: center;
        }
    `;

    // Inject the styles synchronously before layout effects
    useCSS(rule);

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <h3 className="font-bold flex items-center gap-2 border-b border-[var(--glass-border)] pb-4">
                    <Palette className="text-[var(--accent-cyan)]" />
                    Dynamic Texture Generator
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-[var(--text-secondary)] mb-2 block">Choose Base Color</label>
                        <div className="flex gap-2">
                            {['hotpink', '#8B5CF6', '#10B981', '#F59E0B'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className="w-8 h-8 rounded-full border-2 border-[var(--glass-border)] hover:scale-110 transition-transform"
                                    style={{ backgroundColor: c, borderColor: color === c ? 'white' : 'transparent' }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded font-mono text-xs overflow-x-auto text-[var(--accent-violet)]">
                        {`/* Injected into <head> */`}
                        <pre className="text-[var(--text-muted)] mt-2">
                            {rule}
                        </pre>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="flex items-center justify-center bg-black/40">
                {/* The element using the dynamic class */}
                <div className={className}>
                    <Layers size={32} className="mb-2 mx-auto" />
                    I am styled at runtime!
                </div>
            </GlassCard>
        </div>
    );
}
