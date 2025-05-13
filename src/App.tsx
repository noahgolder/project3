import React, { useState } from "react";
import Thermometer from "./Components/Thermometer";

const App: React.FC = () => {
  const [temperature, setTemperature] = useState(20);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dynamic Thermometer</h1>
      <Thermometer temp={temperature} />
      <input 
        type="range" 
        min="-50" 
        max="150" 
        value={temperature} 
        onChange={(e) => setTemperature(Number(e.target.value))}
        style={{ marginTop: "20px" }}
      />
      <p>{temperature}°C</p>
    </div>
  );
};

export default App;
