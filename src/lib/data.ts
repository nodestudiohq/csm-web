// lib/data.ts
// Dummy data layer. Every function is async on purpose: later, replace each body with a
// fetch to your Express API (e.g. fetch(`${process.env.API_URL}/public/articles/${slug}`)).
// The pages only depend on these function signatures and types.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domain.com';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type Article = {
    slug: string;
    title: string;
    excerpt: string;
    category: { name: string; slug: string };
    author: { name: string; slug: string };
    publishedAt: string; // ISO
    updatedAt?: string;
    readMinutes: number;
    views: number;
    tags: string[];
};

export type Block =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'quote'; text: string; cite: string };

export type Advisory = {
    id: string;
    product: string;
    vendor: string;
    severity: Severity;
    cvss: number;
    summary: string;
    publishedAt: string;
    patched: boolean;
};

export type Topic = { name: string; slug: string; count: number; description: string };

export type Author = {
    name: string;
    slug: string;
    beat: string;
    count: number;
    bio: string;
    links: { label: string; href: string }[];
};

const ARTICLES: Article[] = [
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
        tags: ['ransomware', 'healthcare', 'VPN'],
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
        tags: ['zero-day', 'VPN', 'patching'],
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
        tags: ['phishing', 'passkeys', 'authentication'],
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
        tags: ['zero trust', 'small business', 'identity'],
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
        tags: ['CERT-In', 'compliance', 'India'],
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
        tags: ['supply chain', 'npm', 'CI/CD'],
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
        tags: ['incident response', 'banking', 'CISO'],
    },
];

const BODY: Block[] = [
    {
        type: 'p',
        text: 'This is placeholder copy for layout purposes. Security teams were first alerted early on Saturday, when monitoring tools flagged unusual authentication activity on a remote-access appliance that had missed its last two patch cycles.',
    },
    { type: 'h2', text: 'What we know so far' },
    {
        type: 'p',
        text: 'Investigators believe the intruders harvested credentials weeks earlier and used them to move between internal systems without triggering alerts. By the time encryption began, backup servers had already been reached and their snapshots deleted.',
    },
    {
        type: 'list',
        items: [
            'Initial access came through an internet-facing appliance with a known, patched flaw.',
            'Domain administrator credentials were used within 48 hours of the first login.',
            'Off-site backups were not affected, which shortened recovery for two of the three sites.',
        ],
    },
    {
        type: 'quote',
        text: 'The attackers did not need anything exotic. They needed one forgotten device and a quiet weekend.',
        cite: 'Incident responder familiar with the case',
    },
    { type: 'h2', text: 'What defenders should do now' },
    {
        type: 'p',
        text: "Start with the basics that shorten an intruder's stay: inventory every internet-facing device, apply pending patches, and rotate credentials that were stored on affected systems. Then check that backups can be restored from a clean environment.",
    },
    {
        type: 'list',
        items: [
            'Audit remote-access devices and remove any that are no longer needed.',
            'Alert on new administrator logins from unfamiliar locations.',
            'Test a full restore from off-site backups at least once a quarter.',
        ],
    },
    {
        type: 'p',
        text: 'We will update this story as more technical details are confirmed by the affected organisations and by national response teams.',
    },
];

const TAKEAWAYS = [
    'Patch internet-facing devices first. They are the most common way in.',
    'Keep at least one backup copy that attackers cannot reach from the main network.',
    'Practise recovery before you need it.',
];

const ADVISORIES: Advisory[] = [
    {
        id: 'CVE-2026-41872',
        product: 'Edge VPN Gateway',
        vendor: 'Northgate Networks',
        severity: 'critical',
        cvss: 9.8,
        summary: 'Pre-auth remote code execution in the web management interface.',
        publishedAt: '2026-11-23T10:00:00Z',
        patched: true,
    },
    {
        id: 'CVE-2026-40315',
        product: 'OpenMail Server',
        vendor: 'OpenMail Project',
        severity: 'high',
        cvss: 8.1,
        summary: 'Authentication bypass through a crafted request header.',
        publishedAt: '2026-11-22T13:30:00Z',
        patched: true,
    },
    {
        id: 'CVE-2026-39007',
        product: 'Panelkit CMS',
        vendor: 'Panelkit',
        severity: 'high',
        cvss: 7.5,
        summary: 'Stored cross-site scripting in the admin dashboard.',
        publishedAt: '2026-11-21T09:15:00Z',
        patched: false,
    },
    {
        id: 'CVE-2026-38644',
        product: 'FlowSync Agent',
        vendor: 'FlowSync',
        severity: 'medium',
        cvss: 5.9,
        summary: 'Local privilege escalation on Windows hosts.',
        publishedAt: '2026-11-20T17:45:00Z',
        patched: true,
    },
    {
        id: 'CVE-2026-38120',
        product: 'Lumen Print Server',
        vendor: 'Lumen Systems',
        severity: 'critical',
        cvss: 9.1,
        summary: 'Unauthenticated file write leading to code execution.',
        publishedAt: '2026-11-19T08:00:00Z',
        patched: false,
    },
    {
        id: 'CVE-2026-37755',
        product: 'CloudSafe Sync',
        vendor: 'CloudSafe',
        severity: 'medium',
        cvss: 6.3,
        summary: 'Path traversal when restoring shared folders.',
        publishedAt: '2026-11-18T12:20:00Z',
        patched: true,
    },
    {
        id: 'CVE-2026-37210',
        product: 'RouteWise Router OS',
        vendor: 'RouteWise',
        severity: 'low',
        cvss: 3.7,
        summary: 'Information disclosure in diagnostic logs.',
        publishedAt: '2026-11-17T15:10:00Z',
        patched: true,
    },
    {
        id: 'CVE-2026-36904',
        product: 'Archivio Backup',
        vendor: 'Archivio',
        severity: 'high',
        cvss: 7.8,
        summary: 'Insecure deserialisation in the restore service.',
        publishedAt: '2026-11-16T11:00:00Z',
        patched: false,
    },
];

