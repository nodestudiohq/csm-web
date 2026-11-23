// app/subscribe/confirmed/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Newsletter',
    robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ status?: string }> };

export default async function ConfirmedPage({ searchParams }: Props) {
    <Suspense fallback={<div>Loading...</div>}>
        <ConfirmedPageContent searchParams={searchParams} />
    </Suspense>;
}

async function ConfirmedPageContent({ searchParams }: Props) {
    const { status } = await searchParams;
    const ok = status === 'ok';

    return (
        <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
            {ok ? (
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#2A9D8F]" aria-hidden="true" />
            ) : (
                <CircleAlert className="cm-brand-text mx-auto h-12 w-12" aria-hidden="true" />
            )}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight [font-family:var(--font-display)]">
                {ok ? 'Check your inbox' : 'That email does not look right'}
            </h1>
            <p className="cm-fg-2 mt-4 text-lg leading-relaxed">
                {ok
                    ? 'We sent you a confirmation link. Click it to start receiving the weekly briefing. If you do not see it in a few minutes, check your spam folder.'
                    : 'Please check the address and try again.'}
            </p>
            <div className="mt-8 flex justify-center gap-3">
                {!ok && (
                    <Button render={<Link href="/#newsletter" />} nativeButton={false} className="cm-btn-brand">
                        Try again
                    </Button>
                )}
                <Button
                    render={<Link href="/" />}
                    nativeButton={false}
                    variant="outline"
                    className="cm-surface cm-border cm-fg"
                >
                    Back to home
                </Button>
            </div>
        </main>
    );
}
