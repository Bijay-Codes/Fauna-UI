import { RenderCards } from './components/RenderCard'
import { RenderSearch } from './components/RenderSearch'
import { RenderCategory } from './components/RenderCategory'
function App() {
    return (
        <div className='sm:p-8'>
            <RenderSearch homepage={true} />
            {/* <img src="/assets/Whale.svg" alt="" className='fixed -z-1 w-400 aspect-square rotate-80' /> */}
            <RenderCards />
            <RenderCategory homeview={true} />
        </div>
    )
}

export default App
