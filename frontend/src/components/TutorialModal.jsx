import { FaTimes } from "react-icons/fa";

export default function GameInfoModal({ onClose, firstHint }) {
    return (
        <div className="absolute inset-0 z-[1050] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg ring-1 ring-white/10 border border-white/10 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-red-300 transition"
                    title="Lukk"
                >
                    <FaTimes />
                </button>

                <h2 className="text-xl font-bold mb-4">Hvordan fungerer Georacer?</h2>
                <ul className="list-disc pl-5 space-y-2 text-white/90 text-sm leading-relaxed">
                    <li>🚗 Trykk på pilene rundt bilen for å navigere.</li>
                    <li>❓ Utforsk kartet og finn spørsmål én etter én. Riktige svar gir poeng!</li>
                    <li>💡 Lyspæren i høyre hjørne gir deg hint til hvor det neste spørsmål befinner seg på kartet.</li>
                    <li>📏 Jo kortere vei du kjører mellom spørsmålene, jo bedre poengscore får du.</li>
                    <li>🏁 Når alle spørsmålene er besvart, er spillet over og resultatene dine vises.</li>
                </ul>
                <div className="mt-6 text-center text-white/90">
                    Første hint: <i>{firstHint}</i>
                </div>
                <div className="mt-6 text-center font-semibold text-white/90">
                    Lykke til!
                </div>
            </div>
        </div>
    );
}
