import { useState } from "react";
import { useQuery } from "react-query";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem } from "./ui/select";
import { fetchCityOptions } from "@/utils/api";

function CitySearch() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { data: cities = [], isFetching } = useQuery(
    ["searchCities", query],
    () => fetchCityOptions(query),
    {
      enabled: query.length > 3,
    }
  );

  const handleSelect = (cityName: string) => {
    setSelectedCity(cityName);
    setQuery(cityName);
  };

  return (
    <div className="mt-4 relative max-w-md mx-auto">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full bg-white border rounded focus:outline-none"
      />
      {query.length > 3 && (
        <div className="absolute w-full bg-white border rounded shadow mt-1">
          <Select>
            <SelectContent>
              {isFetching && (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              )}
              {!isFetching && cities.length === 0 && (
                <SelectItem value="no-results" disabled>
                  No results found
                </SelectItem>
              )}
              {!isFetching &&
                cities.map((city) => (
                  <SelectItem
                    key={`${city.city}-${city.id}`}
                    value={city.city}
                    onClick={() => handleSelect(city.city)}
                  >
                    {city.city}, {city.countryCode}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export default CitySearch;
