import NextImage, { ImageProps } from 'next/image';

export function CustomImage({ alt, ...props }: ImageProps) {
    return (
        <div className="my-8 w-full">
            <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-lg">
                <NextImage
                    className="w-full h-auto"
                    alt={alt || ''}
                    {...props}
                />
            </div>
        </div>
    );
}
