// app/loading.tsx
// Shown inside the layout (header and footer stay put) while a page is loading.
// Plain divs with theme tokens, so no extra shadcn component is needed.

function Bar({ className = '' }: { className?: string }) {
    return <div aria-hidden="true" className={`cm-surface-2 rounded-md motion-safe:animate-pulse ${className}`} />;
}

function CardSkeleton() {
    return (
        <div className="cm-surface cm-border overflow-hidden rounded-2xl border">
            <Bar className="h-44 rounded-none" />
            <div className="space-y-3 p-5">
                <Bar className="h-5 w-20" />
                <Bar className="h-6 w-full" />
                <Bar className="h-6 w-4/5" />
                <Bar className="h-4 w-full" />
                <Bar className="h-4 w-3/5" />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main role="status" aria-busy="true" aria-live="polite" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <span className="sr-only">Loading</span>

            {/* Page title area */}
            <div className="space-y-4">
                <Bar className="h-4 w-40" />
                <Bar className="h-12 w-full max-w-xl" />
                <Bar className="h-5 w-full max-w-md" />
            </div>

            {/* Content */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </main>
    );
}
