import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ThermometerProps {
  temp: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ temp }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 100;
    const height = 300;
    const maxTemp = 100;
    const minTemp = 0;
    
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

    // Calculate the fill height based on temp
    const fillHeight = Math.min(
      Math.max((200 * (temp - minTemp)) / (maxTemp - minTemp), 0),
      200
    );

    // Temperature Fill
    svg
      .append("rect")
      .attr("x", 45)
      .attr("y", 220 - fillHeight)
      .attr("width", 10)
      .attr("height", fillHeight)
      .attr("fill", "red")
      .attr("rx", 5)
      .attr("ry", 5);

    // Fill for the bulb (hot part)
    svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 230)
      .attr("r", 15)
      .attr("fill", "red");

    // Add temperature text
    svg
      .append("text")
      .attr("x", 60)
      .attr("y", 25)
      .attr("font-size", "16px")
      .attr("fill", "#333")
      .text(`${temp}°C`);
  }, [temp]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef} width={100} height={300}></svg>
    </div>
  );
};

export default Thermometer;
