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

// Load location from localStorage if available
const getStoredLocation = (): Location | null => {
  const savedLocation = localStorage.getItem("savedLocation");
  return savedLocation ? JSON.parse(savedLocation) : null;
};

function App() {
  const [location, setLocation] = useState<Location>(
    getStoredLocation() || {
      city: null,
      countryCode: null,
      latitude: null,
      longitude: null,
    }
  );

  // Fetch location on mount
  const locationQuery = useQuery<Location>("location", fetchCurrentLocation, {
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes before refetching
    cacheTime: 1000 * 60 * 10, // Cache stays for 10 minutes
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLocation(data);
      localStorage.setItem("savedLocation", JSON.stringify(data));
    },
    onError: (error) => console.error("Error fetching location: ", error),
  });

  // Fetch city name based on coordinates
  const cityQuery = useQuery("getCityName", () => fetchCurrentCity(location), {
    enabled: !!location.latitude && !!location.longitude && !location.city,
    retry: 2,
    onSuccess: (city) => {
      setLocation((prev) => {
        const updatedLocation = { ...prev, city };
        localStorage.setItem("savedLocation", JSON.stringify(updatedLocation));
        return updatedLocation;
      });
    },
    onError: (error: Error) =>
      console.error("Error fetching city name: ", error),
  });

  const weatherQuery = useQuery(
    ["weather", location.city],
    () => fetchWeather(`${location.latitude},${location.longitude}`),
    {
      enabled: !!location.city,
      retry: 3,
      onSuccess: (data) =>
        localStorage.setItem("savedWeather", JSON.stringify(data)),
      onError: (error) => console.error("Error fetching weather data: ", error),
    }
  );

  const handleOnSearchChange = (searchData: Location | null) => {
    if (searchData) {
      setLocation(searchData);
      localStorage.setItem("savedLocation", JSON.stringify(searchData));
    }
  };

  const errors = {
    location: locationQuery.isError
      ? "Unable to fetch location. Enable Geolocation in the browser."
      : null,
    weather: weatherQuery.isError ? "Unable to fetch weather data." : null,
    city: cityQuery.isError ? "Unable to fetch city name." : null,
  };

  if (locationQuery.isLoading || weatherQuery.isLoading) return <Loading />;

  return (
    <div>
      <CitySearch onSearchChange={handleOnSearchChange} />
      {Object.values(errors).some(Boolean) && (
        <div className="max-w-md p-4 mx-auto mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
          <h2 className="text-lg font-semibold">Error:</h2>
          <ul className="pl-5 mt-2 list-disc">
            {errors.location && <li>{errors.location}</li>}
            {errors.weather && <li>{errors.weather}</li>}
            {errors.city && <li>{errors.city}</li>}
          </ul>
        </div>
      )}
      {weatherQuery.data && location.city && (
        <CurrentWeatherCard data={weatherQuery.data} city={location.city} />
      )}
      {weatherQuery.data && <ForecastAccordion data={weatherQuery.data} />}
    </div>
  );
}

export default App;
