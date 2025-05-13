import Thermometer from "./Components/Thermometer";
import Clock from "./Components/Clock";
import Mouse from "./Components/Mouse";
import Dashboard from "./Components/Dashboard";
import mouseData from "./Assets/mouse_data.json";
import useStore from "./Hooks/useStore";
import { useState, useEffect } from "react";

const App = () => {
  let { minutes } = useStore();
  minutes = Math.floor(minutes);
  
  const maleTemp = mouseData[minutes as keyof typeof mouseData]["male"]["temperature"];
  const femaleTemp = mouseData[minutes as keyof typeof mouseData]["female"]["temperature"];
  const [isNight, setIsNight] = useState(true);

  useEffect(() => { 
    const currentHour = (minutes / 60) % 24;
    setIsNight(currentHour >= 18 || currentHour < 6);
  }, [minutes]);

  return (
    <div
      className="flex flex-col items-center relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: isNight ? "#1D232A" : "#FFFFFF",
        color: isNight ? "#FFFFFF" : "#000000",
        transition: "background-color 0.5s, color 0.5s",
      }}
    >
      <div className="flex items-center justify-center gap-4">
        <Thermometer temp={femaleTemp} gender="female" />
        <Clock />
        <Thermometer temp={maleTemp} gender="male" />
      </div>
      <Dashboard />
      {Array.from({ length: 10 }).map((_, index) => (
        <Mouse key={index} speed={10} />
      ))}
    </div>
  );
};

export default App;
