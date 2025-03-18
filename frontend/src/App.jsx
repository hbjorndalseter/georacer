import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { ToastContainer } from 'react-toastify';

import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/Play" element={<PlayPage />} />
            <Route path="/Result" element={<ResultPage />} />
          </Routes>
        </div>
      </PlayerProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
