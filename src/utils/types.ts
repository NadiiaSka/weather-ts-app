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
};
