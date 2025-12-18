import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CustomLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <span className={className} {...props}>{children}</span>;
  }

  const isExternal = href.startsWith('http') || href.startsWith('//');

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn("inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn("font-medium text-primary underline underline-offset-4 hover:text-primary/80", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