const TOPICS: Topic[] = [
    {
        name: 'Breaches',
        slug: 'breaches',
        count: 214,
        description: 'Incident reporting and post-mortems on attacks that hit real organisations.',
    },
    {
        name: 'Vulnerabilities',
        slug: 'vulnerabilities',
        count: 386,
        description: 'New flaws, exploited bugs, patches and what to do about them.',
    },
    {
        name: 'Threat Intel',
        slug: 'threat-intel',
        count: 172,
        description: 'Attacker groups, tooling and campaigns, with indicators you can use.',
    },
    {
        name: 'Defence',
        slug: 'defence',
        count: 241,
        description: 'Practical guidance for building and running a security programme.',
    },
    {
        name: 'Policy',
        slug: 'policy',
        count: 96,
        description: 'Regulation, compliance and what new rules mean in practice.',
    },
    {
        name: 'Interviews',
        slug: 'interviews',
        count: 58,
        description: 'Conversations with the people who run security day to day.',
    },
];

const AUTHORS: Author[] = [
    {
        name: 'Meera Iyer',
        slug: 'meera-iyer',
        beat: 'Breaches and policy',
        count: 128,
        bio: 'Meera covers major incidents and the regulation that follows them. She has reported on cybersecurity for nine years.',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com' },
            { label: 'X', href: 'https://x.com' },
        ],
    },
    {
        name: 'Daniel Okafor',
        slug: 'daniel-okafor',
        beat: 'Vulnerability research',
        count: 94,
        bio: 'Daniel tracks newly disclosed flaws and exploited bugs, and reads the advisories so you do not have to.',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com' },
            { label: 'GitHub', href: 'https://github.com' },
        ],
    },
    {
        name: 'Sana Rahman',
        slug: 'sana-rahman',
        beat: 'Defence and interviews',
        count: 81,
        bio: 'Sana writes practical defence guides and interviews security leaders about how they run their teams.',
        links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com' }],
    },
    {
        name: 'Arup Sarkar',
        slug: 'arup-sarkar',
        beat: 'Threat intelligence',
        count: 66,
        bio: 'Arup follows attacker tooling and phishing campaigns, with a focus on authentication.',
        links: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com' },
            { label: 'GitHub', href: 'https://github.com' },
        ],
    },
];

export async function getArticles(): Promise<Article[]> {
    return ARTICLES;
}

export async function getArticle(slug: string): Promise<(Article & { body: Block[]; takeaways: string[] }) | null> {
    const a = ARTICLES.find((x) => x.slug === slug);
    return a ? { ...a, body: BODY, takeaways: TAKEAWAYS } : null;
}

export async function getArticlesByCategory(slug: string): Promise<Article[]> {
    return ARTICLES.filter((a) => a.category.slug === slug);
}

export async function getArticlesByAuthor(slug: string): Promise<Article[]> {
    return ARTICLES.filter((a) => a.author.slug === slug);
}

export async function searchArticles(q: string): Promise<Article[]> {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return ARTICLES.filter((a) =>
        [a.title, a.excerpt, a.category.name, ...a.tags].some((s) => s.toLowerCase().includes(term))
    );
}

export async function getRelated(article: Article, count = 3): Promise<Article[]> {
    const others = ARTICLES.filter((a) => a.slug !== article.slug);
    const same = others.filter((a) => a.category.slug === article.category.slug);
    const rest = others.filter((a) => a.category.slug !== article.category.slug);
    return [...same, ...rest].slice(0, count);
}

export async function getAdvisories(): Promise<Advisory[]> {
    return ADVISORIES;
}

export async function getTopics(): Promise<Topic[]> {
    return TOPICS;
}

export async function getTopic(slug: string): Promise<Topic | null> {
    return TOPICS.find((t) => t.slug === slug) ?? null;
}

export async function getAuthors(): Promise<Author[]> {
    return AUTHORS;
}

export async function getAuthor(slug: string): Promise<Author | null> {
    return AUTHORS.find((a) => a.slug === slug) ?? null;
}
