import useClock from "../Hooks/useClock";

const Clock = () => {
  const { svgRef, minutes, setMinutes, play, setPlay, speed, setSpeed } = useClock();

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} />
      <div>
        <input
          type="range"
          min={0}
          max={1440}
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />
        <p>{minutes}</p>
        <input
          type="checkbox"
          checked={play}
          onChange={(e) => setPlay(e.target.checked)}
        />
        <input
          type="range"
          min={1}
          max={10}
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Clock
