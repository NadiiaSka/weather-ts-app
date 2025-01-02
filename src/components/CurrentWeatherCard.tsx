import { WeatherResponse } from "@/utils/types";
import { Card } from "./ui/card";
import { roundUp } from "@/utils/helpers";

function CurrentWeatherCard({ data }: { data: WeatherResponse }) {
  const currentConditions = data.currentConditions;

  return (
    <Card className="w-[350px] h-[220px] max-w-[85%] rounded-[6px] shadow-[10px_-2px_20px_2px_rgba(0,0,0,0.3)] text-white bg-[#22619c] my-5 mx-auto px-5 py-5 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-2xl capitalize font-bold">{data.address}</h2>
          <p className="">{currentConditions.conditions}</p>
        </div>
        <img
          alt="weather"
          src={`icons/${currentConditions.icon}.svg`}
          className="w-[90px] -mt-2 mr-3"
        />
      </div>
      <div className="flex justify-between">
        <h2 className="text-6xl font-bold">
          {roundUp(currentConditions.temp)}°C
        </h2>
        <div className="flex flex-col items-start text-sm">
          <p className="underline underline-offset-2">Details:</p>
          <p className="flex justify-between w-full">
            <span>Humidity:</span>
            <span className="font-bold">
              {roundUp(currentConditions.humidity)}%
            </span>
          </p>

          <p className="flex justify-between w-full">
            <span>Wind:</span>
            <span className="font-bold">
              {currentConditions.windspeed} km/h
            </span>
          </p>
          <p className="flex justify-between w-full">
            <span>Pressure:</span>
            <span className="font-bold ml-3">
              {roundUp(currentConditions.pressure)} hPa
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}
export default CurrentWeatherCard;
