// app/author/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArticleRow } from '@/components/article-parts';
import { Breadcrumbs } from '@/components/page-header';
import { NewsletterBand } from '@/components/newsletter-band';
import { SITE_URL, getArticlesByAuthor, getAuthor, getAuthors } from '@/lib/data';
import { fmtViews, initials } from '@/lib/ui';

// export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const authors = await getAuthors();
    return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthor(slug);
    if (!author) return {};
    return {
        title: author.name,
        description: `${author.name} covers ${author.beat.toLowerCase()} for CyberSecurity Magazine. ${author.bio}`,
        alternates: { canonical: `/author/${slug}` },
        openGraph: { type: 'profile', title: `${author.name} | CyberSecurity Magazine`, url: `/author/${slug}` },
    };
}

export default async function AuthorPage({ params }: Props) {
    const { slug } = await params;
    const [author, articles] = await Promise.all([getAuthor(slug), getArticlesByAuthor(slug)]);
    if (!author) notFound();

    const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        description: author.bio,
        url: `${SITE_URL}/author/${author.slug}`,
        jobTitle: 'Reporter',
        worksFor: { '@type': 'Organization', name: 'CyberSecurity Magazine' },
        sameAs: author.links.map((l) => l.href),
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />

            <header className="cm-border border-b">
                <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
                    <Breadcrumbs items={[{ label: 'Authors' }, { label: author.name }]} />
                    <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                        <Avatar className="h-24 w-24">
                            <AvatarFallback
                                className="text-3xl font-semibold"
                                style={{ background: 'var(--cm-fg)', color: 'var(--cm-bg)' }}
                            >
                                {initials(author.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-5xl">
                                {author.name}
                            </h1>
                            <p className="cm-brand-text mt-1 font-semibold">{author.beat}</p>
                            <p className="cm-fg-2 mt-3 max-w-2xl text-lg leading-relaxed">{author.bio}</p>
                            <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                                {author.links.map((l) => (
                                    <li key={l.label}>
                                        <a
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer me"
                                            className="cm-fg-2 cm-hover-brand underline underline-offset-4"
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <dl className="mt-8 flex flex-wrap gap-8">
                        <div>
                            <dt className="cm-muted text-sm">Articles</dt>
                            <dd className="text-3xl font-extrabold [font-family:var(--font-display)]">
                                {author.count}
                            </dd>
                        </div>
                        <div>
                            <dt className="cm-muted text-sm">Reads on recent work</dt>
                            <dd className="text-3xl font-extrabold [font-family:var(--font-display)]">
                                {fmtViews(totalViews)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <h2 className="mb-2 text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl">
                    Recent articles
                </h2>
                <ul className="cm-border max-w-4xl border-y">
                    {articles.map((a) => (
                        <ArticleRow key={a.slug} a={a} />
                    ))}
                </ul>
            </section>

            <NewsletterBand />
        </main>
    );
}
