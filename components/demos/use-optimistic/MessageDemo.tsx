'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Bot, Check, Clock, Send, User } from 'lucide-react';
import { useOptimistic, useRef, useState } from 'react';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    sending?: boolean;
    error?: boolean;
};

// Mock Server Action
async function sendMessageToServer(message: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2s Latency

    if (message.toLowerCase().includes('fail')) {
        throw new Error('Message delivery failed');
    }

    return message;
}

export function MessageDemo() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Welcome to the Observatory Comms Link.", sender: 'bot' },
        { id: '2', text: "Messages you send here use optimistic updates.", sender: 'bot' }
    ]);

    const formRef = useRef<HTMLFormElement>(null);

    // useOptimistic Hook
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (currentMessages, newMessage: Message) => {
            return [...currentMessages, newMessage];
        }
    );

    async function handleSend(formData: FormData) {
        const text = formData.get('message') as string;
        if (!text) return;

        // Reset form immediately
        formRef.current?.reset();

        // 1. Optimistic Update (Immediate Feedback)
        addOptimisticMessage({
            id: Math.random().toString(),
            text: text,
            sender: 'user',
            sending: true
        });

        try {
            // 2. Await Real Server Response
            await sendMessageToServer(text);

            // 3. Confirm State (Update Source of Truth)
            setMessages(prev => [...prev, {
                id: Math.random().toString(),
                text: text,
                sender: 'user'
            }]);
        } catch (error) {
            // Revert or show error
            // In a real app, you might keep the message but mark it as failed
            console.error(error);
            setMessages(prev => [...prev, {
                id: Math.random().toString(),
                text: text,
                sender: 'user',
                error: true
            }]);
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="h-[500px] flex flex-col relative overflow-hidden bg-black/40">
                {/* Header */}
                <div className="p-4 border-b border-[var(--glass-border)] flex items-center justify-between bg-[var(--glass-surface)]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono text-sm tracking-widest text-[var(--accent-cyan)]">LIVE FEED</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">LATENCY: 2000ms</div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {optimisticMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={clsx(
                                    "flex items-start gap-3 max-w-[85%]",
                                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    msg.sender === 'user' ? "bg-[var(--accent-violet)]" : "bg-[var(--accent-cyan)]"
                                )}>
                                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>

                                <div className="space-y-1">
                                    <div className={clsx(
                                        "p-3 rounded-2xl text-sm relative",
                                        msg.sender === 'user'
                                            ? "bg-[var(--accent-violet)]/20 text-white rounded-tr-none border border-[var(--accent-violet)]/30"
                                            : "bg-[var(--glass-surface)] text-[var(--text-secondary)] rounded-tl-none border border-[var(--glass-border)]",
                                        msg.sending && "opacity-70 saturate-50",
                                        msg.error && "!bg-red-500/20 !border-red-500"
                                    )}>
                                        {msg.text}

                                        {/* Status Indicators */}
                                        {msg.sender === 'user' && (
                                            <div className="absolute -bottom-5 right-0 flex items-center gap-1 text-[10px] font-mono">
                                                {msg.error ? (
                                                    <span className="text-red-400 flex items-center gap-1">
                                                        <AlertCircle size={10} /> FAILED
                                                    </span>
                                                ) : msg.sending ? (
                                                    <span className="text-[var(--text-muted)] flex items-center gap-1">
                                                        <Clock size={10} className="animate-spin" /> SENDING...
                                                    </span>
                                                ) : (
                                                    <span className="text-emerald-400 flex items-center gap-1">
                                                        <Check size={10} /> SENT
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[var(--glass-surface)] border-t border-[var(--glass-border)]">
                    <form ref={formRef} action={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            name="message"
                            placeholder="Type a message (experiment with 'fail')..."
                            autoComplete="off"
                            className="flex-1 bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-full px-4 py-2 focus:outline-none focus:border-[var(--accent-violet)] transition-colors text-sm"
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 rounded-full bg-[var(--accent-violet)] text-white flex items-center justify-center hover:bg-[var(--accent-violet)]/80 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            </GlassCard>

            {/* Explainer */}
            <GlassCard className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="text-[var(--accent-cyan)]" />
                    Time Travel UI
                </h3>
                <p className="text-[var(--text-secondary)]">
                    Normally, waiting for a server response (simulated 2s latency here) makes the UI feel sluggish.
                    <code>useOptimistic</code> allows us to update the UI <strong>intentionally strictly before</strong> the server confirms the action.
                </p>

                <div className="space-y-4">
                    <div className="p-4 rounded border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                        <h4 className="text-sm font-bold text-[var(--accent-violet)] mb-2">Optimistic Flow</h4>
                        <ol className="list-decimal pl-4 space-y-2 text-xs text-[var(--text-muted)] marker:text-[var(--text-primary)]">
                            <li><span className="text-white">User hits Send</span> → UI updates <strong>instantly</strong> (marked as &quot;Sending&quot;).</li>
                            <li><span className="text-white">Background</span> → Request travels to server (2s wait).</li>
                            <li><span className="text-white">Server Responds</span> → UI updates again with confirmed data (marked as &quot;Sent&quot;).</li>
                            <li><span className="text-white">Rollback</span> → If server fails, the optimistic state is automatically reverted.</li>
                        </ol>
                    </div>

                    <div className="mt-4 p-4 rounded bg-red-900/10 border border-red-500/20">
                        <h4 className="text-sm font-bold text-red-300 mb-1">Try this:</h4>
                        <p className="text-xs text-red-200">
                            Type &quot;fail&quot; in the message box to see how the optimistic state is handled when the server rejects the request.
                        </p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
