import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "../index.css";
import mouseImg from "../assets/mouse-placeholder.jpg";


const Mouse = () => {
  const [activityLevels, setActivityLevels] = useState<number[]>([]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    d3.csv("../../Checkpoint/mouse_data.csv").then((data) => {
      const activity = data.map((d) => +d["m1_act"]);   // + converts to number
      setActivityLevels(activity);
    });  
  }, []);

  useEffect(() => {
    if (activityLevels.length === 0) {
      return;
    }
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % activityLevels.length);
    }, 100);

    return () => clearInterval(id);
  }, [activityLevels]);

  const width = 800;
  const height = 400;
  const imgW = 80;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(activityLevels) ?? 0])
    .range([0, width - imgW]);

  // const x = (frame / activityLevels.length) * width;
  const x = xScale(activityLevels[frame] ?? 0);
  const y = height / 2 - imgW / 2;

  return (
    <div className="mouse-container" style={{ position: "relative", width, height, overflow: "hidden" }}>
      <img
        className="mouse" 
        src={mouseImg}
        alt="Mouse"
        style={{
          position: "absolute",
          width: 80,
          transform: `translate(${x}px, ${y}px)`,
          transition: "transform 90ms linear", // smooths the motion a bit
        }}

      />
    </div>
  )
}

export default Mouse;