// app/[slug]/page.tsx  (route "/<article-slug>")
// Static routes such as /latest, /about or /search take precedence over this dynamic route.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Mail } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArticleCard, SectionHeading } from '@/components/article-parts';
import { Breadcrumbs } from '@/components/page-header';
import { NewsletterWidget } from '@/components/newsletter-widget';
import { SITE_URL, getArticle, getArticles, getAuthor, getRelated } from '@/lib/data';
import { GRID, coverFor, fmtDate, initials } from '@/lib/ui';

// export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const a = await getArticle(slug);
    if (!a) return {};
    return {
        title: a.title,
        description: a.excerpt,
        alternates: { canonical: `/${slug}` },
        openGraph: {
            type: 'article',
            title: a.title,
            description: a.excerpt,
            url: `/${slug}`,
            publishedTime: a.publishedAt,
            modifiedTime: a.updatedAt ?? a.publishedAt,
            authors: [a.author.name],
            section: a.category.name,
            tags: a.tags,
        },
        twitter: { card: 'summary_large_image', title: a.title, description: a.excerpt },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) notFound();

    const [related, author, all] = await Promise.all([
        getRelated(article, 3),
        getAuthor(article.author.slug),
        getArticles(),
    ]);

    // Newest first, without the article being read
    const recent = all
        .filter((a) => a.slug !== article.slug)
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 4);

    const url = `${SITE_URL}/${article.slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        author: { '@type': 'Person', name: article.author.name, url: `${SITE_URL}/author/${article.author.slug}` },
        publisher: { '@type': 'Organization', name: 'CyberSecurity Magazine', url: SITE_URL },
        mainEntityOfPage: url,
        articleSection: article.category.name,
        keywords: article.tags.join(', '),
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />

            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
                    {/* ---------- Main column ---------- */}
                    <article>
                        <header>
                            <Breadcrumbs
                                items={[
                                    { label: article.category.name, href: `/category/${article.category.slug}` },
                                    { label: 'Article' },
                                ]}
                            />
                            <Badge className="mt-6 bg-[#D62839] text-white hover:bg-[#D62839]">
                                {article.category.name}
                            </Badge>
                            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] tracking-tight [font-family:var(--font-display)] md:text-5xl">
                                {article.title}
                            </h1>
                            <p className="cm-fg-2 mt-5 max-w-3xl text-xl leading-relaxed">{article.excerpt}</p>

                            <div className="mt-7 flex flex-wrap items-center gap-4">
                                <Avatar className="h-11 w-11">
                                    <AvatarFallback
                                        className="font-semibold"
                                        style={{ background: 'var(--cm-fg)', color: 'var(--cm-bg)' }}
                                    >
                                        {initials(article.author.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <Link
                                        href={`/author/${article.author.slug}`}
                                        className="cm-focus font-semibold hover:underline"
                                    >
                                        {article.author.name}
                                    </Link>
                                    <p className="cm-muted mt-0.5 flex flex-wrap items-center gap-x-4">
                                        <time dateTime={article.publishedAt}>{fmtDate(article.publishedAt)}</time>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                            {article.readMinutes} min read
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* Cover fills the column */}
                        <div
                            role="img"
                            aria-label={`Illustration for ${article.title}`}
                            className="relative mt-8 aspect-21/9 overflow-hidden rounded-2xl"
                            style={{ background: coverFor(article.category.slug) }}
                        >
                            <div className="absolute inset-0" style={GRID} />
                        </div>

                        {/* Body, left aligned with a comfortable line length */}
                        <div className="mt-10 max-w-3xl">
                            <aside aria-label="Key takeaways" className="cm-surface-2 rounded-xl p-5">
                                <p className="font-extrabold [font-family:var(--font-display)]">Key takeaways</p>
                                <ul className="cm-fg-2 mt-2 list-disc space-y-1.5 pl-5">
                                    {article.takeaways.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            </aside>

                            <div className="mt-8 text-[19px] leading-[1.8]">
                                {article.body.map((b, i) => {
                                    switch (b.type) {
                                        case 'h2':
                                            return (
                                                <h2
                                                    key={i}
                                                    className="mt-12 text-3xl font-extrabold leading-tight tracking-tight [font-family:var(--font-display)]"
                                                >
                                                    {b.text}
                                                </h2>
                                            );
                                        case 'list':
                                            return (
                                                <ul key={i} className="cm-fg-2 mt-5 list-disc space-y-2 pl-6">
                                                    {b.items.map((it) => (
                                                        <li key={it}>{it}</li>
                                                    ))}
                                                </ul>
                                            );
                                        case 'quote':
                                            return (
                                                <blockquote key={i} className="mt-8 border-l-4 border-[#D62839] pl-5">
                                                    <p className="text-2xl font-semibold leading-snug [font-family:var(--font-display)]">
                                                        {b.text}
                                                    </p>
                                                    <footer className="cm-muted mt-2 text-base">{b.cite}</footer>
                                                </blockquote>
                                            );
                                        default:
                                            return (
                                                <p key={i} className="cm-fg-2 mt-5">
                                                    {b.text}
                                                </p>
                                            );
                                    }
                                })}
                            </div>

                            {/* Tags + share */}
                            <div className="cm-border mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                                    {article.tags.map((t) => (
                                        <li key={t}>
                                            <Link href={`/search?q=${encodeURIComponent(t)}`}>
                                                <Badge variant="secondary" className="cm-surface-2 cm-fg">
                                                    {t}
                                                </Badge>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="cm-muted font-normal">Share</span>
                                    <a
                                        href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cm-fg-2 cm-hover-brand"
                                    >
                                        X
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cm-fg-2 cm-hover-brand"
                                    >
                                        LinkedIn
                                    </a>
                                    <a
                                        href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`}
                                        aria-label="Share by email"
                                        className="cm-fg-2 cm-hover-brand"
                                    >
                                        <Mail className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Author card */}
                            {author && (
                                <div className="cm-surface cm-border mt-8 flex gap-4 rounded-2xl border p-5">
                                    <Avatar className="h-14 w-14 shrink-0">
                                        <AvatarFallback
                                            className="text-lg font-semibold"
                                            style={{ background: 'var(--cm-fg)', color: 'var(--cm-bg)' }}
                                        >
                                            {initials(author.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-extrabold [font-family:var(--font-display)]">
                                            {author.name}
                                        </p>
                                        <p className="cm-muted text-sm">{author.beat}</p>
                                        <p className="cm-fg-2 mt-2 text-[15px] leading-relaxed">{author.bio}</p>
                                        <Link
                                            href={`/author/${author.slug}`}
                                            className="cm-brand-text mt-3 inline-block text-sm font-semibold hover:underline"
                                        >
                                            Read {author.count} articles by {author.name.split(' ')[0]}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>

                    {/* ---------- Sidebar ---------- */}
                    <aside aria-label="Sidebar" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <NewsletterWidget id="article" />

                        <section
                            aria-labelledby="recent-title"
                            className="cm-surface cm-border cm-fg rounded-2xl border p-5"
                        >
                            <h2 id="recent-title" className="text-lg font-extrabold [font-family:var(--font-display)]">
                                Recent posts
                            </h2>
                            <ul className="mt-2">
                                {recent.map((a, i) => (
                                    <li
                                        key={a.slug}
                                        className={`cm-border group relative py-3.5 ${i > 0 ? 'border-t' : ''}`}
                                    >
                                        <p className="cm-brand-text text-xs font-semibold">{a.category.name}</p>
                                        <Link
                                            href={`/${a.slug}`}
                                            className="cm-focus mt-0.5 block font-semibold leading-snug after:absolute after:inset-0 group-hover:underline"
                                        >
                                            {a.title}
                                        </Link>
                                        <p className="cm-muted mt-1 text-xs">{fmtDate(a.publishedAt)}</p>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/latest"
                                className="cm-brand-text mt-1 inline-block text-sm font-semibold hover:underline"
                            >
                                View all articles
                            </Link>
                        </section>
                    </aside>
                </div>
            </div>

            {/* Related */}
            <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6">
                <h2 id="related-title" className="sr-only">
                    Related articles
                </h2>
                <SectionHeading title="Keep reading" />
                <div className="grid gap-6 md:grid-cols-3">
                    {related.map((a) => (
                        <ArticleCard key={a.slug} a={a} />
                    ))}
                </div>
            </section>
        </main>
    );
}
