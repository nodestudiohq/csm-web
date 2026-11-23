// app/search/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArticleRow } from '@/components/article-parts';
import { PageHeader } from '@/components/page-header';
import { getTopics, searchArticles } from '@/lib/data';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Search',
    robots: { index: false, follow: true }, // search result pages should not be indexed
};

type Props = { searchParams: Promise<{ q?: string }> };

const POPULAR = ['ransomware', 'zero-day', 'phishing', 'CERT-In', 'supply chain'];

export default async function SearchPage({ searchParams }: Props) {
    <Suspense fallback={<div>Loading...</div>}>
        <SearchPageContent searchParams={searchParams} />
    </Suspense>;
}

async function SearchPageContent({ searchParams }: Props) {
    const { q = '' } = await searchParams;
    const query = q.trim().slice(0, 100);
    const [results, topics] = await Promise.all([searchArticles(query), getTopics()]);

    return (
        <main>
            <PageHeader crumbs={[{ label: 'Search' }]} title={query ? `Results for “${query}”` : 'Search'}>
                <form action="/search" method="get" role="search" className="flex max-w-xl gap-3">
                    <label htmlFor="q" className="sr-only">
                        Search articles
                    </label>
                    <Input
                        id="q"
                        name="q"
                        type="search"
                        defaultValue={query}
                        placeholder="Search articles, topics and tags"
                        className="cm-surface cm-border cm-fg h-12 text-base"
                    />
                    <Button type="submit" size="lg" className="cm-btn-brand h-12 px-5">
                        <Search className="h-4 w-4" aria-hidden="true" />
                        Search
                    </Button>
                </form>
            </PageHeader>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                {!query && (
                    <div className="max-w-2xl">
                        <p className="cm-fg-2">Try one of these popular searches:</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {POPULAR.map((p) => (
                                <li key={p}>
                                    <Link
                                        href={`/search?q=${encodeURIComponent(p)}`}
                                        className="cm-surface cm-border cm-fg-2 cm-hover-fg cm-focus inline-block rounded-full border px-3.5 py-1.5 text-sm font-medium"
                                    >
                                        {p}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {query && results.length > 0 && (
                    <>
                        <p className="cm-muted mb-2 text-sm" role="status">
                            {results.length} {results.length === 1 ? 'result' : 'results'}
                        </p>
                        <ul className="cm-border max-w-4xl border-y">
                            {results.map((a) => (
                                <ArticleRow key={a.slug} a={a} />
                            ))}
                        </ul>
                    </>
                )}

                {query && results.length === 0 && (
                    <div className="max-w-2xl" role="status">
                        <p className="text-lg font-semibold">No articles match “{query}”.</p>
                        <p className="cm-fg-2 mt-2">
                            Check the spelling, try a shorter or more general term, or browse a topic:
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {topics.map((t) => (
                                <li key={t.slug}>
                                    <Link
                                        href={`/category/${t.slug}`}
                                        className="cm-surface cm-border cm-fg-2 cm-hover-fg cm-focus inline-block rounded-full border px-3.5 py-1.5 text-sm font-medium"
                                    >
                                        {t.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </main>
    );
}
