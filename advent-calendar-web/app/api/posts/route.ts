import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { slug, content } = await request.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: 'Slug and content are required' },
                { status: 400 }
            );
        }

        // 安全なファイル名を生成
        const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
        const postsDirectory = path.join(process.cwd(), 'posts');
        const filePath = path.join(postsDirectory, `${safeSlug}.mdx`);

        // postsディレクトリが存在しない場合は作成
        if (!fs.existsSync(postsDirectory)) {
            fs.mkdirSync(postsDirectory, { recursive: true });
        }

        fs.writeFileSync(filePath, content, 'utf8');

        return NextResponse.json({ success: true, message: 'Post saved successfully' });
    } catch (error) {
        console.error('Error saving post:', error);
        return NextResponse.json(
            { error: 'Failed to save post' },
            { status: 500 }
        );
    }
}
