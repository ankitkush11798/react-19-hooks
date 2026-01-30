'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Rocket, XCircle } from 'lucide-react';
import { useActionState } from 'react';

// Simulated Server Action (in a real app this would be in a distinct file "use server")
async function submitMission(prevState: unknown, formData: FormData) {
    // Artificial delay to simulate server processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const missionName = formData.get('missionName');

    if (!missionName || missionName.toString().length < 3) {
        return {
            success: false,
            message: "Mission name too short (min 3 chars)",
            timestamp: Date.now()
        };
    }

    if (missionName.toString().toLowerCase().includes('error')) {
        return {
            success: false,
            message: "System Failure: Restricted Keyword Detected",
            timestamp: Date.now()
        };
    }

    return {
        success: true,
        message: `Mission "${missionName}" launched successfully!`,
        timestamp: Date.now()
    };
}

export function FormDemo() {
    // NOTE: In React 19 / Next.js 15, this is useActionState.
    // For older versions use useFormState. We'll use the variable name that matches the hook.
    // If useActionState is not available in your version, import useFormState from 'react-dom'.
    const [state, formAction, isPending] = useActionState(submitMission, { success: false, message: '', timestamp: 0 });

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[var(--glass-border)] pb-4">
                    <Rocket className="text-[var(--accent-violet)]" />
                    <h3 className="font-bold text-xl">Mission Control</h3>
                </div>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="missionName" className="text-sm font-medium text-[var(--text-secondary)]">
                            Operation Name
                        </label>
                        <input
                            type="text"
                            name="missionName"
                            id="missionName"
                            placeholder="e.g. Apollo XI"
                            className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={clsx(
                            "w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all",
                            isPending
                                ? "bg-[var(--glass-border)] text-[var(--text-muted)] cursor-not-allowed"
                                : "bg-[var(--accent-violet)] hover:bg-[var(--accent-violet)]/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        )}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Initiating Launch Sequence...
                            </>
                        ) : (
                            "Launch Mission"
                        )}
                    </button>
                    <p className="text-xs text-[var(--text-muted)] text-center">
                        Try submitting &quot;error&quot; to see failure state.
                    </p>
                </form>
            </GlassCard>

            <div className="space-y-6">
                <GlassCard className="h-full flex flex-col relative overflow-hidden">
                    <h3 className="font-bold text-xl mb-4 text-[var(--accent-cyan)]">Telemetry Log</h3>

                    <div className="flex-1 rounded-lg bg-[var(--bg-deep)] border border-[var(--glass-border)] p-4 font-mono text-xs overflow-auto">
                        {!state.timestamp ? (
                            <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)] opacity-50">
                                <CodeIcon />
                                <span className="mt-2">Waiting for transmission...</span>
                            </div>
                        ) : (
                            <motion.div
                                key={state.timestamp}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2"
                            >
                                <div className="flex items-center gap-2 text-[var(--text-muted)] border-b border-[var(--glass-border)] pb-2 mb-2">
                                    <span>TIMESTAMP: {new Date(state.timestamp).toLocaleTimeString()}</span>
                                    <span>STATUS: {state.success ? 'OK' : 'ERR'}</span>
                                </div>
                                <div className={clsx(
                                    "p-4 rounded border",
                                    state.success
                                        ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-200"
                                        : "bg-red-900/20 border-red-500/30 text-red-200"
                                )}>
                                    <div className="flex items-start gap-3">
                                        {state.success ? <CheckCircle2 size={18} className="mt-0.5" /> : <XCircle size={18} className="mt-0.5" />}
                                        <span className="text-sm font-bold">{state.message}</span>
                                    </div>
                                </div>

                                <div className="mt-4 opacity-50">
                                    <div className="text-[var(--accent-violet)] mb-1">{`// Raw State`}</div>
                                    <pre className="text-[var(--text-muted)]">
                                        {JSON.stringify(state, null, 2)}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {isPending && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
                        >
                            <div className="text-[var(--accent-cyan)] font-mono text-sm animate-pulse">
                                [ PROCESSING DATA PACKET ]
                            </div>
                        </motion.div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}

function CodeIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}
