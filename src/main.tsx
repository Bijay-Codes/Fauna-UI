import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { RenderExplore } from './page-explore/RenderExplore.tsx';
import { RenderNav } from './components/RenderNav.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RenderDetail } from './page-explore/RenderDetail.tsx';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RenderNav />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path='/explore' element={<div className='flex items-center justify-center'><RenderExplore /></div>} />
      <Route path='/explore/:id' element={<RenderDetail />} />
    </Routes>
  </BrowserRouter>
)