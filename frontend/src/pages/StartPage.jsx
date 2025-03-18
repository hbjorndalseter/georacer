import StartGame from "../components/StartGame";

export default function StartPage() {

    return (
        <>
        <div className="w-screen h-screen bg-[#1b325e] justify-between items-center flex flex-col">
            <p className="text-white text-6xl font-bold mt-[2%]">
                VELKOMMEN TIL CITYHUNTER
            </p>
            <div>

            </div>
            <div className="flex flex-col items-center justify-baseline">
                <StartGame></StartGame>
           </div>
        </div>
        </>
    )
}