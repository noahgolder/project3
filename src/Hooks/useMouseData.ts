import { useState, useEffect } from "react";

// Defining the structure of the mouse data
interface MouseData {
  female: {
    activity: number | null;
    temperature: number | null;
  };
  male: {
    activity: number | null;
    temperature: number | null;
  };
}

// Defining the structure of the full JSON
interface MouseDataJSON {
  [key: string]: MouseData;
}

const useMouseData = () => {
  const [mouseData, setMouseData] = useState<MouseDataJSON>({});
  const [minTemp, setMinTemp] = useState<number | null>(null);
  const [maxTemp, setMaxTemp] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/mouse_data.json");
      const data: MouseDataJSON = await response.json();
      setMouseData(data);

      // Calculate min and max temperatures with type safety
      const temperatures: number[] = Object.values(data).flatMap((entry) => {
        return [
          entry.female?.temperature ?? Infinity,
          entry.male?.temperature ?? Infinity,
        ];
      }).filter(temp => temp !== Infinity); // Remove null or undefined values

      setMinTemp(Math.min(...temperatures));
      setMaxTemp(Math.max(...temperatures));
    };

    fetchData();
  }, []);

  return { mouseData, minTemp, maxTemp };
};

export default useMouseData;
