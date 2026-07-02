export function RenderFooter() {
    return (
        <div className="flex flex-col gap-2 px-2 py-4 text-sm w-full text-center">
            <p>Built solo, shaped by feedback.</p>
            <p className="sec-font opacity-60" >
                Have a theme idea, found a bug, or want to suggest something?{" "}
                <a href="https://github.com/Bijay-Codes/fauna-ui/issues" className="underline"
                    target="_blank">
                    Open an issue on GitHub —
                </a>{" "}
            </p>
            <div className="flex gap-4 items-center justify-center sec-font opacity-60">
                <a href="https://github.com/Bijay-Codes/fauna-ui" className="underline"
                    target="_blank">
                    GitHub ↗
                </a>
                <a href="https://github.com/Bijay-Codes/fauna-ui/blob/main/LICENSE" className="underline"
                    target="_blank">
                    MIT License ↗
                </a>
            </div>

            <p className="text-xs mt-2 sec-font opacity-60 text-shadow-black text-shadow-2xs">
                © 2026 Bijay. Built with React | Typescript & Tailwind.
            </p>
        </div>
    )
}
