export function RenderFeatures() {
    const features = ['Themed colors for both Light and Dark mode',
        'Heading and body font, already paired',
        'Status colors paired with themes',
        "Browse themes by what you're building",
        'Copy in format you will use'
    ]
    const formatStyles = 'bg-(--accent-bg) text-(--accent-fg) px-2 py-1 rounded'
    return (
        <section className="p-2 self-start flex flex-col gap-4">
            <h4 className="py-4 text-xl font-bold"><span className="text-(--accent-bg)">#</span> What you actually get</h4>
            <ul className="sec-font flex flex-col gap-2 text-(--surface-muted-fg)">
                {features.map(f => {
                    return (
                        <li className="text-sm" key={f}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24" className="inline-block m-1 text-(--primary-bg)">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.751 1.375c-.025 6.281 3.029 9.844 10 10c-6.465-.025-9.672 3.441-10 10c-.063-6.187-2.828-10.009-10-10c6.416-.09 9.975-3.187 10-10m8.261 0v4m-2-2h4m.238 15.25v4m-2-2h4"></path>
                            </svg>
                            <span>{f}</span>
                        </li>
                    )
                })}
            </ul>
            <span className="text-xs flex flex-wrap gap-2 items-center">
                <span className={formatStyles}>Tailwind config </span>
                |
                <span className={formatStyles}>CSS variables</span>
                |
                <span className={formatStyles}>Simple array</span>
                |
                <span className={formatStyles}> JSON</span></span>
        </section>
    )
}