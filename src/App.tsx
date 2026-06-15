import './App.css'
import { RenderCards } from './components/RenderCard'
import { RenderNav } from './components/RenderNav'
import { RenderSearch } from './components/RenderSearch'
function App() {
    return (
        <div>
            <RenderNav />
            <RenderSearch />
            <RenderCards />
        </div>
    )
}

export default App
