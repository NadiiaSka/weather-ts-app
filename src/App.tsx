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
    retry: 3,
    onSuccess: (data) => {
      setLocation(data);
    },
    onError: (error) => {
      console.error("Error fetching location: ", error);
    },
  });

  //get a city name for the current location
  const cityQuery = useQuery("getCityName", () => fetchCurrentCity(location), {
    enabled: !!location.latitude && !!location.longitude,
    retry: 2,
    onError: (error) => {
      console.error("Error fetching city name: ", error);
    },
    onSuccess: (city) => {
      setLocation({ ...location, city: city });
    },
  });

  const weatherQuery = useQuery(
    ["weather", location.city],
    () =>
      fetchWeather(
        String(location?.latitude) + "," + String(location?.longitude)
      ),
    {
      enabled: !!location.city,
      retry: 3,
      onError: (error) => {
        console.error("Error fetching weather data: ", error);
      },
    }
  );

  // Check if any of the queries are loading
  const isLoading = locationQuery.isLoading || weatherQuery.isLoading;

  const errors = {
    location: locationQuery.isError
      ? "Unable to fetch location data. Please enable Geolocation in the browser."
      : null,
    weather: weatherQuery.isError ? "Unable to fetch weather data" : null,
    city: cityQuery.isError ? "Unable to fetch city data" : null,
  };
  if (isLoading) return <Loading />;

  if (Object.values(errors).some(Boolean)) {
    return (
      <div>
        <h2>Error</h2>
        {errors.location && <p>{errors.location}</p>}
        {errors.weather && <p>{errors.weather}</p>}
        {errors.city && <p>{errors.city}</p>}
      </div>
    );
  }

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
