import { RenderCard } from "../components/RenderCard";
import { colorAnim } from "../Data/animalsData";

export function RenderExplore() {
    return (
        <main className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-2 mt-6 max-w-[80%] m-auto">

            {
                colorAnim.map(data => {
                    return <RenderCard key={data.id} data={data} />
                })
            }
        </main>
    )
}