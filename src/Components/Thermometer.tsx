import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ThermometerProps {
  temp: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ temp }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [minTemp, setMinTemp] = useState(temp);
  const [maxTemp, setMaxTemp] = useState(temp);

  // Update the min/max range dynamically
  useEffect(() => {
    if (temp < minTemp) setMinTemp(temp);
    if (temp > maxTemp) setMaxTemp(temp);
  }, [temp, minTemp, maxTemp]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 100;
    const height = 300;
    
    // Clear previous SVG content
    svg.selectAll("*").remove();

    // Create the thermometer structure
    svg
      .append("rect")
      .attr("x", 45)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 200)
      .attr("fill", "#ccc")
      .attr("rx", 5)
      .attr("ry", 5);

    // Thermometer bulb
    svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 230)
      .attr("r", 15)
      .attr("fill", "#ccc");

    // Calculate the fill height based on temp (adjusted for min/max range)
    const fillHeight = Math.min(
      Math.max((200 * (temp - minTemp)) / (maxTemp - minTemp), 0),
      200
    );

    // Create a color scale for the gradient (Blue -> White -> Red)
    const colorScale = d3
      .scaleLinear<string>()
      .domain([minTemp, (minTemp + maxTemp) / 2, maxTemp])
      .range(["blue", "white", "red"]);

    // Temperature Fill
    svg
      .append("rect")
      .attr("x", 45)
      .attr("y", 220 - fillHeight)
      .attr("width", 10)
      .attr("height", fillHeight)
      .attr("fill", colorScale(temp))
      .attr("rx", 5)
      .attr("ry", 5);

    // Fill for the bulb (hot part)
    svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 230)
      .attr("r", 15)
      .attr("fill", colorScale(temp));

    // Add temperature text
    svg
      .append("text")
      .attr("x", 60)
      .attr("y", 25)
      .attr("font-size", "14px")
      .attr("fill", "#333")
      .text(`${temp}°C`);

    // Add min and max labels
    svg
      .append("text")
      .attr("x", 60)
      .attr("y", 220)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(`Min: ${minTemp}°C`);

    svg
      .append("text")
      .attr("x", 60)
      .attr("y", 40)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(`Max: ${maxTemp}°C`);

  }, [temp, minTemp, maxTemp]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef} width={100} height={300}></svg>
    </div>
  );
};

export default Thermometer;
