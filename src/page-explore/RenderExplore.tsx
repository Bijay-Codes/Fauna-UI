import { RenderCard } from "../components/RenderCard";
import { colorAnim } from "../Data/animalsData";
import { RenderSearch } from "../components/RenderSearch";
export function RenderExplore() {
    return (
        <div className="flex flex-col items-center gap-0">
            <RenderSearch />
            <main className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-2 mt-6 max-w-[80%] m-auto">

                {
                    colorAnim.map(data => {
                        return <RenderCard key={data.id} data={data} />
                    })
                }
            </main>
        </div>
    )
}