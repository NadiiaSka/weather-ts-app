import axios from "axios";

const API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (location: string) => {
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
