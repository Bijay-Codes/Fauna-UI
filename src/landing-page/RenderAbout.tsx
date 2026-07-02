export function RenderAboutSection() {
    return (
        <article className="bg-(--surface-bg) rounded pb-4 px-4">
            <h4 className="text-xl py-4 font-bold"><span className="text-(--accent-bg) ">#</span> Why this Exists</h4>
            <div className="text-sm text-(--surface-muted-fg) flex flex-col gap-6">
                <p>
                    Every time I started a new project I'd ask AI to suggest a color palette and fonts.
                    It worked, kind of — except the colors almost always came back as hex, not OKLCH,
                    and I'd have to ask again, and then convert, and then check contrast,
                    and by that point I just wanted to be in my editor already.
                </p>
                <p>
                    So I built the thing I actually wanted: pre-made themes that already look good, already pass contrast,
                    already have fonts picked, and let you copy in whatever format your codebase actually uses — Tailwind config,
                    CSS variables, or JSON if you want to take it somewhere else.
                    Font import links included.
                </p>
                <p>
                    Describe your project to an AI,
                    get colors back, convert them, check contrast, pick fonts, import them — Nope i dont have that much paitence when i just want to build sites fast to learn new things.
                </p>
            </div>
        </article>
    )
}