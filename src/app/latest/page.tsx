// app/latest/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleRow } from '@/components/article-parts';
import { PageHeader } from '@/components/page-header';
import { NewsletterBand } from '@/components/newsletter-band';
import { getArticles } from '@/lib/data';
import { Suspense } from 'react';

const PAGE_SIZE = 4; // dummy data is small; use 12-20 with the real API

export const metadata: Metadata = {
    title: 'Latest articles',
    description: 'Every new story from CyberSecurity Magazine, newest first.',
    alternates: { canonical: '/latest' },
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function LatestPage({ searchParams }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LatestPageContent searchParams={searchParams} />
        </Suspense>
    );
}

async function LatestPageContent({ searchParams }: Props) {
    const { page } = await searchParams;
    const all = (await getArticles()).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
    const current = Math.min(Math.max(parseInt(page ?? '1', 10) || 1, 1), pages);
    const items = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

    const href = (p: number) => (p === 1 ? '/latest' : `/latest?page=${p}`);

    return (
        <main>
            <PageHeader
                crumbs={[{ label: 'Latest' }]}
                title="Latest articles"
                description="Every new story, newest first."
            />

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <ul className="cm-border max-w-4xl border-y">
                    {items.map((a) => (
                        <ArticleRow key={a.slug} a={a} />
                    ))}
                </ul>

                {pages > 1 && (
                    <nav aria-label="Pagination" className="mt-8 flex max-w-4xl items-center justify-between">
                        {current > 1 ? (
                            <Button
                                render={<Link href={href(current - 1)} rel="prev" />}
                                nativeButton={false}
                                variant="outline"
                                className="cm-surface cm-border cm-fg"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                Newer
                            </Button>
                        ) : (
                            <span />
                        )}
                        <p className="cm-muted text-sm">
                            Page {current} of {pages}
                        </p>
                        {current < pages ? (
                            <Button
                                render={<Link href={href(current + 1)} rel="next" />}
                                nativeButton={false}
                                variant="outline"
                                className="cm-surface cm-border cm-fg"
                            >
                                Older
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        ) : (
                            <span />
                        )}
                    </nav>
                )}
            </section>

            <NewsletterBand />
        </main>
    );
}
