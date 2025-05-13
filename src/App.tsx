import React, { useState } from "react";
import Thermometer from "./Components/Thermometer";
import Clock from "./Components/Clock";
import Mouse from "./Components/Mouse";

const App: React.FC = () => {
  const [temperature, setTemperature] = useState(35);

  return (
    <div className="flex items-center justify-center gap-4 relative min-h-screen overflow-hidden">
      <Thermometer temp={temperature} setTemp={setTemperature} />
      <Clock />
      <Thermometer temp={temperature} setTemp={setTemperature} />
      {Array.from({ length: 10 }).map((_, index) => (
        <Mouse key={index} speed={10} />
      ))}
    </div>
  );
};

export default App;
