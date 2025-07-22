import axios from "axios";
import { Location, WeatherResponse } from "./types";

const API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (
  location: string
): Promise<WeatherResponse> => {
  const response = await axios.get(`${API_BASE_URL}/${location}/next5days`, {
    params: {
      unitGroup: "metric",
      include: "days,current",
      key: WEATHER_API_KEY,
      contentType: "json",
    },
  });
  return response.data;
};

export const fetchCurrentLocation = async () => {
  return new Promise<Location>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude, city: null, countryCode: null });
        },
        (error) => {
          reject(error.message);
        },
        {
          enableHighAccuracy: false, // Disables GPS for a faster response
          timeout: 5000, // Max wait time of 5 seconds
          maximumAge: 600000, // Use cached location up to 10 minutes old
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export const fetchCurrentCity = async (searchData: Location) => {
  const { latitude, longitude } = searchData;
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${
        import.meta.env.VITE_LOCATION_IQ_API_KEY
      }&lat=${latitude}&lon=${longitude}&format=json&`
    );
    const data = response.data;
    if (!data.address) throw new Error("No address found");

    // Extract the city name from the response
    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county ||
      "Unknown location";
    return city + ", " + data.address.country_code.toUpperCase();
  } catch (error) {
    throw new Error("Failed to retrieve city name");
  }
};

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_GEO_DB_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const fetchCityOptions = async (
  inputValue: string
): Promise<Location[]> => {
  try {
    const response = await axios.get(`${GEO_API_URL}`, {
      params: {
        minPopulation: 100000,
        namePrefix: inputValue,
      },
      ...geoApiOptions,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
