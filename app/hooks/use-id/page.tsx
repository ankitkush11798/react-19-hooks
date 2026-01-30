'use client';

import { HookPageLayout } from '@/components/HookPageLayout';
import { IdDemo } from '@/components/demos/use-id/IdDemo';
import { GlassCard } from '@/components/ui/GlassCard';
import { Fingerprint, Key } from 'lucide-react';

export default function UseIdPage() {
    return (
        <HookPageLayout
            title="useId"
            subtitle="Universal identity, server to client. Generate unique IDs that are stable across hydration."
            icon={Key}
        >
            {/* Concept Visualization */}
            <section className="grid md:grid-cols-2 gap-8">
                <GlassCard className="p-8 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Fingerprint className="text-[var(--accent-violet)]" />
                        How Hydration Works
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[var(--glass-surface)] rounded border border-[var(--glass-border)]">
                            <span className="text-sm font-mono text-[var(--accent-cyan)]">Server Render</span>
                            <span className="font-mono text-xs">id=&quot;:r1:&quot;</span>
                        </div>
                        <div className="flex justify-center text-[var(--text-muted)] text-xs">
                            ⬇️ HTML sent to browser
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--glass-surface)] rounded border border-[var(--glass-border)]">
                            <span className="text-sm font-mono text-[var(--accent-violet)]">Client Hydrate</span>
                            <span className="font-mono text-xs">id=&quot;:r1:&quot;</span>
                        </div>
                        <div className="flex items-center justify-center text-green-400 text-sm font-bold gap-2">
                            Matches ✅
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-8 space-y-4 opacity-70">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-red-300">
                        <Fingerprint className="text-red-400" />
                        The Old Way (Bad)
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-900/10 rounded border border-red-500/20">
                            <span className="text-sm font-mono text-red-300">Server Render</span>
                            <span className="font-mono text-xs">id=&quot;0.123&quot;</span>
                        </div>
                        <div className="flex justify-center text-[var(--text-muted)] text-xs">
                            ⬇️ HTML sent to browser
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-900/10 rounded border border-red-500/20">
                            <span className="text-sm font-mono text-red-300">Client Hydrate</span>
                            <span className="font-mono text-xs">id=&quot;0.987&quot;</span>
                        </div>
                        <div className="flex items-center justify-center text-red-400 text-sm font-bold gap-2">
                            Mismatch ❌
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Interactive Demo */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Interactive Demo: Accessible Labels</h2>
                <IdDemo />
            </section>

            {/* Code Snippet */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Code Pattern</h2>
                <GlassCard className="font-mono text-sm overflow-x-auto bg-[#0d1117]">
                    <pre>
                        {`function PasswordField() {
  const passwordHintId = useId();

  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}`}
                    </pre>
                </GlassCard>
            </section>
        </HookPageLayout>
    );
}
