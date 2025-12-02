import type { MDXComponents } from 'mdx/types'
import { CustomImage } from '@/components/mdx/CustomImage'
import { Callout } from '@/components/mdx/Callout'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Image: CustomImage,
        Callout: Callout,
    }
}
