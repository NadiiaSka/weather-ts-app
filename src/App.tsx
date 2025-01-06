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
import Loading from "./components/Loading";

function App() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  // Fetch location data on application start
  const locationQuery = useQuery<Location>("location", fetchCurrentLocation, {
    onSuccess: (data) => {
      setLocation(data);
    },
  });

  //get a city name for the current location
  const cityQuery = useQuery(
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

  const weatherQuery = useQuery(
    ["weather", city],
    () =>
      fetchWeather(
        String(location?.latitude) + "," + String(location?.longitude)
      ),
    {
      enabled: !!city,
    }
  );

  // Check if any of the queries are loading
  const isLoading =
    locationQuery.isLoading || cityQuery.isLoading || weatherQuery.isLoading;
  const weatherError = weatherQuery.isError;

  if (isLoading) return <Loading />;

  if (weatherError) return <p>Failed to fetch weather data.</p>;

  return (
    <div>
      {weatherQuery.data && (
        <CurrentWeatherCard data={weatherQuery.data} city={city} />
      )}
      {weatherQuery.data && <ForecastAccordion data={weatherQuery.data} />}
    </div>
  );
}
export default App;
