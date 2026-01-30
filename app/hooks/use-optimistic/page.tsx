import { HookPageLayout } from '@/components/HookPageLayout';
import { MessageDemo } from '@/components/demos/use-optimistic/MessageDemo';
import { Sparkles, Zap } from 'lucide-react';

export default function UseOptimisticPage() {
    return (
        <HookPageLayout
            title="useOptimistic"
            subtitle="The Reality Composer"
            icon={Sparkles}
            badges={['React 19', 'Stable', 'UX Pattern']}
        >
            <div className="space-y-8">
                {/* Introduction */}
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                    <p className="text-lg">
                        <code className="text-[var(--accent-violet)]">useOptimistic</code> allows you to show the result of an action
                        <strong> immediately</strong>, before the server has actually confirmed it. It manages the complex state logic
                        of temporary &quot;wishful thinking&quot; states and rollbacks automatically.
                    </p>
                </div>

                {/* Demo */}
                <MessageDemo />

                {/* Usage Code */}
                <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]">
                    <div className="bg-black/30 px-4 py-2 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--glass-border)]">
                        example.tsx
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono text-[var(--text-primary)] overflow-x-auto">
                        {`const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage) => [...state, newMessage]
);

async function handleSend(formData) {
  const msg = formData.get('message');

  // 1. Update UI Immediately
  addOptimisticMessage({ text: msg, sending: true });

  // 2. Perform Mutation
  await sendMessage(msg);
}`}
                    </pre>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Zap size={16} className="text-yellow-400" />
                            To The User
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            The app feels &quot;instant&quot;. No loading spinners for small actions like likes, messages, or toggle switches.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <Sparkles size={16} className="text-[var(--accent-cyan)]" />
                            To The Developer
                        </h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            No more manually managing <code>isSending</code>, creating temporary fake IDs, or handling complex rollback logic in `catch` blocks.
                        </p>
                    </div>
                </div>
            </div>
        </HookPageLayout>
    );
}
