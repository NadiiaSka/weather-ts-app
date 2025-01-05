import { useState } from "react";
import {
  fetchCurrentCity,
  fetchCurrentLocation,
  fetchWeather,
} from "./utils/api";
import { useQuery } from "react-query";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastAccordion from "./components/ForecastAccordion";
import { Location } from "./utils/types";

function App() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  // Fetch location data on application start
  const { isLoading } = useQuery<Location>("location", fetchCurrentLocation, {
    onSuccess: (data) => {
      setLocation(data);
    },
  });

  //get a city name for the current location
  useQuery(
    "getCityName",
    () => {
      if (!location) {
        throw new Error("Location is not available");
      }
      return fetchCurrentCity(location);
    },
    {
      enabled: !!location,
      onSuccess: (data) => {
        setCity(data);
      },
    }
  );

  const { data, error: weatherError } = useQuery(
    ["weather", city],
    () =>
      fetchWeather(
        String(location?.latitude) + "," + String(location?.longitude)
      ),
    {
      enabled: !!city,
    }
  );

  if (isLoading) return <p>Fetching weather...</p>;
  if (weatherError) return <p>Failed to fetch weather data.</p>;

  return (
    <div>
      {data && <CurrentWeatherCard data={data} city={city} />}
      {data && <ForecastAccordion data={data} />}
    </div>
  );
}
export default App;
