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
import CitySearch from "./components/CitySearch";

function App() {
  const [location, setLocation] = useState<Location>({
    city: null,
    countryCode: null,
    latitude: null,
    longitude: null,
  });

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
      enabled: !!location.latitude && !!location.longitude,
      onSuccess: (data) => {
        setLocation({ ...location, city: data });
      },
    }
  );

  const weatherQuery = useQuery(
    ["weather", location.city],
    () =>
      fetchWeather(
        String(location?.latitude) + "," + String(location?.longitude)
      ),
    {
      enabled: !!location.city,
    }
  );

  // Check if any of the queries are loading
  const isLoading = locationQuery.isLoading || weatherQuery.isLoading;

  const weatherError = weatherQuery.isError;

  if (isLoading) return <Loading />;

  if (weatherError) return <p>Failed to fetch weather data.</p>;

  const handleOnSearchChange = (searchData: Location | null) => {
    if (searchData) {
      setLocation(searchData);
    }
    return;
  };

  return (
    <div>
      <CitySearch onSearchChange={handleOnSearchChange} />
      {weatherQuery.data && location.city && (
        <CurrentWeatherCard data={weatherQuery.data} city={location.city} />
      )}
      {weatherQuery.data && <ForecastAccordion data={weatherQuery.data} />}
    </div>
  );
}
export default App;
