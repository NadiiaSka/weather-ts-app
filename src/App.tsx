import { useState } from "react";
import { fetchWeather } from "./utils/api";
import { useQuery } from "react-query";

function App() {
  const [city] = useState("sharm-el-sheikh");

  const {
    data,
    isLoading,
    error: weatherError,
  } = useQuery(["weather", city], () => fetchWeather(city), {
    enabled: !!city,
    staleTime: 600000,
    retry: 2,
  });

  if (isLoading) return <p>Fetching weather...</p>;
  if (weatherError) return <p>Failed to fetch weather data.</p>;

  return (
    <div>
      <h1 className="text-7xl font-bold mb-10">Weather App</h1>
      <p className="capitalize">City: {data?.address}</p>
      <p>Temperature: {data?.currentConditions.temp}°C</p>
    </div>
  );
}
export default App;
