import { Link } from "react-router-dom"

export default function StartButton( {title, onClick} ) {
    return (
        <button onClick={onClick} className="bg-[#eaeaea] rounded-[30px] text-center text-[#535353] text-[45px] font-normal font-['Koulen']">
            {title}
        </button>
    )
}