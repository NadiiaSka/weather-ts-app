import { WeatherResponse } from "@/utils/types";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { forecastWeekDays, roundUp } from "@/utils/helpers";

function ForecastAccordion({ data }: { data: WeatherResponse }) {
  const { days } = data;

  if (!days || days.length < 2) {
    return (
      <p className="text-center text-red-500">No forecast data available.</p>
    );
  }

  return (
    <Accordion allowZeroExpanded className="w-[80%] mx-auto">
      {days.slice(1).map((day, index) => {
        const maxTemp = roundUp(day.tempmax);
        const minTemp = roundUp(day.tempmin);
        const feelsLike = roundUp(day.feelslike);
        const pressure = roundUp(day.pressure);
        const cloudCover = roundUp(day.cloudcover);
        const preticipProb = roundUp(day.precipprob);
        const humidity = roundUp(day.humidity);
        const windSpeed = roundUp(day.windspeed);
        const weekday = forecastWeekDays[index];

        return (
          <AccordionItem
            key={day.datetime || index}
            className="bg-white bg-opacity-80 rounded-xl p-3 mb-1 shadow-lg border-2 border-white"
          >
            <AccordionItemHeading>
              <AccordionItemButton className="focus:outline-none rounded-md">
                <div className="grid grid-cols-[1.5fr_1.7fr_5fr_1fr] sm:grid-cols-[1fr_1fr_5fr_1fr] md:grid-cols-[0.5fr_0.5fr_5fr_1fr] items-center">
                  <img
                    alt={`Weather icon for ${day.conditions}`}
                    className="w-[30px]"
                    src={`icons/${day.icon}.svg`}
                  />
                  <p className="pr-1 text-left">
                    {maxTemp}°/{minTemp}°
                  </p>
                  <p className="px-2 border-l text-left"> {day.conditions}</p>

                  <p className="font-bold text-right">{weekday}</p>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="mt-4 pt-3 text-sm font-semibold border-t">
              <dl className="grid grid-cols-2 gap-x-5">
                <div className="flex justify-between">
                  <dt>Precipitation:</dt>
                  <dd>{preticipProb}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Pressure:</dt>
                  <dd>{pressure} hPa</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Humidity:</dt>
                  <dd>{humidity}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Clouds:</dt>
                  <dd>{cloudCover}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Wind:</dt>
                  <dd>{windSpeed} km/h</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Feels like:</dt>
                  <dd>{feelsLike}°</dd>
                </div>
              </dl>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default ForecastAccordion;
