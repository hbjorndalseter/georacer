import React from 'react';

export default function GameResultOverlay({ currentPlayer, distance, correctAnswers, currentScore, isHighscore, onHomeClick, onRetryClick, onHighscoreClick }) {
  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-11/12 max-w-md">
        {isHighscore ? (
          <>
            <h2 className="text-2xl font-bold mb-4">HIGHSCORE!</h2>
            <p className="mb-2">Total distanse kjørt: {Math.round(distance)}</p>
            <p className="mb-2">Antall riktige svar: {correctAnswers}</p>
            <p className="mb-4">Total score: {currentScore}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Spillet er over, {currentPlayer.name}!</h2>
            <p className="mb-2">Total distanse kjørt: {Math.round(distance)}</p>
            <p className="mb-2">Antall riktige svar: {correctAnswers}</p>
            <p className="mb-4">Total score: {currentScore}</p>
            <p className="mb-4">Din Highscore: {currentPlayer.score}</p>
          </>
        )}
        <div className="flex justify-between">
          <button onClick={onHomeClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Hjem
          </button>
          <button onClick={onRetryClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Prøv igjen
          </button>
          <button onClick={onHighscoreClick} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
            Se highscoreliste
          </button>
        </div>
      </div>
    </div>
  );
}