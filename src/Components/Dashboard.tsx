import { useEffect, useState } from "react";
import * as d3 from "d3";
import "../index.css";
import useStore from "../Hooks/useStore"

interface MouseSeries {
  id: string;
  sex: "f" | "m";
  values: number[];
}

function MouseDashboard() {
  const [series, setSeries] = useState<MouseSeries[]>([]);
  const { minutes } = useStore();

  useEffect(() => {
    d3.csv("../../Checkpoint/mouse_data.csv").then((rows) => {
      const activityCols = rows.columns!.filter((col) => col.endsWith("_act"));

      const parsed: MouseSeries[] = activityCols.map((col) => {
        const id = col.replace("_act", "");
        const sex  = id.startsWith("f") ? "f" : "m";
        const values = rows.map((row) => +row[col]);
        return { id, sex, values };
      });

      setSeries(parsed);
    });
  }, []);

  const females = series.filter((s) => s.sex === "f");
  const males = series.filter((s) => s.sex === "m");

  const allValues = series.flatMap((s) => s.values);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(allValues) ?? 0])
    .nice();

  const plot = (subset: MouseSeries[], width: number, height: number) => {
    const mouse = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerHeight = height - mouse.top - mouse.bottom;

    const xScale = d3
      .scaleBand<string>()
      .domain(subset.map((s) => s.id))
      .range([mouse.left, width - mouse.right])
      .padding(0.1);

    yScale.range([innerHeight + mouse.top, mouse.top]);

    return (
      <svg width={width} height={height} className="mouse-chart" key={subset[0]?.sex}>
        <g
          ref={(g) => g && d3.select(g).call(d3.axisLeft(yScale).ticks(5))}
          transform={`translate(${mouse.left},0)`}
        />
        <g
          ref={(g) => g && d3.select(g).call(d3.axisBottom(xScale).tickSizeOuter(0))}
          transform={`translate(0,${innerHeight + mouse.top})`}
        />

        {subset.map((s) => {
          const idx = Math.floor(minutes) % s.values.length;
          const values = s.values[idx];
          const x = xScale(s.id)!;
          const y = yScale(values);
          const barHeight = yScale(0) - y;
          const color  = s.sex === "f" ? "#e56997" : "#4f83c4";

          return (
            <rect
              key={s.id}
              x={x}
              y={y}
              width={xScale.bandwidth()}
              height={barHeight}
              fill={color}
              ref={(rect) => {
                if (rect) {
                  d3.select(rect)
                    .transition()
                    .duration(50)
                    .attr("y", y)
                    .attr("height", barHeight);
                }
              }}
            />
          );
        })}
      </svg>
    );
  };


  const height = 350;
  const width  = 350;

  return (
    <div className="flex justify-center items-center">
      {plot(females, width, height)}
      {plot(males, width, height)}
    </div>
  );
}

export default MouseDashboard;