export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-6 border-t border-zinc-800/80 bg-zinc-900/40 px-4 py-4 text-xs text-zinc-400 sm:px-4 lg:px-8 xl:px-16">
            <div >
                <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
                        <p className="text-md uppercase tracking-wide text-zinc-500">Follow</p>
                        <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <a
                                className="underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-200"
                                href="https://github.com/kevintimachy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                className="underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-200"
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                        </nav>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
                        <p className="text-md uppercase tracking-wide text-zinc-500">Attribution</p>
                        <nav aria-label="Attribution links" className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
                            <a
                                className="underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-200"
                                href="https://openweathermap.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                OpenWeather
                            </a>
                            <a
                                className="underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-200"
                                href="https://leafletjs.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Leaflet
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="h-px w-full bg-zinc-800/80" />
                <p className="pt-3 text-center">Weather Map • &copy; Kevin Timachy • {year}</p>
            </div>
        </footer>
    );
}
