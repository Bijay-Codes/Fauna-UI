import { RenderCards } from './components/RenderCard'
import { RenderSearch } from './components/RenderSearch'
import { RenderCategory } from './components/RenderCategory'
function App() {
    return (
        <main className='sm:p-8'>
            <RenderSearch homepage={true} />
            <RenderCards />
            <RenderCategory homeview={true} />
        </main>
    )
}

export default App
