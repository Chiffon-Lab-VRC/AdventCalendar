import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
    type?: 'default' | 'info' | 'warning' | 'error' | 'success';
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const icons = {
    default: Info,
    info: Info,
    warning: AlertCircle,
    error: XCircle,
    success: CheckCircle,
};

const styles = {
    default: 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50',
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-50',
    warning: 'border-[#ff976b] bg-[#ff976b] text-neutral-900 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-50',
    error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/30 dark:text-red-50',
    success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/30 dark:text-green-50',
};

export function Callout({
    type = 'default',
    title,
    children,
    className,
}: CalloutProps) {
    const Icon = icons[type];

    return (
        <div
            className={cn(
                'my-6 flex items-start rounded-lg border p-4',
                styles[type],
                className
            )}
        >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="ml-4 grid gap-1.5">
                {title && <h5 className="font-medium leading-none tracking-tight">{title}</h5>}
                <div className="text-sm [&>p:last-child]:mb-0 [&>p:first-child]:mt-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
