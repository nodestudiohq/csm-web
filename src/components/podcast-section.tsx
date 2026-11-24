// components/podcast-section.tsx
// Client component: the YouTube iframe only loads after the visitor presses play
// (faster page, and no YouTube cookies until then; it uses youtube-nocookie.com).

'use client';

import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GRID, coverFor, fmtDate } from '@/lib/ui';

export type Episode = {
    id: string; // YouTube video id
    title: string;
    description: string;
    duration: string;
    publishedAt: string; // ISO
    cover: string; // category slug, used for the gradient fallback
};

const thumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function Thumb({ id, cover, className = '' }: { id: string; cover: string; className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`relative overflow-hidden ${className}`}
            style={{ background: coverFor(cover) }}
        >
            <div className="absolute inset-0" style={GRID} />
            {/* If the thumbnail fails to load (for example a placeholder id), the gradient stays visible. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={thumbUrl(id)}
                alt=""
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    );
}

export function PodcastSection({ episodes, channelUrl }: { episodes: Episode[]; channelUrl: string }) {
    const [activeId, setActiveId] = useState(episodes[0]?.id);
    const [playing, setPlaying] = useState(false);

    const active = episodes.find((e) => e.id === activeId) ?? episodes[0];
    if (!active) return null;

    function select(id: string) {
        setActiveId(id);
        setPlaying(true); // choosing an episode starts it
    }

    return (
        <section aria-labelledby="podcast-title" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2
                        id="podcast-title"
                        className="text-2xl font-extrabold tracking-tight [font-family:var(--font-display)] md:text-3xl"
                    >
                        The podcast
                    </h2>
                    <p className="cm-fg-2 mt-1">Conversations with the people on the front line.</p>
                </div>
                <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cm-fg-2 cm-hover-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium"
                >
                    Watch on YouTube
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
            </div>

            {/* 3 / 2 grid */}
            <div className="grid gap-6 lg:grid-cols-5">
                {/* Featured player: 3 columns */}
                <div className="lg:col-span-3">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0B1626]">
                        {playing ? (
                            <iframe
                                key={active.id}
                                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                                title={active.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setPlaying(true)}
                                aria-label={`Play ${active.title}`}
                                className="group absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                            >
                                <Thumb id={active.id} cover={active.cover} className="absolute inset-0 h-full w-full" />
                                <span className="absolute inset-0 bg-linear-to-t from-[#0B1626]/70 via-transparent to-transparent" />
                                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#D62839] text-white shadow-lg transition-transform group-hover:scale-105">
                                    <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
                                </span>
                                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                                    {active.duration}
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="mt-5">
                        <Badge variant="secondary" className="cm-surface-2 cm-fg">
                            Episode
                        </Badge>
                        <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight [font-family:var(--font-display)] md:text-3xl">
                            {active.title}
                        </h3>
                        <p className="cm-fg-2 mt-2 max-w-2xl leading-relaxed">{active.description}</p>
                        <p className="cm-muted mt-3 flex flex-wrap gap-x-4 text-sm">
                            <span>{fmtDate(active.publishedAt)}</span>
                            <span>{active.duration}</span>
                        </p>
                    </div>
                </div>

                {/* Playlist: 2 columns */}
                <div className="cm-surface cm-border cm-fg self-start rounded-2xl border p-2 lg:col-span-2">
                    <h3 className="px-3 pb-1 pt-3 text-lg font-extrabold [font-family:var(--font-display)]">
                        All episodes
                    </h3>
                    <ul>
                        {episodes.map((e) => {
                            const isActive = e.id === active.id;
                            return (
                                <li key={e.id}>
                                    <button
                                        type="button"
                                        onClick={() => select(e.id)}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={`cm-focus flex w-full gap-3 rounded-xl p-3 text-left transition-colors ${
                                            isActive ? 'cm-surface-2' : 'cm-hover-bg'
                                        }`}
                                    >
                                        <Thumb
                                            id={e.id}
                                            cover={e.cover}
                                            className="aspect-video w-28 shrink-0 rounded-lg"
                                        />
                                        <span className="min-w-0">
                                            <span className="line-clamp-2 block text-sm font-semibold leading-snug">
                                                {e.title}
                                            </span>
                                            <span className="cm-muted mt-1 block text-xs">
                                                {isActive ? (
                                                    <span className="cm-brand-text font-semibold">Now showing</span>
                                                ) : (
                                                    <>
                                                        {fmtDate(e.publishedAt)}, {e.duration}
                                                    </>
                                                )}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
