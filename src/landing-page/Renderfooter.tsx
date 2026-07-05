export function RenderFooter() {
    return (
        <div className="flex flex-col gap-2 px-2 py-4 w-full text-center">
            <p className="text-lg">Built solo, shaped by feedback.</p>
            <p className="sec-font opacity-80 text-md" >
                Have a theme idea, found a bug, or want to suggest something?
                <a
                    href="https://github.com/Bijay-Codes/fauna-ui/issues"
                    className="underline underline-offset-8 hover:text-(--primary-bg)"
                    target="_blank">
                    Open an issue on GitHub
                </a>
            </p>
            <div
                className="flex gap-4 text-sm items-center justify-center sec-font opacity-90">
                <a href="https://github.com/Bijay-Codes/fauna-ui"
                    className="underline underline-offset-8 hover:text-(--accent-bg) self-start"
                    target="_blank">
                    GitHub ↗
                </a>
                <a
                    href="https://github.com/Bijay-Codes/fauna-ui/blob/main/LICENSE"
                    className="underline underline-offset-8 hover:text-(--accent-bg)"
                    target="_blank">
                    MIT License ↗
                </a>
            </div>

            <p className="text-sm mt-2 sec-font opacity-80">
                © 2026 Bijay. Built with React | Typescript & Tailwind.
            </p>
        </div>
    )
}
