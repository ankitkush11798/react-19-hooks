'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Activity, Anchor, Box, Bug, Clock, Cpu, Eye, FileCode2, Key, Layers, LayoutTemplate, Orbit, Send, Share2, Zap } from 'lucide-react'; // Icons
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTIONS = [
    {
        title: 'Core Hooks',
        items: [
            { name: 'useTransition', href: '/hooks/use-transition', icon: Zap },
            { name: 'useDeferredValue', href: '/hooks/use-deferred-value', icon: Clock },
            { name: 'useId', href: '/hooks/use-id', icon: Key },
            { name: 'useLayoutEffect', href: '/hooks/use-layout-effect', icon: LayoutTemplate },
        ]
    },
    {
        title: 'Advanced Hooks',
        items: [
            { name: 'useActionState', href: '/hooks/use-action-state', icon: Activity },
            { name: 'useFormStatus', href: '/hooks/use-form-status', icon: Send },
            { name: 'useOptimistic', href: '/hooks/use-optimistic', icon: Eye }, // Crystal ball approx
            { name: 'useSyncExternalStore', href: '/hooks/use-sync-external-store', icon: Share2 },
            { name: 'useImperativeHandle', href: '/hooks/use-imperative-handle', icon: Box },
        ]
    },
    {
        title: 'Specialized & Experimental',
        items: [
            { name: 'useDebugValue', href: '/hooks/use-debug-value', icon: Bug },
            { name: 'useEffectEvent', href: '/hooks/use-effect-event', icon: Anchor },
            { name: 'useInsertionEffect', href: '/hooks/use-insertion-effect', icon: FileCode2 },
            { name: 'use (API)', href: '/hooks/use', icon: Box },
        ]
    },
    {
        title: 'Components',
        items: [
            { name: '<Activity>', href: '/components/activity', icon: Activity },
            { name: '<ViewTransition>', href: '/components/view-transition', icon: Layers },
            { name: '<Profiler>', href: '/hooks/profiler', icon: Cpu },
        ]
    },
    {
        title: 'APIs',
        items: [
            { name: 'Taint APIs', href: '/apis/taint', icon: FileCode2 },
        ]
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-r-[var(--glass-border)] flex flex-col overflow-y-auto z-50">
            <div className="p-6 border-b border-[var(--glass-border)]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-[rgba(0,212,255,0.1)] group-hover:bg-[rgba(0,212,255,0.2)] transition-colors">
                        <Orbit className="w-6 h-6 text-[var(--accent-cyan)] animate-spin-slow" />
                    </div>
                    <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)]">
                        React Observatory
                    </span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 space-y-8">
                {SECTIONS.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 px-2">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <li key={item.href}>
                                        <Link href={item.href} className="block relative">
                                            {isActive && (
                                                <motion.div
                                                    layoutId="sidebar-active"
                                                    className="absolute inset-0 bg-[rgba(139,92,246,0.15)] rounded-lg"
                                                    initial={false}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <div className={clsx(
                                                "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                                                isActive ? "text-[var(--accent-cyan)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.03)]"
                                            )}>
                                                <Icon size={18} />
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </nav>
    );
}
