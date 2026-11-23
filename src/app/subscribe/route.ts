// app/subscribe/route.ts
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
    const form = await req.formData();
    const email = String(form.get('email') ?? '')
        .trim()
        .toLowerCase();

    if (!EMAIL_RE.test(email) || email.length > 254) {
        return NextResponse.redirect(new URL('/subscribe/confirmed?status=invalid', req.url), 303);
    }

    // TODO: call your Express API, e.g.
    // await fetch(`${process.env.API_URL}/public/subscribers`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, source: "website" }),
    // });
    // The API should store the address as "pending" and send a confirmation email (double opt-in).
    // Also add rate limiting here or at the API, since this endpoint is public.

    return NextResponse.redirect(new URL('/subscribe/confirmed?status=ok', req.url), 303);
}

// Opening /subscribe directly sends people to the form.
export async function GET(req: Request) {
    return NextResponse.redirect(new URL('/#newsletter', req.url), 307);
}
