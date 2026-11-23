// app/page.tsx  (route "/")
// Server component. Dummy data comes from getHomeData(); swap its body for a fetch to your Express API later.
// shadcn components used: button, badge, card, input, separator, avatar
// Colours come from the --cm-* tokens in magazine-theme.css, so the page follows light/dark mode.

import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// export const revalidate = 60; // ISR; also trigger on-demand revalidation from the API on publish

export const metadata: Metadata = {
    title: { absolute: 'CyberSecurity Magazine | News, analysis and advisories' },
    alternates: {
        canonical: '/',
        languages: {
            en: 'https://domain.com',
            ja: 'https://ja.domain.com',
            hi: 'https://hi.domain.com',
            bn: 'https://bn.domain.com',
        },
    },
    openGraph: { title: 'CyberSecurity Magazine', url: '/' },
};

/* ------------------------------ types ------------------------------ */

type Severity = 'critical' | 'high' | 'medium' | 'low';
type Article = {
    slug: string;
    title: string;
    excerpt: string;
    category: { name: string; slug: string };
    author: { name: string; slug: string };
    publishedAt: string;
    readMinutes: number;
    views: number;
};
type Advisory = { id: string; product: string; severity: Severity; cvss: number; summary: string };

/* ---------------------------- dummy data ---------------------------- */

async function getHomeData() {
    const articles: Article[] = [
        {
            slug: 'ransomware-crew-hits-regional-hospitals',
            title: 'Ransomware crew takes down three regional hospital networks in one weekend',
            excerpt:
                'Investigators say the group entered through an unpatched VPN appliance and sat undetected for 19 days before encrypting backups.',
            category: { name: 'Breaches', slug: 'breaches' },
            author: { name: 'Meera Iyer', slug: 'meera-iyer' },
            publishedAt: '2026-11-24T06:30:00Z',
            readMinutes: 8,
            views: 18420,
        },
        {
            slug: 'zero-day-in-popular-vpn-client',
            title: 'Zero-day in a widely used VPN client lets attackers run code before login',
            excerpt: 'A patch is out, but scans show thousands of exposed gateways still running the vulnerable build.',
            category: { name: 'Vulnerabilities', slug: 'vulnerabilities' },
            author: { name: 'Daniel Okafor', slug: 'daniel-okafor' },
            publishedAt: '2026-11-23T14:10:00Z',
            readMinutes: 5,
            views: 12980,
        },
        {
            slug: 'phishing-kits-bypass-passkeys',
            title: 'New phishing kits try to downgrade passkey logins. Here is how to spot them',
            excerpt: 'Attackers proxy sign-in pages and push users toward weaker fallback methods.',
            category: { name: 'Threat Intel', slug: 'threat-intel' },
            author: { name: 'Arup Sarkar', slug: 'arup-sarkar' },
            publishedAt: '2026-11-23T09:00:00Z',
            readMinutes: 6,
            views: 9740,
        },
        {
            slug: 'zero-trust-for-small-teams',
            title: 'Zero trust for a ten-person team: what to do first, and what to skip',
            excerpt: 'A practical order of operations for companies with no dedicated security staff.',
            category: { name: 'Defence', slug: 'defence' },
            author: { name: 'Sana Rahman', slug: 'sana-rahman' },
            publishedAt: '2026-11-22T11:45:00Z',
            readMinutes: 9,
            views: 8110,
        },
        {
            slug: 'cert-in-incident-reporting-changes',
            title: 'What the latest CERT-In reporting changes mean for Indian companies',
            excerpt: 'The six-hour reporting window now covers more incident types. We break down who is affected.',
            category: { name: 'Policy', slug: 'policy' },
            author: { name: 'Meera Iyer', slug: 'meera-iyer' },
            publishedAt: '2026-11-21T08:20:00Z',
            readMinutes: 7,
            views: 7360,
        },
        {
            slug: 'supply-chain-attack-npm-packages',
            title: 'Malicious npm packages steal CI secrets through post-install scripts',
            excerpt: 'Forty packages were removed this week. Check your lockfiles for these names.',
            category: { name: 'Vulnerabilities', slug: 'vulnerabilities' },
            author: { name: 'Daniel Okafor', slug: 'daniel-okafor' },
            publishedAt: '2026-11-20T16:05:00Z',
            readMinutes: 4,
            views: 6890,
        },
        {
            slug: 'ciso-interview-bank-incident-response',
            title: '“We practise the bad day every quarter”: a bank CISO on incident response',
            excerpt: 'How tabletop exercises changed the way one lender handled a real card-fraud surge.',
            category: { name: 'Interviews', slug: 'interviews' },
            author: { name: 'Sana Rahman', slug: 'sana-rahman' },
            publishedAt: '2026-11-19T10:00:00Z',
            readMinutes: 11,
            views: 5420,
        },
    ];

    const advisories: Advisory[] = [
        {
            id: 'CVE-2026-41872',
            product: 'Edge VPN Gateway',
            severity: 'critical',
            cvss: 9.8,
            summary: 'Pre-auth remote code execution',
        },
        {
            id: 'CVE-2026-40315',
            product: 'OpenMail Server',
            severity: 'high',
            cvss: 8.1,
            summary: 'Authentication bypass via crafted header',
        },
        {
            id: 'CVE-2026-39007',
            product: 'Panelkit CMS',
            severity: 'high',
            cvss: 7.5,
            summary: 'Stored XSS in the admin dashboard',
        },
        {
            id: 'CVE-2026-38644',
            product: 'FlowSync Agent',
            severity: 'medium',
            cvss: 5.9,
            summary: 'Local privilege escalation on Windows',
        },
    ];

    const topics = [
        { name: 'Breaches', slug: 'breaches', count: 214 },
        { name: 'Vulnerabilities', slug: 'vulnerabilities', count: 386 },
        { name: 'Threat Intel', slug: 'threat-intel', count: 172 },
        { name: 'Defence', slug: 'defence', count: 241 },
        { name: 'Policy', slug: 'policy', count: 96 },
        { name: 'Interviews', slug: 'interviews', count: 58 },
    ];

    const authors = [
        { name: 'Meera Iyer', slug: 'meera-iyer', beat: 'Breaches and policy', count: 128 },
        { name: 'Daniel Okafor', slug: 'daniel-okafor', beat: 'Vulnerability research', count: 94 },
        { name: 'Sana Rahman', slug: 'sana-rahman', beat: 'Defence and interviews', count: 81 },
        { name: 'Arup Sarkar', slug: 'arup-sarkar', beat: 'Threat intelligence', count: 66 },
    ];

    return { articles, advisories, topics, authors };
}

