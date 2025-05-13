import Thermometer from "./Components/Thermometer";
import Clock from "./Components/Clock";
import Mouse from "./Components/Mouse";
import Dashboard from "./Components/Dashboard";
import mouseData from "./Assets/mouse_data.json";
import useStore from "./Hooks/useStore";
import { useDayNight } from "./Hooks/useDayNight";

const App = () => {
  useDayNight();
  let { minutes } = useStore();
  minutes = Math.floor(minutes);

  const maleTemp = mouseData[minutes as keyof typeof mouseData]["male"]["temperature"];
  const femaleTemp = mouseData[minutes as keyof typeof mouseData]["female"]["temperature"];
  const maleActivity = mouseData[minutes as keyof typeof mouseData]["male"]["activity"];
  const femaleActivity = mouseData[minutes as keyof typeof mouseData]["female"]["activity"];

  return (
    <div className="flex flex-col items-center relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Mouse speed={maleActivity} gender="male" />
        <Mouse speed={femaleActivity} gender="female" />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex items-center justify-center gap-4">
          <Thermometer temp={femaleTemp} gender="female" />
          <Clock />
          <Thermometer temp={maleTemp} gender="male" />
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
