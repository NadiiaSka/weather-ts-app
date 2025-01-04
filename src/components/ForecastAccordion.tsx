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

  return (
    <Accordion allowZeroExpanded className="w-[80%] mx-auto">
      {days.slice(1).map((day, index) => (
        <AccordionItem key={index} className="bg-white rounded-xl p-3 mb-1">
          <AccordionItemHeading>
            <AccordionItemButton className="flex justify-between items-center focus:outline-none">
              <div className="flex items-center">
                <img
                  alt="weather icon"
                  className="w-[30px] mr-3 "
                  src={`icons/${day.icon}.svg`}
                />
                <p className="w-16">
                  {roundUp(day.tempmax)}°/
                  {roundUp(day.tempmin)}°
                </p>
                <p className="ml-2 pl-2 border-l"> {day.conditions}</p>
              </div>

              <div className="flex">
                <h2 className="font-bold">{forecastWeekDays[index]}</h2>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="mt-3">
            <p>Today's forecast</p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export default ForecastAccordion;
