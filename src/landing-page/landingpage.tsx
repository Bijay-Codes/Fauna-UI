import { RenderLandingCards } from "./landingcards"
export function RenderLandingPage() {
    return <RenderMain />
}

function RenderMain() {
    return (
        <section className=" py-4 sm:py-6
        flex flex-col items-center justify-center w-screen max-w-300 m-auto
         ">
            <main className="sm:grid sm:grid-cols-2 flex flex-wrap justify-center items-center px-4 py-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-widest">Fauna UI</h1>
                    <h2 className="text-xl sec-font">Tired of vague color swatches that don't tell you anything?</h2>
                    <h3 className="text-lg">Pick a theme, See it actually work. Get back to work.</h3>
                </div>
                <div className="sm:ml-auto py-2 sm:p-4 flex gap-4">
                    <button className="bg-(--primary-bg) text-(--primary-fg)
                    sm:py-1 px-2 rounded-lg">Browse Themes</button>
                    <button className="bg-(--secondary-bg) text-(--secondary-fg) px-2 rounded">Github</button>
                </div>
            </main>
            <RenderLandingCards />
            <hr className="bg-amber-50 m-6 w-full" />
        </section >
    )
}