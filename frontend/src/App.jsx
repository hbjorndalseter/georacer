import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { ToastContainer } from 'react-toastify';
import ResultPage from './pages/ResultPage';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/Game" element={<GamePage />} />
            <Route path="/Result" element={<ResultPage />} />
            <Route path="/Settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </PlayerProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
