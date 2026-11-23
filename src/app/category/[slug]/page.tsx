// app/category/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleRow, SectionHeading } from '@/components/article-parts';
import { PageHeader } from '@/components/page-header';
import { NewsletterBand } from '@/components/newsletter-band';
import { getArticlesByCategory, getTopic, getTopics } from '@/lib/data';

// export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const topics = await getTopics();
    return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const topic = await getTopic(slug);
    if (!topic) return {};
    return {
        title: topic.name,
        description: topic.description,
        alternates: { canonical: `/category/${slug}` },
        openGraph: {
            title: `${topic.name} | CyberSecurity Magazine`,
            description: topic.description,
            url: `/category/${slug}`,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const [topic, articles, topics] = await Promise.all([getTopic(slug), getArticlesByCategory(slug), getTopics()]);
    if (!topic) notFound();

    return (
        <main>
            <PageHeader
                crumbs={[{ label: 'Topics' }, { label: topic.name }]}
                title={topic.name}
                description={topic.description}
            >
                <ul className="flex flex-wrap gap-2" aria-label="Other topics">
                    {topics
                        .filter((t) => t.slug !== slug)
                        .map((t) => (
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
            </PageHeader>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <p className="cm-muted mb-2 text-sm">{topic.count} articles in this topic</p>
                {articles.length > 0 ? (
                    <ul className="cm-border max-w-4xl border-y">
                        {articles.map((a) => (
                            <ArticleRow key={a.slug} a={a} />
                        ))}
                    </ul>
                ) : (
                    <div className="cm-surface cm-border max-w-xl rounded-2xl border p-8">
                        <SectionHeading title="Nothing here yet" />
                        <p className="cm-fg-2">
                            We have not published in this topic recently. Try the latest reporting instead.
                        </p>
                        <Link href="/latest" className="cm-brand-text mt-4 inline-block font-semibold hover:underline">
                            See latest articles
                        </Link>
                    </div>
                )}
            </section>

            <NewsletterBand />
        </main>
    );
}
