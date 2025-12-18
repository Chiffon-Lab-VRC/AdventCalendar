import type { MDXComponents } from 'mdx/types'
import { CustomImage } from '@/components/mdx/CustomImage'
import { Callout } from '@/components/mdx/Callout'
import { CustomLink } from '@/components/mdx/CustomLink'
import { LinkCard } from '@/components/mdx/LinkCard'
import { Children, isValidElement } from 'react'

function getText(children: React.ReactNode): string {
    let text = ''
    Children.forEach(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
            text += child
        } else if (isValidElement(child) && (child as React.ReactElement<{ children?: React.ReactNode }>).props.children) {
            text += getText((child as React.ReactElement<{ children?: React.ReactNode }>).props.children)
        }
    })
    return text
}

function generateId(text: string): string {
    return text
        .toString()
        .toLowerCase()
        // スペースをハイフンに、それ以外の特殊文字をなるべく残しつつ、IDとして不適切なものを削除
        // 日本語を含むため、英数字、ハイフン、アンダースコア、日本語文字を許可
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    // 簡易的な実装です。重複回避はしていませんが、ブログの規模なら問題ないでしょう。
}

const createHeading = (Tag: 'h1' | 'h2' | 'h3') => {
    const Heading = ({ children }: { children?: React.ReactNode }) => {
        const text = getText(children);
        const id = generateId(text);
        return <Tag id={id} className="scroll-mt-24 relative group">
            {children}
            <a href={`#${id}`} className="anchor-link absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground p-1">
                #
            </a>
        </Tag>;
    };
    Heading.displayName = Tag;
    return Heading;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Image: CustomImage,
        Callout: Callout,
        a: CustomLink,
        LinkCard: LinkCard,
        h1: createHeading('h1'),
        h2: createHeading('h2'),
        h3: createHeading('h3'),
    }
}
