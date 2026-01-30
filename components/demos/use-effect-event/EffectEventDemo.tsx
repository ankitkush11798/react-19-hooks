'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// --- Polyfill / Simulation ---
// Since useEffectEvent is experimental/canary, we simulate it here to demonstrate the behavior.
// This pattern allows 'onEvent' to be called from useEffect without invalidating the effect.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useEffectEventImpl<T extends (...args: any[]) => any>(fn: T) {
    const ref = useRef(fn);

    // In a real implementation this would be useInsertionEffect
    // We update the ref synchronously
    useEffect(() => {
        ref.current = fn;
    }, [fn]);

    return useCallback((...args: unknown[]) => {
        return ref.current(...args);
    }, []) as T;
}

// Rename for the demo clarity
const useEffectEvent = useEffectEventImpl;

function ChatRoom({ roomId, onReceiveMessage }: { roomId: string, onReceiveMessage: (msg: string) => void }) {
    // We want to call onReceiveMessage when a message arrives.
    // However, onReceiveMessage is NOT stable (it changes on every render of parent).
    // If we put it in useEffect dep array, the connection re-connects on every keystroke in parent!

    // SOLUTION: Wrap it in useEffectEvent
    // This function is STABLE and can be read inside useEffect,
    // but it always "sees" the latest props/state.
    const onMessage = useEffectEvent(onReceiveMessage);

    useEffect(() => {
        console.log(`[${roomId}] Connecting...`);

        // Simulating a subscription
        const timer = setInterval(() => {
            if (Math.random() > 0.7) {
                const msgs = ["Hello!", "How are you?", "React is cool", "New notification"];
                const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
                onMessage(randomMsg);
            }
        }, 2000);

        return () => {
            console.log(`[${roomId}] Disconnecting...`);
            clearInterval(timer);
        }
        // KEY: onMessage is NOT in dependencies!
        // We only reconnect when roomId changes.
    }, [roomId]);

    return (
        <div className="p-4 rounded border border-[var(--glass-border)] bg-black/20 text-xs font-mono text-[var(--accent-cyan)]">
            <div>STATUS: PRESENCE_ACTIVE</div>
            <div>ROOM_ID: {roomId}</div>
        </div>
    );
}

export function EffectEventDemo() {
    const [roomId, setRoomId] = useState('general');
    const [isDarkTheme, setIsDarkTheme] = useState(true); // State that changes often
    const [notifications, setNotifications] = useState<string[]>([]);

    // This function is RE-CREATED on every render because `isDarkTheme` changes.
    // If we passed this directly to useEffect, the chat would reconnect on every theme toggle!
    const handleMessage = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const themeLabel = isDarkTheme ? '(Dark Mode)' : '(Light Mode)';
        setNotifications(prev => [`[${timestamp}] ${msg} ${themeLabel}`, ...prev].slice(0, 5));
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <MessageSquare className="text-[var(--accent-violet)]" />
                        Chat Settings
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">Room Selection</label>
                        <select
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-md px-4 py-2"
                        >
                            <option value="general">#general</option>
                            <option value="random">#random</option>
                            <option value="engineering">#engineering</option>
                        </select>
                        <p className="text-xs text-[var(--text-muted)]">
                            Changing room causes re-connection (Expected).
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">Theme Toggle (Unrelated State)</label>
                        <button
                            onClick={() => setIsDarkTheme(!isDarkTheme)}
                            className={clsx(
                                "w-full py-2 rounded-md font-bold transition-colors flex items-center justify-center gap-2",
                                isDarkTheme
                                    ? "bg-slate-800 text-white border border-slate-700"
                                    : "bg-slate-200 text-slate-900 border border-slate-300"
                            )}
                        >
                            {isDarkTheme ? "Dark Mode Active" : "Light Mode Active"}
                        </button>
                        <p className="text-xs text-[var(--text-muted)]">
                            Toggling this updates top-level state used in the callback.
                            <strong> Without useEffectEvent, this would force a reconnect!</strong>
                        </p>
                    </div>
                </div>

                <ChatRoom roomId={roomId} onReceiveMessage={handleMessage} />
            </GlassCard>

            <GlassCard className="h-[400px] flex flex-col">
                <h3 className="font-bold border-b border-[var(--glass-border)] pb-4 mb-4 flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-[10px] bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] px-2 py-1 rounded">
                        Stable Connection
                    </span>
                </h3>

                <div className="flex-1 overflow-y-auto space-y-2">
                    <AnimatePresence initial={false}>
                        {notifications.length === 0 ? (
                            <div className="text-center text-[var(--text-muted)] mt-10 text-sm">
                                Waiting for messages...
                            </div>
                        ) : (
                            notifications.map((note, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs font-mono"
                                >
                                    {note}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </GlassCard>
        </div>
    );
}
