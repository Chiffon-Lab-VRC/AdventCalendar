'use client';

import { useEffect, useState } from 'react';

interface SidebarProps {
    authorName: string;
    authorBio: string;
    authorAvatar?: string;
}

export function Sidebar({ authorName, authorBio, authorAvatar }: SidebarProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -35% 0px',
            }
        );

        // すべての見出しを監視
        const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
        headings.forEach((heading) => observer.observe(heading));

        return () => {
            headings.forEach((heading) => observer.unobserve(heading));
        };
    }, []);

    const tocItems = [
        { id: 'はじめに', label: 'はじめに', level: 1 },
        { id: 'この記事で話すこと', label: 'この記事で話すこと', level: 1 },
        { id: 'ますはじめに', label: 'ますはじめに', level: 1 },
        { id: 'google-antigravityってなんぞや', label: 'Google Antigravityってなんぞや？', level: 2 },
        { id: 'これをつかって何ができる', label: 'これをつかって何ができる？', level: 2 },
        { id: 'antigravityのすげーとこ', label: 'Antigravityのすげーとこ！', level: 1 },
        { id: '1まず設計から手伝ってくれる', label: '1. まず設計から手伝ってくれる！', level: 2 },
        { id: '2環境構築までしてくれる', label: '2. 環境構築までしてくれる！', level: 2 },
        { id: '3エラーの修正が自動', label: '3. エラーの修正が自動！', level: 2 },
        { id: '4指示が割と適当でも何とかなる時がある', label: '4. 指示が割と適当でも何とかなる！', level: 2 },
        { id: 'まとめ', label: 'まとめ', level: 1 },
    ];

    return (
        <aside className="sticky top-20 space-y-6">
            {/* 自己紹介 */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-neutral-900">著者について</h3>
                {authorAvatar && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={authorAvatar}
                            alt={authorName}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>
                )}
                <p className="mb-2 text-center font-medium text-neutral-900">{authorName}</p>
                <p className="text-sm leading-relaxed text-neutral-600">{authorBio}</p>
            </div>

            {/* 目次 */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-neutral-900">目次</h3>
                <nav className="space-y-1">
                    {tocItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`group relative flex items-center py-1.5 text-sm transition-colors ${item.level === 2 ? 'ml-4' : ''
                                } ${activeId === item.id
                                    ? 'font-medium text-orange-600'
                                    : 'text-neutral-600 hover:text-orange-600'
                                }`}
                        >
                            {/* 左側のバー */}
                            <div
                                className={`absolute -left-6 h-full w-0.5 transition-all ${activeId === item.id ? 'bg-orange-500' : 'bg-transparent'
                                    }`}
                            />
                            {/* 丸印 */}
                            {activeId === item.id && (
                                <div className="absolute -left-[27px] h-2 w-2 rounded-full bg-orange-500" />
                            )}
                            <span className="block truncate">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
