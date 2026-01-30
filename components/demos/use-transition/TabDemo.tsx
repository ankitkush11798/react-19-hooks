'use client';

import clsx from 'clsx';
import { memo, ReactNode, useState, useTransition } from 'react';

export function TabDemo() {
    const [tab, setTab] = useState('about');
    const [isPending, startTransition] = useTransition();

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab);
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b border-[var(--glass-border)] pb-1">
                <TabButton
                    isActive={tab === 'about'}
                    onClick={() => selectTab('about')}
                >
                    About
                </TabButton>
                <TabButton
                    isActive={tab === 'posts'}
                    onClick={() => selectTab('posts')}
                >
                    Posts (Slow)
                </TabButton>
                <TabButton
                    isActive={tab === 'contact'}
                    onClick={() => selectTab('contact')}
                >
                    Contact
                </TabButton>
            </div>

            <div className="relative min-h-[200px]">
                {isPending && (
                    <div className="absolute top-2 right-2 flex items-center gap-2 text-[var(--accent-cyan)] text-xs font-mono animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-current" />
                        RENDERING_TRANSITION...
                    </div>
                )}

                <div className={clsx("transition-opacity duration-200", isPending ? "opacity-30" : "opacity-100")}>
                    {tab === 'about' && <AboutTab />}
                    {tab === 'posts' && <PostsTab />}
                    {tab === 'contact' && <ContactTab />}
                </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-[var(--bg-deep)] border border-[var(--glass-border)] text-sm text-[var(--text-secondary)]">
                <p className="font-mono text-xs text-[var(--accent-violet)] mb-2">How it works:</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Tab selection updates immediately (High Priority).</li>
                    <li>Content rendering happens in the background (Low Priority).</li>
                    <li>The UI remains responsive even while &quot;Posts&quot; is calculating.</li>
                    <li>Try clicking &quot;Contact&quot; immediately after &quot;Posts&quot; to see interruptions!</li>
                </ul>
            </div>
        </div>
    );
}

function TabButton({ children, isActive, onClick }: { children: ReactNode, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                isActive ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            )}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]" />
            )}
        </button>
    );
}

function AboutTab() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold">Welcome to React Observatory</h3>
            <p>This demo illustrates how concurrent features allow React to interrupt heavy rendering tasks to keep the interface responsive.</p>
        </div>
    );
}

const PostsTab = memo(function PostsTab() {
    // Artificially slow down rendering
    // eslint-disable-next-line react-hooks/purity
    const startTime = performance.now();
    // eslint-disable-next-line react-hooks/purity
    while (performance.now() - startTime < 400) {
        // Do nothing for 400ms per render to simulate heavy load
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold">Heavy Posts Feed</h3>
            <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <li key={i} className="p-3 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        Post #{i + 1} (Rendered at {new Date().toLocaleTimeString()})
                    </li>
                ))}
            </ul>
        </div>
    );
});

function ContactTab() {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p>Send a signal through the void.</p>
        </div>
    );
}
