export function Footer() {
    return (
        <footer className="border-t border-orange-100 bg-orange-50/30 py-12 md:py-16">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-gray-500">
                    Copyright© 2025{' '}
                    <a
                        href="https://buicha.social/@Chiffon1204"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-500"
                    >
                        ChiffonLaboratory
                    </a>
                    {' '}All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
