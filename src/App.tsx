import { useState } from "react";
import { fetchCurrentLocation, fetchWeather } from "./utils/api";
import { useQuery } from "react-query";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastAccordion from "./components/ForecastAccordion";
import { Location, LocationResponse } from "./utils/types";

function App() {
  const [city] = useState("kyiv");
  const [searchData, setSearchData] = useState<Location | null>(null);

  // Fetch location data on application start
  const { isLoading, isError } = useQuery<LocationResponse>(
    "location",
    fetchCurrentLocation,
    {
      onSuccess: (data) => {
        setSearchData({
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        });
      },
    }
  );

  console.log(searchData?.coordinates);

  const { data, error: weatherError } = useQuery(
    ["weather", city],
    () => fetchWeather(city),
    {
      enabled: !!city,
    }
  );

  if (isLoading) return <p>Fetching weather...</p>;
  if (weatherError) return <p>Failed to fetch weather data.</p>;

  return (
    <div>
      {data && <CurrentWeatherCard data={data} />}
      {data && <ForecastAccordion data={data} />}
    </div>
  );
}
export default App;
