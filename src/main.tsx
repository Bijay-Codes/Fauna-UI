import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { RenderExplore } from './page-explore/RenderExplore.tsx';
import { RenderNav } from './components/RenderNav.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RenderDetail } from './page-explore/RenderDetail.tsx';
import { TestApp } from './Data/ThemeGenerator.jsx';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RenderNav />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path='/explore' element={<RenderExplore />} />
      <Route path='/community' element={<div>Coming soon mew</div>} />
      <Route path='/explore/:id' element={<RenderDetail />} />
      <Route path='/home/test' element={<TestApp />} />
    </Routes>
  </BrowserRouter>
)