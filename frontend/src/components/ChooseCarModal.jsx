import car1 from "../assets/RedCar.png";
import car2 from "../assets/police.png";
import car3 from "../assets/lightning.png";
import car4 from "../assets/f1.png";
import car5 from "../assets/taxi.png";


const carOptions = [
  { id: "car1", name: "Default", imageUrl: car1 },
  { id: "car2", name: "Politibil", imageUrl: car2 },
  { id: "car3", name: "Lightning mcQueen", imageUrl: car3 },
  { id: "car4", name: "F1", imageUrl: car4 },
  { id: "car5", name: "Taxi", imageUrl: car5 },
];

const ChooseCarModal = ({ selectedCar, setSelectedCar, onClose }) => {
  // Default til første bil om ingenting er valgt
  const currentCar = selectedCar || carOptions[0];

  const handleChange = (e) => {
    const newCar = carOptions.find((car) => car.id === e.target.value);
    setSelectedCar(newCar);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1b325e] text-white rounded-2xl p-8 shadow-2xl w-80 text-center border border-white/10">
        <h2 className="text-xl font-bold mb-4">Velg din bil</h2>

        <div className="mb-4 flex justify-center">
          <img
            src={currentCar.imageUrl}
            alt={currentCar.name}
            className="h-20 object-contain animate-spin-z-slow"
          />
        </div>

        <select
          value={currentCar.id}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none"
        >
          {carOptions.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>

        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full transition font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ChooseCarModal;