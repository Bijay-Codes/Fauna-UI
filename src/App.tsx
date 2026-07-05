import { RenderCards } from './components/RenderCard'
import { RenderSearch } from './components/RenderSearch'
import { RenderCategory } from './components/RenderCategory'
function App() {
    return (
        <main className='sm:p-8 md:flex flex-col items-center'>
            <RenderSearch homepage={true} />
            <RenderCards />
            <RenderCategory />
        </main>
    )
}

export default App
