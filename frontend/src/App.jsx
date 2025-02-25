import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './pages/StartPage';
import PlayPage from './pages/PlayPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/Play" element={<PlayPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
