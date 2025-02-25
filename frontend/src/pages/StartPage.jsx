import StartButton from "../components/StartButton"

export default function StartPage() {

    return (
        <>
        <div className="w-screen h-screen bg-[#1b325e] justify-between items-center flex flex-col">
            <p className="text-white text-6xl font-bold mt-[2%]">
                VELKOMMEN TIL GEORACER
            </p>
                <StartButton className="mb-[5%]"
                    title="START SPILLET">
                </StartButton>
        </div>
        </>
    )
}