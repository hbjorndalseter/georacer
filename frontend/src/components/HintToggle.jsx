import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";

export default function HintToggle({ hint, autoReveal }) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (autoReveal) {
      setShouldShow(true);
      setTimeout(() => setShouldShow(false), 4000);
    }
  }, [autoReveal]);

  return (
    <div className="absolute top-6 right-6 z-[1000] flex items-center gap-2">
      {/* Button that contains hover logic */}
      <div
        className="relative group"
      >
        {/* Hint text */}
        <div
          className={`
            absolute right-full mr-3 top-1/2 -translate-y-1/2
            transition-all duration-300 ease-in-out 
            bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-white
            rounded-xl shadow-xl px-4 py-3 text-sm max-w-xs w-64
            ring-1 ring-white/10 border border-white/10 backdrop-blur-md
            ${shouldShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}
            pointer-events-none
          `}
        >
          <p className="text-white/90 font-medium tracking-wide whitespace-pre-wrap">
            {hint}
          </p>
        </div>

        {/* Lightbulb */}
        <div
          className="p-3 rounded-full bg-yellow-200 hover:bg-yellow-300 shadow-xl transition-all duration-300 cursor-pointer"
          title="Hint"
        >
          <FaLightbulb className="text-yellow-800 text-lg" />
        </div>
      </div>
    </div>
  );
}
