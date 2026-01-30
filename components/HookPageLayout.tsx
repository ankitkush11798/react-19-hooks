import { GlassCard } from '@/components/ui/GlassCard';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HookPageLayoutProps {
    title: string;
    subtitle: string;
    icon?: LucideIcon;
    children: ReactNode;
    experimental?: boolean;
    badges?: string[];
}

export function HookPageLayout({ title, subtitle, icon: Icon, children, experimental, badges }: HookPageLayoutProps) {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative">
                <GlassCard className="relative overflow-hidden p-8 md:p-12 border-[var(--accent-cyan)]/20">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-cyan)]/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex items-start gap-6">
                        {Icon && (
                            <div className="p-4 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] shadow-xl">
                                <Icon size={48} className="text-[var(--accent-cyan)]" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    {title}
                                </h1>
                                {experimental && (
                                    <span className="px-3 py-1 text-xs font-semibold text-[var(--accent-violet)] bg-[var(--accent-violet)]/10 border border-[var(--accent-violet)]/20 rounded-full uppercase tracking-wider">
                                        Experimental
                                    </span>
                                )}
                                {badges && badges.map((badge) => (
                                    <span key={badge} className="px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-full">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-12 space-y-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
