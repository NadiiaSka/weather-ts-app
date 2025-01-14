import { WeatherResponse } from "@/utils/types";
import { Card } from "./ui/card";
import { roundUp } from "@/utils/helpers";

function CurrentWeatherCard({
  data,
  city,
}: {
  data: WeatherResponse;
  city: string;
}) {
  const { currentConditions } = data;

  return (
    <Card className="mx-auto w-[350px] h-[220px] rounded-xl shadow-lg text-white bg-[#22619c] my-5 p-5 flex flex-col justify-between border-1">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl capitalize font-bold">{city}</h2>
          <p>{currentConditions.conditions}</p>
        </div>
        <img
          alt="weather icon"
          src={`icons/${currentConditions.icon}.svg`}
          className="w-[90px] -mt-2"
        />
      </div>
      <div className="flex justify-between">
        <h2 className="text-7xl tracking-tighter font-bold">
          {roundUp(currentConditions.temp)}°C
        </h2>
        <div className="flex flex-col text-sm">
          <p className="underline underline-offset-2 mb-1">Details:</p>
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
