export function RenderLandingPage() {
    return <RenderMain />
}

function RenderMain() {
    return (
        <section className=" p-4 sm:p-6 max-w-300
        flex flex-col items-center
         ">
            <main className="sm:grid sm:grid-cols-2 flex flex-wrap justify-center items-center">
                <div>
                    <h1>Fauna UI</h1>
                    <p>Tired of vague color swatches that don't tell you anything?</p>
                    <h2>Pick a theme. See it actually work. Get back to code.</h2>
                </div>
                <div className="ml-auto p-4 flex gap-4">
                    <button className="bg-(--primary-bg) text-(--primary-fg)
                    py-1 px-2 rounded-lg">Browse Themes</button>
                    <button className="bg-(--secondary-bg) text-(--secondary-fg) px-2 rounded">Github</button>
                </div>
            </main>
            <hr className="bg-amber-50 m-6 w-full" />
            <p>
                No more guessing, no more manual contrast checks, no more hex in 2026 —
                just OKLCH themes that are already tested, already paired with fonts,
                and ready to use.
            </p>
        </section >
    )
}