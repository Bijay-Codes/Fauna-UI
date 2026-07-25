import { RenderCards } from './components/RenderCard'
import { RenderSearch } from './components/RenderSearch'
import { RenderCategory } from './components/RenderCategory'
function App() {
    return (
        <main className='sm:p-8 overflow-x-hidden'>
            <RenderSearch homepage={true} />
            <RenderCards />
            <RenderCategory />
        </main>
    )
}

export default App
