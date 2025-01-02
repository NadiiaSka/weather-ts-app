import { useState } from "react";
import { fetchWeather } from "./utils/api";
import { useQuery } from "react-query";
import CurrentWeatherCard from "./components/currentWeatherCard";

function App() {
  const [city] = useState("sharm-el-sheikh");

  const {
    data,
    isLoading,
    error: weatherError,
  } = useQuery(["weather", city], () => fetchWeather(city), {
    enabled: !!city,
  });

  if (isLoading) return <p>Fetching weather...</p>;
  if (weatherError) return <p>Failed to fetch weather data.</p>;

  return (
    <div>
      <h1 className="text-7xl font-bold mb-10">Weather App</h1>
      {data && <CurrentWeatherCard data={data} />}
    </div>
  );
}
export default App;
