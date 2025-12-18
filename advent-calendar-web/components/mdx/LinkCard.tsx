import * as cheerio from 'cheerio';
import Image from 'next/image';

interface LinkCardProps {
    url: string;
}

async function fetchOgp(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const html = await res.text();
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text();
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        return { title, description, image };
    } catch (error) {
        console.error('Failed to fetch OGP:', error);
        return null;
    }
}

export async function LinkCard({ url }: LinkCardProps) {
    const ogp = await fetchOgp(url);

    if (!ogp) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="block my-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <span className="font-bold block">{url}</span>
            </a>
        );
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="group block my-6 not-prose">
            <span className="flex flex-col sm:flex-row border rounded-lg overflow-hidden hover:bg-muted/50 transition-colors bg-card text-card-foreground shadow-sm">
                {ogp.image && (
                    <span className="relative w-full sm:w-[260px] aspect-[1.91/1] sm:aspect-auto shrink-0 border-b sm:border-b-0 sm:border-r block">
                        <Image
                            src={ogp.image}
                            alt={ogp.title || ''}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </span>
                )}
                <span className="flex-1 p-4 flex flex-col justify-center min-h-[120px]">
                    <span className="font-bold text-lg line-clamp-1 mb-2 group-hover:underline decoration-primary underline-offset-4 block">
                        {ogp.title}
                    </span>
                    {ogp.description && (
                        <span className="text-muted-foreground text-sm line-clamp-2 mb-2 block">
                            {ogp.description}
                        </span>
                    )}
                    <span className="text-xs text-muted-foreground mt-auto flex items-center gap-1">
                        {new URL(url).hostname}
                    </span>
                </span>
            </span>
        </a>
    );
}
