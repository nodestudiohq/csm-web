import { Suspense } from 'react';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default function PostPage({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostContent params={params} />
        </Suspense>
    );
}

async function PostContent({ params }: Props) {
    const { slug } = await params;

    return (
        <div>
            <h1>Post: {slug}</h1>
        </div>
    );
}
