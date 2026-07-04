export function RenderAboutSection() {
    return (
        <article className="bg-(--surface-bg) rounded pb-4 px-4">
            <h4 className="text-2xl py-4 font-bold">
                <span className="text-(--accent-bg)">#</span> Why this Exists
            </h4>
            <div className="text-lg text-(--surface-muted-fg) flex flex-col gap-6">
                <p>
                    I was tired of asking <strong>AI</strong> for color and font pairings only to get back raw <strong>Hex</strong> codes,
                    non-accessible contrast ratios, and mismatched fonts—forcing me to spend more time
                    tweaking them than actually writing code.
                </p>
                <hr className="opacity-30 border border-(--border)" />
                <p>
                    I built this to get straight to work. These are pre-made, accessible themes that look
                    great out of the box. Just pick a style and grab the code in your preferred format—
                    <em className="font-bold">Tailwind, CSS variables, or JSON</em>—complete with
                    all the font imports you need.
                </p>
                <hr className="opacity-30 border border-(--border)" />
                <p>
                    Stop wasting time manually converting colors and checking contrast.
                    Get the design done so you can focus on building.
                </p>
                <p>Want to check out how much effort it took to build this? check out my
                    <a href="https://github.com/Bijay-Codes/Fauna-UI/blob/main/Journey.md" className="underline font-extrabold underline-offset-8 hover:text-(--accent-bg)"> Documentation ↗</a>
                </p>
            </div>

        </article >
    )
}