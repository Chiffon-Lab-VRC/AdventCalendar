'use client';

import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, Image as ImageIcon } from 'lucide-react';
import { CustomImage } from '@/components/mdx/CustomImage';

interface EditorProps {
    initialContent?: string;
    initialSlug?: string;
}

export function Editor({ initialContent = '', initialSlug = '' }: EditorProps) {
    const [content, setContent] = useState(initialContent);
    const [slug, setSlug] = useState(initialSlug);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // デフォルトのテンプレート
    useEffect(() => {
        if (!content) {
            const today = new Date().toISOString().split('T')[0];
            setContent(`export const metadata = {
  title: 'タイトル',
  date: '${today}',
  description: '説明文',
}

# タイトル

ここに記事を書きます。
`);
        }
    }, []);

    const handleSave = useCallback(async () => {
        if (!slug) {
            setMessage('スラッグ（ファイル名）を入力してください');
            return;
        }

        setIsSaving(true);
        setMessage('保存中...');

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ slug, content }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('保存しました！');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(`エラー: ${data.error}`);
            }
        } catch (error) {
            setMessage('保存に失敗しました');
        } finally {
            setIsSaving(false);
        }
    }, [slug, content]);

    // 画像アップロード処理
    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setMessage('画像をアップロード中...');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // MDXコードを生成してエディタに挿入
                const imageCode = `\n<Image src="${data.path}" alt="画像の説明" width={800} height={600} />\n`;
                setContent(prev => prev + imageCode);
                setMessage('画像を挿入しました！');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(`エラー: ${data.error}`);
            }
        } catch (error) {
            setMessage('画像のアップロードに失敗しました');
        } finally {
            setIsUploading(false);
        }
    }, []);

    // Ctrl+S で保存
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSave]);

    // プレビュー用のコンポーネントマッピング
    const PreviewComponents = {
        img: (props: any) => <CustomImage {...props} />,
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Editing:</span>
                        <code className="rounded bg-muted px-2 py-1 text-sm">{slug}.mdx</code>
                    </div>
                    <span className="text-sm text-muted-foreground">{message}</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
                        <ImageIcon className="h-4 w-4" />
                        {isUploading ? 'Uploading...' : 'Insert Image'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploading}
                        />
                    </label>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/2 border-r bg-muted/30">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm focus:outline-none"
                        placeholder="Write your MDX here..."
                    />
                </div>
                <div className="w-1/2 overflow-y-auto p-8">
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        {/* メタデータ部分を隠す簡易的な処理 */}
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={PreviewComponents}
                        >
                            {content.replace(/export const metadata = \{[\s\S]*?\}/, '')}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
