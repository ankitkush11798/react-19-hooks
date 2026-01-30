'use client';

import { HookPageLayout } from '@/components/HookPageLayout';
import { FormStatusDemo } from '@/components/demos/use-form-status/FormStatusDemo';
import { Send } from 'lucide-react';

export default function FormStatusPage() {
    return (
        <HookPageLayout
            title="useFormStatus"
            subtitle="Action State Orchestration"
            icon={Send}
            badges={['React 19', 'Forms', 'Actions']}
        >
            <div className="space-y-8">
                <section>
                    <p className="text-lg text-[var(--text-secondary)] mb-6">
                        <code className="text-[var(--accent-violet)]">useFormStatus</code> is a Hook that gives you status information of the last form submission.
                        It allows components nested inside a <code>&lt;form&gt;</code> to know if the form is pending, what data was sent, and what action was triggered.
                    </p>
                    <FormStatusDemo />
                </section>

                <section className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-500/20">
                    <h4 className="font-bold text-yellow-400 mb-2 text-sm">Design Rule</h4>
                    <p className="text-sm text-yellow-200/80">
                        The <code>useFormStatus</code> Hook must be called from a component that is rendered inside a <code>&lt;form&gt;</code>.
                        It will not return status information for a form rendered in the same component where the Hook is called.
                    </p>
                </section>
            </div>
        </HookPageLayout>
    );
}
