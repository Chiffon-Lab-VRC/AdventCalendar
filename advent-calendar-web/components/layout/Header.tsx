import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
            <div className="container flex h-16 max-w-screen-xl items-center px-4">
                <div className="mr-8 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                            <CalendarDays className="h-5 w-5" />
                        </div>
                        <span className="hidden font-bold text-xl tracking-tight text-gray-900 sm:inline-block">
                            しふぉんらぼ ぶいみみアドベントカレンダー
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/editor"
                            className="transition-colors hover:text-orange-600 text-gray-600"
                        >
                            Editor
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-orange-600 text-gray-600"
                        >
                            About
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
