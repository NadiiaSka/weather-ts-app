import { WeatherResponse } from "@/utils/types";
import { Card } from "./ui/card";
import { roundUp } from "@/utils/helpers";

function CurrentWeatherCard({ data }: { data: WeatherResponse }) {
  const { currentConditions, address } = data;

  return (
    <Card className="w-[350px] h-[220px] max-w-[85%] rounded-md shadow-md text-white bg-[#22619c] my-5 mx-auto p-5 flex flex-col justify-between">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl capitalize font-bold">{address}</h2>
          <p>{currentConditions.conditions}</p>
        </div>
        <img
          alt="weather icon"
          src={`icons/${currentConditions.icon}.svg`}
          className="w-[90px] -mt-2 mr-3"
        />
      </div>
      <div className="flex justify-between">
        <h2 className="text-6xl font-bold">
          {roundUp(currentConditions.temp)}°C
        </h2>
        <div className="flex flex-col text-sm">
          <p className="underline underline-offset-2">Details:</p>
          {[
            {
              label: "Humidity",
              value: `${roundUp(currentConditions.humidity)}%`,
            },
            { label: "Wind", value: `${currentConditions.windspeed} km/h` },
            {
              label: "Pressure",
              value: `${roundUp(currentConditions.pressure)} hPa`,
            },
          ].map(({ label, value }) => (
            <p key={label} className="flex justify-between">
              <span>{label}:</span>
              <span className="font-bold ml-1">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default CurrentWeatherCard;
