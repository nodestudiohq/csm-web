// components/page-header.tsx  (server component)
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
    return (
        <nav aria-label="Breadcrumb" className={`text-sm ${light ? 'text-white/70' : 'cm-muted'}`}>
            <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                    <Link href="/" className={light ? 'hover:text-white' : 'cm-hover-fg'}>
                        Home
                    </Link>
                </li>
                {items.map((c, i) => (
                    <li key={c.label} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                        {c.href && i < items.length - 1 ? (
                            <Link href={c.href} className={light ? 'hover:text-white' : 'cm-hover-fg'}>
                                {c.label}
                            </Link>
                        ) : (
                            <span aria-current="page" className={light ? 'text-white' : 'cm-fg'}>
                                {c.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function PageHeader({
    crumbs,
    title,
    description,
    children,
}: {
    crumbs: Crumb[];
    title: string;
    description?: string;
    children?: React.ReactNode;
}) {
    return (
        <header className="cm-border border-b">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6">
                <Breadcrumbs items={crumbs} />
                <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight [font-family:var(--font-display)] md:text-5xl">
                    {title}
                </h1>
                {description && <p className="cm-fg-2 mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>}
                {children && <div className="mt-6">{children}</div>}
            </div>
        </header>
    );
}

// Simple readable styling for long text pages (no typography plugin needed).
export function Prose({ children }: { children: React.ReactNode }) {
    return (
        <div className="cm-fg-2 max-w-3xl text-[17px] leading-[1.75] [&_a]:cm-brand-text [&_a]:underline [&_h2]:cm-fg [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:[font-family:var(--font-display)] [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
        </div>
    );
}
