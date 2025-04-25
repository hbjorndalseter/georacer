import { useEffect, useState } from 'react';
import DeletePlayersModal from '../components/DeletePlayersModal.jsx';
import NavigateHome from '../components/NavigateHomeButton.jsx'; 

export default function SettingsPage() {
  const [adminVerified, setAdminVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [cityMaps, setCityMaps] = useState([]);
  const [selectedCityMapId, setSelectedCityMapId] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [selectedMapName, setSelectedMapName] = useState('');

  useEffect(() => {
    if (adminVerified) {
      fetch(`${import.meta.env.VITE_API_URL}/city-maps`)
        .then(res => res.json())
        .then(data => setCityMaps(data))
        .catch(err => setStatus('Kunne ikke hente kart'));
    }
  }, [adminVerified]);

  const verifyAdmin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAdminVerified(true);
      setStatus('');
    } else {
      setStatus('Feil passord');
    }
  };

  const resetPlayers = () => {
    if (!selectedCityMapId) {
      setStatus('Velg et kart først');
      return;
    }
  
    const selectedMap = cityMaps.find(map => map.id === Number(selectedCityMapId));
    setSelectedMapName(selectedMap?.name || '');
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/players/${selectedCityMapId}`, {
      method: 'DELETE',
    });
  
    const data = await res.json();
    if (data.success) {
      setStatus(`Spillere slettet for kart: ${selectedMapName}`);
    } else {
      setStatus('Feil ved sletting av spillere');
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-[#1b325e] via-[#3a538c] to-[#1b325e] flex flex-col items-center pt-10">
      <p className="text-white text-4xl font-bold text-center mb-6">
        Adminpanel
      </p>

      {!adminVerified ? (
        <div className="w-full max-w-md space-y-4 px-6">
          <input
            type="password"
            placeholder="Passord"
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={verifyAdmin}
            className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition"
          >
            Verifiser
          </button>
        </div>
      ) : (
        <>
        <div className="w-full max-w-md space-y-4 px-6 justify-center">
          <select
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={selectedCityMapId || ''}
            onChange={(e) => setSelectedCityMapId(e.target.value)}
          >
            <option value="" disabled>-- Velg kart --</option>
            {cityMaps.map(map => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>
          <button
            onClick={resetPlayers}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
          >
            Slett spillere for valgt kart
          </button>
        </div>
        <div className='mb-0'>
            <NavigateHome />
        </div>
        </>
      )}

      {status && (
        <p className="text-green-400 text-center mt-6">{status}</p>
      )}

      {showModal && (
        <DeletePlayersModal
          mapName={selectedMapName}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}