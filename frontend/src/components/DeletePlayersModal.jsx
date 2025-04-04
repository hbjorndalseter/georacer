import React from "react";

const DeletePlayersModal = ({ mapName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1b325e] text-white rounded-2xl p-8 shadow-2xl w-80 text-center border border-white/10">
        <h2 className="text-2xl font-bold mb-3">Bekreft sletting</h2>

        <p className="text-gray-200">
          Er du sikker på at du vil slette <br />
          <span className="font-semibold text-white">alle spillere</span> fra kartet
          <br />
          <span className="text-yellow-300 font-semibold text-lg">"{mapName}"</span>?
        </p>

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Avbryt
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-sm"
          >
            Slett spillere
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayersModal;