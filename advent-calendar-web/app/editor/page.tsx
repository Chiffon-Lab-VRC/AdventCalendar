import { Editor } from '@/components/editor/Editor';
import fs from 'fs';
import path from 'path';

export const metadata = {
    title: 'Editor - Advent Calendar',
};

async function getInitialContent() {
    try {
        const filePath = path.join(process.cwd(), 'posts', 'index.mdx');
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
    } catch (error) {
        console.error('Failed to read index.mdx', error);
    }
    return '';
}

export default async function EditorPage() {
    const initialContent = await getInitialContent();

    return (
        <div className="min-h-screen bg-background">
            <Editor initialContent={initialContent} initialSlug="index" />
        </div>
    );
}
