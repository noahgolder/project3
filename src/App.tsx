// App.tsx
import React from "react";
import Thermometer from "./Components/Thermometer";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dynamic Thermometer</h1>
      {/* The Thermometer automatically uses hardcoded min and max values */}
      <Thermometer />
    </div>
  );
};

export default App;
