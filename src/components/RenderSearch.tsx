export function RenderSearch() {
    return (
        <div className="p-2 m-2 rounded-lg">
            <input type="seach"
                placeholder="Search"
                className="bg-(--surface-bg) p-2
                 rounded-l-lg pl-1 sm:max-w-[60%] w-full" />
            <button className="bg-(--surface-bg) rounded-r-full p-2">Search</button>
        </div>
    )
}