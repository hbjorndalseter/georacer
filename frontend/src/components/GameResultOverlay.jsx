import React from 'react';
import { useNavigate } from "react-router-dom";

export default function GameResultOverlay({ currentPlayer, distance, correctAnswers, currentScore, isHighscore }) {

  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-11/12 max-w-md">
        {isHighscore ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎉 HIGHSCORE!</h2>
            <p className="mb-2">
              <span className="text-white/70">Total distanse kjørt:</span>{" "}
              <span className="font-semibold text-white">{Math.round(distance)} meter</span>
            </p>
            <p className="mb-2">
              <span className="text-white/70">Antall riktige svar:</span>{" "}
              <span className="font-semibold text-white">{correctAnswers}</span>
            </p>
            <p className="mb-4">
              <span className="text-white/70">Total score:</span>{" "}
              <span className="font-semibold text-white">{currentScore}</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Spillet er over, {currentPlayer.name}!</h2>
            <p className="mb-2">
              <span className="text-white/70">Total distanse kjørt:</span>{" "}
              <span className="font-semibold text-white">{Math.round(distance)} meter</span>
            </p>
            <p className="mb-2">
              <span className="text-white/70">Antall riktige svar:</span>{" "}
              <span className="font-semibold text-white">{correctAnswers}</span>
            </p>
            <p className="mb-4">
              <span className="text-white/70">Total score:</span>{" "}
              <span className="font-semibold text-white">{currentScore}</span>
            </p>
            <p className="mb-4">
              <span className="text-white/70">Din Highscore:</span>{" "}
              <span className="font-semibold text-white">{currentPlayer.score}</span>
            </p>
          </>
        )}
        <div className="flex justify-evenly">
          <button onClick={() => { navigate("/"); }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Hjem
          </button>
          <button onClick={() => { navigate("/Result"); }} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
            Highscoreliste
          </button>
        </div>
      </div>
    </div>
  );
}