/* ------------------------------ helpers ------------------------------ */

const SEVERITY: Record<Severity, { label: string; bar: string; chip: string }> = {
    critical: { label: 'Critical', bar: 'border-l-[#C1121F]', chip: 'bg-[#C1121F] text-white' },
    high: { label: 'High', bar: 'border-l-[#E85D04]', chip: 'bg-[#E85D04] text-[#1A0F00]' },
    medium: { label: 'Medium', bar: 'border-l-[#E9A800]', chip: 'bg-[#E9A800] text-[#1A1300]' },
    low: { label: 'Low', bar: 'border-l-[#2A9D8F]', chip: 'bg-[#2A9D8F] text-[#04201C]' },
};

// Covers are dark in both themes, so white text on them always works.
const COVER: Record<string, string> = {
    breaches: 'linear-gradient(140deg,#0B1626 0%,#3A1520 55%,#7A1F2B 100%)',
    vulnerabilities: 'linear-gradient(140deg,#0B1626 0%,#3A230F 55%,#8A4A12 100%)',
    'threat-intel': 'linear-gradient(140deg,#0B1626 0%,#15304F 55%,#2A5F94 100%)',
    defence: 'linear-gradient(140deg,#0B1626 0%,#10383A 55%,#1F7A70 100%)',
    policy: 'linear-gradient(140deg,#0B1626 0%,#2A284F 55%,#4C4890 100%)',
    interviews: 'linear-gradient(140deg,#0B1626 0%,#262B36 55%,#566074 100%)',
};

const GRID = {
    backgroundImage:
        'linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)',
    backgroundSize: '32px 32px',
};

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const fmtViews = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
const initials = (name: string) =>
    name
        .split(' ')
        .map((p) => p[0])
        .join('');

function Cover({ slug, className = '' }: { slug: string; className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`relative overflow-hidden ${className}`}
            style={{ background: COVER[slug] ?? COVER.defence }}
        >
            <div className="absolute inset-0" style={GRID} />
        </div>
    );
}

function Meta({ a, light = false }: { a: Article; light?: boolean }) {
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

function SectionHeading({ title, href, linkText }: { title: string; href?: string; linkText?: string }) {
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

/* -------------------------------- page -------------------------------- */

export default async function HomePage() {
    const { articles, advisories, topics, authors } = await getHomeData();
    const [lead, ...rest] = articles;
    const latest = rest.slice(0, 3);
    const mostRead = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

    return (
        <main>
            {/* Hero */}
            <section aria-labelledby="lead-title" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10">
                <div className="grid gap-6 lg:grid-cols-12">
                    <article
                        className="group relative isolate flex min-h-[440px] overflow-hidden rounded-2xl text-white lg:col-span-8 lg:min-h-[520px]"
                        style={{ background: COVER[lead.category.slug] }}
                    >
                        <div className="absolute inset-0 -z-10" style={GRID} />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1626]/90 via-[#0B1626]/20 to-transparent" />
                        <div className="mt-auto max-w-3xl p-6 sm:p-10">
                            <Badge className="mb-4 bg-[#D62839] text-white hover:bg-[#D62839]">
                                {lead.category.name}
                            </Badge>
                            <h1
                                id="lead-title"
                                className="text-3xl font-extrabold leading-[1.08] tracking-tight [font-family:var(--font-display)] sm:text-4xl md:text-5xl"
                            >
                                <Link
                                    href={`/${lead.slug}`}
                                    className="after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    {lead.title}
                                </Link>
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                                {lead.excerpt}
                            </p>
                            <div className="mt-5">
                                <Meta a={lead} light />
                            </div>
                        </div>
                    </article>

                    <Card className="cm-surface cm-border cm-fg gap-0 rounded-2xl py-0 shadow-sm lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pb-3 pt-5">
                            <CardTitle className="text-lg font-extrabold [font-family:var(--font-display)]">
                                Active advisories
                            </CardTitle>
                            <Link href="/advisories" className="cm-fg-2 cm-hover-brand text-sm font-medium">
                                View all
                            </Link>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <ul className="space-y-3">
                                {advisories.map((a) => (
                                    <li
                                        key={a.id}
                                        className={`cm-surface-2 rounded-lg border-l-4 px-4 py-3 ${SEVERITY[a.severity].bar}`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="cm-fg-2 text-[13px] [font-family:var(--font-mono)]">
                                                {a.id}
                                            </span>
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-semibold ${SEVERITY[a.severity].chip}`}
                                            >
                                                {SEVERITY[a.severity].label} {a.cvss.toFixed(1)}
                                            </span>
                                        </div>
                                        <p className="mt-1.5 text-sm font-semibold">{a.product}</p>
                                        <p className="cm-muted text-sm">{a.summary}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Latest */}
            <section aria-labelledby="latest-title" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <h2
                        id="latest-title"
                        className="text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl"
                    >
                        Latest reporting
                    </h2>
                    <Link
                        href="/latest"
                        className="cm-fg-2 cm-hover-brand inline-flex items-center gap-1 text-sm font-medium"
                    >
                        All articles
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {latest.map((a) => (
                        <Card
                            key={a.slug}
                            className="cm-surface cm-border cm-fg group relative gap-0 overflow-hidden rounded-2xl py-0 shadow-sm"
                        >
                            <Cover slug={a.category.slug} className="h-44" />
                            <CardContent className="space-y-3 p-5">
                                <Badge variant="secondary" className="cm-surface-2 cm-fg">
                                    {a.category.name}
                                </Badge>
                                <h3 className="text-xl font-semibold leading-snug [font-family:var(--font-display)]">
                                    <Link
                                        href={`/${a.slug}`}
                                        className="cm-focus after:absolute after:inset-0 group-hover:underline"
                                    >
                                        {a.title}
                                    </Link>
                                </h3>
                                <p className="cm-fg-2 line-clamp-3 text-[15px] leading-relaxed">{a.excerpt}</p>
                                <Meta a={a} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* More stories + most read */}
            <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
                    <div>
                        <SectionHeading title="More from the newsroom" />
                        <ul className="cm-border border-y">
                            {rest.slice(3).map((a) => (
                                <li key={a.slug} className="cm-border group relative border-b py-6 last:border-b-0">
                                    <p className="cm-brand-text text-sm font-semibold">{a.category.name}</p>
                                    <h3 className="mt-1 text-xl font-semibold leading-snug [font-family:var(--font-display)] md:text-2xl">
                                        <Link
                                            href={`/${a.slug}`}
                                            className="cm-focus after:absolute after:inset-0 group-hover:underline"
                                        >
                                            {a.title}
                                        </Link>
                                    </h3>
                                    <p className="cm-fg-2 mt-2 max-w-2xl">{a.excerpt}</p>
                                    <div className="mt-3">
                                        <Meta a={a} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside aria-labelledby="most-read-title">
                        <h2
                            id="most-read-title"
                            className="mb-6 text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl"
                        >
                            Most read
                        </h2>
                        <Card className="cm-surface cm-border cm-fg gap-0 rounded-2xl py-0 shadow-sm">
                            <CardContent className="p-2">
                                <ol>
                                    {mostRead.map((a, i) => (
                                        <li key={a.slug}>
                                            {i > 0 && <Separator className="cm-line-bg" />}
                                            <Link
                                                href={`/${a.slug}`}
                                                className="cm-hover-bg cm-focus flex gap-4 rounded-xl p-4 transition-colors"
                                            >
                                                <span className="cm-rank text-3xl font-extrabold leading-none [font-family:var(--font-display)]">
                                                    {i + 1}
                                                </span>
                                                <span>
                                                    <span className="block font-semibold leading-snug">{a.title}</span>
                                                    <span className="cm-muted mt-1 block text-sm">
                                                        {fmtViews(a.views)} reads
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </section>

            {/* Topics */}
            <section aria-labelledby="topics-title" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
                <h2
                    id="topics-title"
                    className="mb-6 text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl"
                >
                    Browse by topic
                </h2>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {topics.map((t) => (
                        <li key={t.slug}>
                            <Link
                                href={`/category/${t.slug}`}
                                className="cm-surface cm-border cm-focus block overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                            >
                                <Cover slug={t.slug} className="h-2" />
                                <span className="block p-4">
                                    <span className="block font-semibold">{t.name}</span>
                                    <span className="cm-muted text-sm">{t.count} articles</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Authors */}
            <section aria-labelledby="authors-title" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
                <h2
                    id="authors-title"
                    className="mb-6 text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl"
                >
                    The reporters
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {authors.map((a) => (
                        <li key={a.slug}>
                            <Link
                                href={`/author/${a.slug}`}
                                className="cm-surface cm-border cm-focus flex items-center gap-4 rounded-xl border p-4 transition-shadow hover:shadow-md"
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback
                                        className="font-semibold"
                                        style={{ background: 'var(--cm-fg)', color: 'var(--cm-bg)' }}
                                    >
                                        {initials(a.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span>
                                    <span className="block font-semibold">{a.name}</span>
                                    <span className="cm-muted block text-sm">{a.beat}</span>
                                    <span className="cm-muted block text-sm">{a.count} articles</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Newsletter (dark band in both themes) */}
            <section
                id="newsletter"
                aria-labelledby="newsletter-title"
                className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6"
            >
                <div className="relative isolate overflow-hidden rounded-3xl bg-[#0B1626] px-6 py-12 text-white ring-1 ring-white/10 sm:px-12 md:py-16">
                    <div className="absolute inset-0 -z-10 opacity-60" style={GRID} />
                    <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#D62839]/30 blur-3xl" />
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h2
                                id="newsletter-title"
                                className="text-3xl font-extrabold leading-tight tracking-tight [font-family:var(--font-display)] md:text-4xl"
                            >
                                The week in security, in one email
                            </h2>
                            <p className="mt-3 max-w-md text-white/75">
                                Breaches, patches and analysis, sent every Friday. Unsubscribe whenever you like.
                            </p>
                        </div>
                        <form action="/subscribe" method="post" className="flex flex-col gap-3 sm:flex-row">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@company.com"
                                className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/40 dark:bg-white/10"
                            />
                            <Button type="submit" size="lg" className="cm-btn-brand h-12 px-6">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
