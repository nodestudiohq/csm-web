// app/advisories/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { NewsletterBand } from '@/components/newsletter-band';
import { getAdvisories, type Severity } from '@/lib/data';
import { SEVERITY, fmtDate } from '@/lib/ui';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Security advisories',
    description: 'Recently disclosed vulnerabilities with severity, CVSS score and patch status.',
    alternates: { canonical: '/advisories' },
};

type Props = { searchParams: Promise<{ severity?: string }> };

const FILTERS: { value: Severity | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
];

export default async function AdvisoriesPage({ searchParams }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdvisoriesPageContent searchParams={searchParams} />
        </Suspense>
    );
}

async function AdvisoriesPageContent({ searchParams }: Props) {
    const { severity } = await searchParams;
    const active = FILTERS.some((f) => f.value === severity) ? (severity as Severity | 'all') : 'all';
    const all = await getAdvisories();
    const items = all.filter((a) => active === 'all' || a.severity === active);

    return (
        <main>
            <PageHeader
                crumbs={[{ label: 'Advisories' }]}
                title="Security advisories"
                description="Recently disclosed vulnerabilities, with severity, CVSS score and whether a patch is available."
            >
                <nav aria-label="Filter by severity">
                    <ul className="flex flex-wrap gap-2">
                        {FILTERS.map((f) => {
                            const selected = f.value === active;
                            return (
                                <li key={f.value}>
                                    <Link
                                        href={f.value === 'all' ? '/advisories' : `/advisories?severity=${f.value}`}
                                        aria-current={selected ? 'page' : undefined}
                                        className={`cm-focus inline-block rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                                            selected
                                                ? 'border-transparent bg-[#D62839] text-white'
                                                : 'cm-surface cm-border cm-fg-2 cm-hover-fg'
                                        }`}
                                    >
                                        {f.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </PageHeader>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                {items.length === 0 ? (
                    <p className="cm-fg-2">No advisories match this filter.</p>
                ) : (
                    <ul className="grid gap-4 md:grid-cols-2">
                        {items.map((a) => (
                            <li
                                key={a.id}
                                className={`cm-surface cm-border rounded-xl border border-l-4 p-5 ${SEVERITY[a.severity].bar}`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span className="cm-fg-2 text-sm [font-family:var(--font-mono)]">{a.id}</span>
                                    <span
                                        className={`rounded px-2 py-0.5 text-xs font-semibold ${SEVERITY[a.severity].chip}`}
                                    >
                                        {SEVERITY[a.severity].label} {a.cvss.toFixed(1)}
                                    </span>
                                </div>
                                <h2 className="mt-3 text-xl font-semibold [font-family:var(--font-display)]">
                                    {a.product}
                                </h2>
                                <p className="cm-muted text-sm">{a.vendor}</p>
                                <p className="cm-fg-2 mt-2">{a.summary}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                                    <span className="cm-muted">Disclosed {fmtDate(a.publishedAt)}</span>
                                    <span className={a.patched ? 'cm-fg font-semibold' : 'cm-brand-text font-semibold'}>
                                        {a.patched ? 'Patch available' : 'No patch yet'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="cm-muted mt-8 max-w-2xl text-sm">
                    Scores are the CVSS base scores published by each vendor or the CVE record. Always confirm details
                    with the vendor before acting.
                </p>
            </section>

            <NewsletterBand />
        </main>
    );
}
