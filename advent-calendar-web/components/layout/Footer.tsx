export function Footer() {
    return (
        <footer className="border-t border-orange-100 bg-orange-50/30 py-12 md:py-16">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
                    Built by{' '}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-500"
                    >
                        You
                    </a>
                    . The source code is available on{' '}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-500"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
}
