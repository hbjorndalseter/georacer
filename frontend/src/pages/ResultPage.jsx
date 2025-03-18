import ScoreBoard from '../components/ScoreBoard.jsx'

const ResultPage = () => {

    return (
      <>
      <div className="w-screen h-screen bg-[#1b325e] justify-between items-center flex flex-col">
            <p className="text-white text-6xl font-bold mt-[2%]">
                RESULTATSLISTE
            </p>
            <div>

            </div>
            <div className="flex flex-col items-center justify-baseline">
              <ScoreBoard></ScoreBoard>
            </div>
        </div>
        </>
    );
  };
  
  export default ResultPage;