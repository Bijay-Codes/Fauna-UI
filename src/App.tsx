import './App.css'
import { RenderCards } from './components/RenderCard'
import { RenderSearch } from './components/RenderSearch'
import { RenderCategory } from './components/RenderCategory'
function App() {
    return (
        <div className='flex flex-col gap-2'>
            <RenderSearch />
            <RenderCards />
            <RenderCategory homeview={true} />
        </div>
    )
}

export default App
