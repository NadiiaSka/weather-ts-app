export type WeatherResponse = {
  address: string;
  currentConditions: DaysForecast;
  days: DaysForecast[];
};

export type DaysForecast = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslike: number;
  conditions: string;
  icon: string;
  humidity: number;
  windspeed: number;
  cloudcover: number;
  pressure: number;
  precipprob: number;
};

export type Location = {
  city: string | null;
  countryCode: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type CityOptionResponse = {};
