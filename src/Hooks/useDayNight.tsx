import { useEffect, useState } from "react";
import useStore from "./useStore";

export const useDayNight = () => {
  const [isNight, setIsNight] = useState(true);
  const { minutes } = useStore();

  useEffect(() => {
    const currentHour = (minutes / 60) % 24;
    setIsNight(currentHour >= 18 || currentHour < 6);
    document.body.style.backgroundColor = isNight ? "#1D232A" : "#FFFFFF";
    document.body.style.color = isNight ? "#FFFFFF" : "#000000";
    document.body.style.transition = "background-color 0.5s, color 0.5s";
  }, [minutes]);

  return { isNight };
};
