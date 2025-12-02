import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
    title: string;
    date: string;
    description: string;
}

export interface Post {
    slug: string;
    metadata: PostMetadata;
    Component: React.ComponentType;
}

export async function getPostSlugs() {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const realSlug = slug.replace(/\.mdx$/, '');
    // Dynamic import requires a template string with a variable that webpack can analyze
    // We use @/posts alias which points to the posts directory
    const { default: Component, metadata } = await import(`@/posts/${realSlug}.mdx`);

    return {
        slug: realSlug,
        metadata,
        Component,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const slugs = await getPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

    return posts.sort((a, b) => {
        if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
        }
        return 1;
    });
}
