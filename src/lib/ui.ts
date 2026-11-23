// lib/ui.ts
import type { CSSProperties } from 'react';
import type { Severity } from './data';

export const SEVERITY: Record<Severity, { label: string; bar: string; chip: string }> = {
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

export const coverFor = (slug: string) => COVER[slug] ?? COVER.defence;

export const GRID: CSSProperties = {
    backgroundImage:
        'linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)',
    backgroundSize: '32px 32px',
};

export const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const fmtViews = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

export const initials = (name: string) =>
    name
        .split(' ')
        .map((p) => p[0])
        .join('');
