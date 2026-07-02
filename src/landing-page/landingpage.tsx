import { RenderLandingCards } from "./landingcards"
import { RenderFeatures } from "./RenderFeatures"
import { RenderAboutSection } from "./RenderAbout"
import { RenderFooter } from "./Renderfooter"
export function RenderLandingPage() {
    return <RenderMain />
}

function RenderMain() {
    return (
        <section className=" py-4 sm:py-6 sm:px-6 px-4 gap-6
        flex flex-col items-center justify-center w-screen max-w-300 m-auto">
            <main className="sm:grid sm:grid-cols-2 flex flex-wrap items-center px-4 py-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-widest">Fauna<span className="text-(--accent-bg)">UI</span></h1>
                    <h2 className="text-lg sec-font text-(--surface-fg) tracking-wide">
                        Tired of vague color swatches that don't tell you anything?
                    </h2>
                    <h3 className="text-md sec-font text-(--surface-muted-fg) tracking-tight">
                        Pick a theme. Watch it take over the page. Get back to work.
                    </h3>
                </div>
                <div className="sm:ml-auto py-2 sm:p-4 flex gap-4">
                    <button className="bg-(--accent-bg) text-(--accent-fg)
                    sm:py-1 px-2 rounded-lg">Browse Themes</button>
                    <button className="bg-(--primary-bg) text-(--primary-fg) px-2 rounded">Github</button>
                </div>
            </main>
            <RenderLandingCards />
            <hr className="m-6 w-full opacity-30" />
            <RenderFeatures />
            <RenderAboutSection />
            <hr className="m-6 w-full opacity-30" />
            <RenderFooter />
        </section >
    )
}