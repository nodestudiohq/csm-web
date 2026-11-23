// components/article-parts.tsx  (server components)
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Article } from '@/lib/data';
import { GRID, coverFor, fmtDate } from '@/lib/ui';

export function Cover({ slug, className = '' }: { slug: string; className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`relative overflow-hidden ${className}`}
            style={{ background: coverFor(slug) }}
        >
            <div className="absolute inset-0" style={GRID} />
        </div>
    );
}

export function Meta({
    a,
    light = false,
}: {
    a: Pick<Article, 'author' | 'publishedAt' | 'readMinutes'>;
    light?: boolean;
}) {
    return (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${light ? 'text-white/75' : 'cm-muted'}`}>
            <span>
                By <span className={`font-medium ${light ? 'text-white' : 'cm-fg'}`}>{a.author.name}</span>
            </span>
            <span>{fmtDate(a.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {a.readMinutes} min read
            </span>
        </div>
    );
}

export function SectionHeading({ title, href, linkText }: { title: string; href?: string; linkText?: string }) {
    return (
        <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl">
                {title}
            </h2>
            {href && (
                <Link href={href} className="cm-fg-2 cm-hover-brand inline-flex items-center gap-1 text-sm font-medium">
                    {linkText}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            )}
        </div>
    );
}

export function ArticleCard({ a }: { a: Article }) {
    return (
        <Card className="cm-surface cm-border cm-fg group relative gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
            <Cover slug={a.category.slug} className="h-44" />
            <CardContent className="space-y-3 p-5">
                <Badge variant="secondary" className="cm-surface-2 cm-fg">
                    {a.category.name}
                </Badge>
                <h3 className="text-xl font-semibold leading-snug [font-family:var(--font-display)]">
                    <Link href={`/${a.slug}`} className="cm-focus after:absolute after:inset-0 group-hover:underline">
                        {a.title}
                    </Link>
                </h3>
                <p className="cm-fg-2 line-clamp-3 text-[15px] leading-relaxed">{a.excerpt}</p>
                <Meta a={a} />
            </CardContent>
        </Card>
    );
}

export function ArticleRow({ a }: { a: Article }) {
    return (
        <li className="cm-border group relative border-b py-6 last:border-b-0">
            <p className="cm-brand-text text-sm font-semibold">{a.category.name}</p>
            <h3 className="mt-1 text-xl font-semibold leading-snug [font-family:var(--font-display)] md:text-2xl">
                <Link href={`/${a.slug}`} className="cm-focus after:absolute after:inset-0 group-hover:underline">
                    {a.title}
                </Link>
            </h3>
            <p className="cm-fg-2 mt-2 max-w-2xl">{a.excerpt}</p>
            <div className="mt-3">
                <Meta a={a} />
            </div>
        </li>
    );
}
