import Thermometer from "./Components/Thermometer";
import Clock from "./Components/Clock";
import Mouse from "./Components/Mouse";
import Dashboard from "./Components/Dashboard";
import mouseData from "./Assets/mouse_data.json";
import useStore from "./Hooks/useStore";

const App = () => {
  const { minutes } = useStore();
  const maleTemp = mouseData[minutes as keyof typeof mouseData]["male"]["temperature"];
  const femaleTemp = mouseData[minutes as keyof typeof mouseData]["female"]["temperature"];

  return (
    <div className="flex flex-col items-center relative min-h-screen overflow-hidden">
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
