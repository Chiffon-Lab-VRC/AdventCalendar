import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug).catch(() => null);

    if (!post) {
        return {};
    }

    return {
        title: post.metadata.title,
        description: post.metadata.description,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug).catch(() => null);

    if (!post) {
        notFound();
    }

    const { Component, metadata } = post;

    return (
        <article className="container max-w-3xl py-6 lg:py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {metadata.title}
                </h1>
                <p className="text-muted-foreground">
                    {metadata.date}
                </p>
            </div>
            <hr className="my-8 border-border" />
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <Component />
            </div>
        </article>
    );
}
