import React from "react";

const UsernameConflictModal = ({ username, onProceed, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1b325e] text-white rounded-2xl p-8 shadow-2xl w-80 text-center border border-white/10">
        <h2 className="text-2xl font-bold mb-3">Brukernavn i bruk</h2>
        <p className="text-gray-200">
          Brukernavnet <span className="font-semibold text-white">"{username}"</span> er allerede i bruk på dette kartet.
        </p>
        <p className="mt-2 text-gray-300 text-sm">
          Vil du spille med det eller prøve et nytt navn?
        </p>

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Prøv nytt navn
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2 rounded-lg bg-white text-[#1b325e] font-semibold hover:bg-gray-100 transition text-sm"
          >
            Spill med dette
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernameConflictModal;