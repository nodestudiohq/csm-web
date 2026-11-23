// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';
import './theme.css'; // must come after globals.css

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '800'] });
const body = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domain.com';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'CyberSecurity Magazine | News, analysis and advisories',
        template: '%s | CyberSecurity Magazine',
    },
    description:
        'Independent reporting on breaches, vulnerabilities, threat actors and defence strategy for security teams.',
    applicationName: 'CyberSecurity Magazine',
    openGraph: { type: 'website', siteName: 'CyberSecurity Magazine', locale: 'en_IN' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#F6F8FB' },
        { media: '(prefers-color-scheme: dark)', color: '#0A1220' },
    ],
};

const TOPICS = [
    { name: 'Breaches', slug: 'breaches' },
    { name: 'Vulnerabilities', slug: 'vulnerabilities' },
    { name: 'Threat Intel', slug: 'threat-intel' },
    { name: 'Defence', slug: 'defence' },
    { name: 'Policy', slug: 'policy' },
    { name: 'Interviews', slug: 'interviews' },
];

const LANGS = [
    { label: 'EN', name: 'English', href: 'https://domain.com', lang: 'en' },
    { label: 'JA', name: '日本語', href: 'https://ja.domain.com', lang: 'ja' },
    { label: 'HI', name: 'हिन्दी', href: 'https://hi.domain.com', lang: 'hi' },
    { label: 'BN', name: 'বাংলা', href: 'https://bn.domain.com', lang: 'bn' },
];

// The strip and the footer stay dark in both themes, like a masthead.
function ThreatStrip() {
    return (
        <div className="bg-[#0B1626] text-[13px] text-[#B7C4D6]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
                <p className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#E9A800] opacity-70 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E9A800]" />
                    </span>
                    <span>
                        Global threat level: <strong className="font-semibold text-white">Elevated</strong>
                    </span>
                </p>
                <nav aria-label="Language" className="flex items-center gap-1">
                    {LANGS.map((l) => (
                        <a
                            key={l.lang}
                            href={l.href}
                            hrefLang={l.lang}
                            title={l.name}
                            className={`rounded px-2 py-0.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                                l.lang === 'en' ? 'bg-white/10 font-semibold text-white' : ''
                            }`}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}

function SiteHeader() {
    return (
        <header className="cm-glass cm-border sticky top-0 z-40 border-b backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
                <Link href="/" className="cm-focus flex items-center gap-2.5">
                    <span
                        className="cm-fg-bg grid h-8 w-8 place-items-center rounded-lg"
                        style={{ background: 'var(--cm-fg)', color: 'var(--cm-bg)' }}
                    >
                        <Shield className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="cm-fg text-lg font-extrabold tracking-tight [font-family:var(--font-display)]">
                        CyberSecurity <span className="cm-brand-text">Magazine</span>
                    </span>
                </Link>

                <nav aria-label="Topics" className="hidden items-center gap-1 lg:flex">
                    {TOPICS.map((t) => (
                        <Link
                            key={t.slug}
                            href={`/category/${t.slug}`}
                            className="cm-fg-2 cm-hover-surface-2 cm-hover-fg cm-focus rounded-md px-3 py-2 text-sm font-medium transition-colors"
                        >
                            {t.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        nativeButton={false}
                        aria-label="Search"
                        className="cm-fg cm-hover-surface-2"
                        render={<Link href="/search" />}
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                    <ThemeToggle />
                    <Button
                        nativeButton={false}
                        className="cm-btn-brand ml-1 hidden sm:inline-flex"
                        render={<Link href="/#newsletter" />}
                    >
                        Subscribe
                    </Button>
                </div>
            </div>
        </header>
    );
}

function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-[#0B1626] text-sm text-[#9FB0C6]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <p className="text-lg font-extrabold text-white [font-family:var(--font-display)]">
                        CyberSecurity Magazine
                    </p>
                    <p className="mt-3 max-w-xs leading-relaxed">
                        Independent reporting for the people who defend networks, products and data.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-white">Topics</p>
                    <ul className="mt-3 space-y-2">
                        {TOPICS.slice(0, 4).map((t) => (
                            <li key={t.slug}>
                                <Link href={`/category/${t.slug}`} className="hover:text-white">
                                    {t.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-semibold text-white">Magazine</p>
                    <ul className="mt-3 space-y-2">
                        <li>
                            <Link href="/about" className="hover:text-white">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/advisories" className="hover:text-white">
                                Advisories
                            </Link>
                        </li>
                        <li>
                            <Link href="/#newsletter" className="hover:text-white">
                                Newsletter
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold text-white">Read in</p>
                    <ul className="mt-3 space-y-2">
                        {LANGS.map((l) => (
                            <li key={l.lang}>
                                <a href={l.href} hrefLang={l.lang} className="hover:text-white">
                                    {l.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-[13px] sm:px-6">
                <p>© 2026 CyberSecurity Magazine. Published by River Publishers.</p>
                <div className="flex gap-5">
                    <Link href="/privacy-policy" className="hover:text-white">
                        Privacy policy
                    </Link>
                    <Link href="/terms" className="hover:text-white">
                        Terms
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // suppressHydrationWarning is required by next-themes (it sets the class before hydration)
        <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
            <body className="cm-bg cm-fg antialiased [font-family:var(--font-body)]">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <a
                        href="#main"
                        className="cm-surface cm-fg sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
                    >
                        Skip to content
                    </a>
                    <ThreatStrip />
                    <SiteHeader />
                    <div id="main">{children}</div>
                    <SiteFooter />
                </ThemeProvider>
            </body>
        </html>
    );
}
