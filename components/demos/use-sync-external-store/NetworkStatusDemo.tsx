'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Globe, Monitor, Smartphone, Tablet, Wifi, WifiOff } from 'lucide-react';
import { useSyncExternalStore } from 'react';

// --- External Store 1: Network Status ---
function getNetworkSnapshot() {
    return navigator.onLine;
}

function subscribeToNetwork(callback: () => void) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}



// We need to equality check or return primitive for stability,
// strictly speaking getSnapshot should return the same object if unchanged.
// For this demo simplify by just returning JSON string to ensure primitive comparison safety
// or handle object immutability carefully. Let's use JSON string for demo simplicity.
function getWindowSnapshotString() {
    return JSON.stringify({ w: window.innerWidth, h: window.innerHeight });
}

function subscribeToWindow(callback: () => void) {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
}

export function NetworkStatusDemo() {
    // 1. Subscribe to Network
    const isOnline = useSyncExternalStore(subscribeToNetwork, getNetworkSnapshot, () => true);

    // 2. Subscribe to Window (using string snapshot to avoid infinite loops with object identity)
    const dimString = useSyncExternalStore(subscribeToWindow, getWindowSnapshotString, () => JSON.stringify({ w: 1024, h: 768 }));
    const { w, h } = JSON.parse(dimString);

    const getDeviceType = (width: number) => {
        if (width < 640) return 'Mobile';
        if (width < 1024) return 'Tablet';
        return 'Desktop';
    };

    const device = getDeviceType(w);

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Connectivity Card */}
            <GlassCard className={clsx(
                "flex flex-col items-center justify-center min-h-[250px] transition-colors duration-500",
                isOnline ? "bg-emerald-900/10 border-emerald-500/20" : "bg-red-900/10 border-red-500/20"
            )}>
                <motion.div
                    animate={{ scale: isOnline ? 1 : [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className={clsx(
                        "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                        isOnline ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]" : "bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                    )}
                >
                    {isOnline ? <Wifi size={40} /> : <WifiOff size={40} />}
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">
                    {isOnline ? "System Online" : "Connection Lost"}
                </h3>
                <p className={clsx("text-sm", isOnline ? "text-emerald-300" : "text-red-300")}>
                    {isOnline ? "Subscribed to navigator.onLine (True)" : "Subscribed to navigator.onLine (False)"}
                </p>
                <p className="mt-4 text-xs text-[var(--text-muted)] text-center max-w-[200px]">
                    Try disabling your network connection (Airplane Mode) to see this update instantly.
                </p>
            </GlassCard>

            {/* Viewport Monitor Card */}
            <GlassCard className="flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <Monitor className="text-[var(--accent-cyan)]" />
                        Viewport External Store
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded bg-[var(--bg-deep)] border border-[var(--glass-border)]">
                            <div className="text-[var(--text-muted)] text-xs mb-1">WIDTH</div>
                            <div className="text-2xl font-mono text-[var(--accent-violet)]">{w}px</div>
                        </div>
                        <div className="p-4 rounded bg-[var(--bg-deep)] border border-[var(--glass-border)]">
                            <div className="text-[var(--text-muted)] text-xs mb-1">HEIGHT</div>
                            <div className="text-2xl font-mono text-[var(--accent-violet)]">{h}px</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] flex items-center justify-between">
                    <div>
                        <div className="text-xs text-[var(--text-muted)]">DETECTED DEVICE</div>
                        <div className="font-bold text-lg">{device}</div>
                    </div>
                    <div className="text-[var(--accent-cyan)]">
                        {device === 'Mobile' && <Smartphone size={32} />}
                        {device === 'Tablet' && <Tablet size={32} />}
                        {device === 'Desktop' && <Globe size={32} />}
                    </div>
                </div>

                <div className="mt-4 text-xs text-[var(--text-muted)] text-center">
                    Resize your browser window to trigger the external store update.
                </div>
            </GlassCard>
        </div>
    );
}
