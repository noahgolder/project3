// Thermometer.tsx
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Thermometer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [temp, setTemp] = useState(35.0); // Default starting temp

  // Hardcoded min and max values here
  const minTemp = 35.0;
  const maxTemp = 40;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 100;
    const height = 300;

    // Clear previous SVG content
    svg.selectAll("*").remove();

    // Create the thermometer structure
    svg.append("rect").attr("x", 45).attr("y", 20).attr("width", 10).attr("height", 200).attr("fill", "#ccc");

    // Thermometer bulb
    svg.append("circle").attr("cx", 50).attr("cy", 230).attr("r", 15).attr("fill", "#ccc");

    // Clamp the temperature value between minTemp and maxTemp
    const clampedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
    const fillHeight = ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 200;

    // Create a color scale for the gradient (Blue -> White -> Red)
    const colorScale = d3
      .scaleLinear<string>()
      .domain([minTemp, (minTemp + maxTemp) / 2, maxTemp])
      .range(["blue", "white", "red"]);

    // Temperature Fill
    svg.append("rect")
      .attr("x", 45)
      .attr("y", 220 - fillHeight)
      .attr("width", 10)
      .attr("height", fillHeight)
      .attr("fill", colorScale(clampedTemp));

    // Fill for the bulb (hot part)
    svg.append("circle").attr("cx", 50).attr("cy", 230).attr("r", 15).attr("fill", colorScale(clampedTemp));

    // Add temperature text
    svg.append("text")
      .attr("x", 60)
      .attr("y", 25)
      .attr("font-size", "14px")
      .attr("fill", "#333")
      .text(`${clampedTemp.toFixed(2)}°C`);

    // Add min and max labels
    svg.append("text").attr("x", 60).attr("y", 220).attr("font-size", "12px").attr("fill", "#333").text(`Min: ${minTemp}°C`);
    svg.append("text").attr("x", 60).attr("y", 40).attr("font-size", "12px").attr("fill", "#333").text(`Max: ${maxTemp}°C`);

  }, [temp]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef} width={150} height={300}></svg>
      <div style={{ marginTop: "20px" }}>
        <input 
          type="range" 
          min={minTemp} 
          max={maxTemp} 
          step="0.01"
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          style={{ width: "200px" }}
        />
        <p>{temp.toFixed(2)}°C</p>
      </div>
    </div>
  );
};

export default Thermometer;
