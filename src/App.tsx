import { useState } from "react";
import {
  fetchCurrentCity,
  fetchCurrentLocation,
  fetchWeather,
} from "./utils/api";
import { useQuery } from "react-query";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastAccordion from "./components/ForecastAccordion";
import { City, Location } from "./utils/types";
import Loading from "./components/Loading";
import CitySearch from "./components/CitySearch";

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
  const isLoading = locationQuery.isLoading || weatherQuery.isLoading;

  const weatherError = weatherQuery.isError;

  if (isLoading) return <Loading />;

  if (weatherError) return <p>Failed to fetch weather data.</p>;

  const handleOnSearchChange = (searchData: City | null) => {
    if (searchData) {
      setCity(searchData.city);
      setLocation({
        latitude: searchData.latitude,
        longitude: searchData.longitude,
      });
    }
    return;
  };

  return (
    <div>
      <CitySearch onSearchChange={handleOnSearchChange} />
      {weatherQuery.data && (
        <CurrentWeatherCard data={weatherQuery.data} city={city} />
      )}
      {weatherQuery.data && <ForecastAccordion data={weatherQuery.data} />}
    </div>
  );
}
export default App;
