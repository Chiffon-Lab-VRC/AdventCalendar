'use client';

import { useEffect, useState } from 'react';

interface SidebarProps {
    authorName: string;
    authorBio: string;
    authorAvatar?: string;
}

interface TocItem {
    id: string;
    label: string;
    level: number;
}

export function Sidebar({ authorName, authorBio, authorAvatar }: SidebarProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [tocItems, setTocItems] = useState<TocItem[]>([]);

    useEffect(() => {
        // 見出しを動的に取得
        const elements = Array.from(document.querySelectorAll('.prose h1, .prose h2, .prose h3'));
        const items = elements.map((element) => {
            const clone = element.cloneNode(true) as HTMLElement;
            const anchor = clone.querySelector('.anchor-link');
            if (anchor) anchor.remove();
            return {
                id: element.id,
                label: clone.textContent || '',
                level: Number(element.tagName.substring(1)),
            };
        }).filter(item => item.id); // IDがないものは除外

        setTocItems(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66% 0px',
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
            window.history.pushState(null, '', `#${id}`);
        }
    };

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
                            onClick={(e) => handleClick(e, item.id)}
                            className={`group relative flex items-center py-1.5 text-sm transition-colors ${item.level >= 2 ? 'ml-4' : ''
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
