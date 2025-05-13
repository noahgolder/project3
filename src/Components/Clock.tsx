import { FaPause, FaPlay } from "react-icons/fa";
import useClock from "../Hooks/useClock";
import {
  BsSkipBackwardFill,
  BsSkipEndFill,
  BsSkipForwardFill,
  BsSkipStartFill,
} from "react-icons/bs";

const Clock = () => {
  const { svgRef, minutes, setMinutes, play, setPlay, setSpeed } = useClock();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">
        <span>{String(Math.floor(minutes / 60) % 12 || 12).padStart(2, "0")}</span> :{" "}
        <span>{String(Math.round(minutes % 60)).padStart(2, "0")}</span>{" "}
        <span>{minutes > 60 * 12 ? "PM" : "AM"}</span>
      </h1>
      <svg ref={svgRef} />
      <div className="flex gap-2 text-2xl">
        <button onClick={() => setSpeed((prev) => prev > 0.25 ? prev / 2 : prev)}>
          <BsSkipBackwardFill />
        </button>
        <button onClick={() => setMinutes(minutes - 60)}>
          <BsSkipStartFill />
        </button>
        <button onClick={() => setPlay(!play)}>{play ? <FaPause /> : <FaPlay />}</button>
        <button onClick={() => setMinutes(minutes + 60)}>
          <BsSkipEndFill />
        </button>
        <button onClick={() => setSpeed((prev) => prev < 16 ? prev * 2 : prev)}>
          <BsSkipForwardFill />
        </button>
      </div>
    </div>
  );
};

export default Clock;
