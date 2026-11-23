// components/newsletter-band.tsx  (server component; dark band in both themes)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GRID } from '@/lib/ui';

export function NewsletterBand() {
    return (
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
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>
                        <Input
                            id="newsletter-email"
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
    );
}
