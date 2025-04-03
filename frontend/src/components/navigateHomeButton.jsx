import { useNavigate } from "react-router-dom"

export default function NavigateHome() {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
      };

    return (
        <button
        onClick={handleHomeClick}
        className="mt-8 px-6 py-3 bg-white text-[#1b325e] font-semibold rounded-xl shadow-md transition hover:bg-gray-100 hover:scale-105"
      >
        Startsiden
      </button>
    )
}

