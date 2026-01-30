import { GlassCard } from '@/components/ui/GlassCard';
import { Lock, ShieldAlert } from 'lucide-react';
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react';

// --- Simulation of Sensitive Data ---
const UserProfile = {
    id: 'user_123',
    name: 'Alice Wonderland',
    creditCard: '4242-4242-4242-4242', // WE MUST NOT LEAK THIS
    secretKey: 'sk_live_123456',        // OR THIS
};

// 1. Taint the Object (Safely)
if (typeof experimental_taintObjectReference === 'function') {
    experimental_taintObjectReference(
        'Do not pass the entire UserProfile object to the client!',
        UserProfile
    );
}

// 2. Taint a Value (Safely)
if (typeof experimental_taintUniqueValue === 'function') {
    experimental_taintUniqueValue(
        'Do not pass the secret key!',
        UserProfile,
        UserProfile.secretKey
    );
}

// --- Client Component for Demo ---
import { TaintClientDemo } from '@/components/demos/taint/TaintClientDemo';

export default function TaintPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-[var(--accent-violet)]/20 text-[var(--accent-violet)]">
                    <ShieldAlert size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[var(--text-secondary)] bg-clip-text text-transparent">
                        Taint APIs
                    </h1>
                    <p className="text-[var(--text-secondary)]">Server-Side Data Leakage Protection</p>
                </div>
            </div>

            <GlassCard className="border-red-500/20">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-red-400">
                    <Lock size={18} />
                    Secure Server Data
                </h3>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    The <code>UserProfile</code> object on the server is &quot;tainted&quot;.
                    React will block it from being passed to Client Components as a prop.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded bg-black/40 font-mono text-xs">
                        <div className="text-[var(--text-muted)]">{/* Server Side Code */}</div>
                        <div className="text-emerald-400">const UserProfile = {'{'}</div>
                        <div className="pl-4 text-white">id: &apos;user_123&apos;,</div>
                        <div className="pl-4 text-red-400">creditCard: &apos;...&apos;, {/* Tainted! */}</div>
                        <div className="text-emerald-400">{'}'};</div>
                        <div className="mt-2 text-blue-400">
                            experimental_taintObjectReference(..., UserProfile);
                        </div>
                    </div>

                    {/* We pass only safe data */}
                    <TaintClientDemo
                        safeData={{ name: UserProfile.name, id: UserProfile.id }}
                    />
                </div>
            </GlassCard>
        </div>
    );
}
