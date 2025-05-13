import React, { useState } from "react";
import Thermometer from "./Components/Thermometer";
import Clock from "./Components/Clock";
import Mouse from "./Components/Mouse";
import Dashboard from "./Components/Dashboard";

const App: React.FC = () => {
  const [temperature, setTemperature] = useState(35);

  return (
    <div className="flex flex-col items-center relative min-h-screen overflow-hidden">
      <div className="flex items-center justify-center gap-4">
        <Thermometer temp={temperature} setTemp={setTemperature} />
        <Clock />
        <Thermometer temp={temperature} setTemp={setTemperature} />
      </div>
      <Dashboard />
      {Array.from({ length: 10 }).map((_, index) => (
        <Mouse key={index} speed={10} />
      ))}
    </div>
  );
};

export default App;
