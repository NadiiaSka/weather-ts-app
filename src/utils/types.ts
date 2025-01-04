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

type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  coordinates: Coordinates;
  city?: string;
};

export type LocationResponse = Coordinates;
