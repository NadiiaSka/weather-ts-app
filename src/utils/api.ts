import axios from "axios";
import { LocationResponse, WeatherResponse } from "./types";

const API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (
  location: string
): Promise<WeatherResponse> => {
  const response = await axios.get(`${API_BASE_URL}/${location}/next4days`, {
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
  return new Promise<LocationResponse>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};
