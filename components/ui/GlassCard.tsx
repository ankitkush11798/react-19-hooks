import clsx from 'clsx';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
    return (
        <div
            className={clsx(
                'glass-panel rounded-xl p-6 transition-all duration-300',
                hoverEffect && 'hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] hover:shadow-lg hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    );
}
