// components/newsletter-widget.tsx  (server component; compact version for sidebars)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GRID } from '@/lib/ui';

export function NewsletterWidget({ id = 'sidebar' }: { id?: string }) {
    return (
        <section
            aria-labelledby={`${id}-newsletter-title`}
            className="relative isolate overflow-hidden rounded-2xl bg-[#0B1626] p-6 text-white ring-1 ring-white/10"
        >
            <div className="absolute inset-0 -z-10 opacity-60" style={GRID} />
            <div className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-[#D62839]/30 blur-3xl" />

            <h2
                id={`${id}-newsletter-title`}
                className="text-2xl font-extrabold leading-tight tracking-tight [font-family:var(--font-display)]"
            >
                Get the weekly briefing
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
                Breaches, patches and analysis in one email every Friday. Unsubscribe any time.
            </p>

            <form action="/subscribe" method="post" className="mt-4 flex flex-col gap-3">
                <label htmlFor={`${id}-email`} className="sr-only">
                    Email address
                </label>
                <Input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/40 dark:bg-white/10"
                />
                <Button type="submit" size="lg" className="cm-btn-brand h-11">
                    Subscribe
                </Button>
            </form>
        </section>
    );
}
