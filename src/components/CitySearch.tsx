import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions as fetchCityData } from "@/utils/api";
import { Location } from "@/utils/types";

type SearchProps = {
  onSearchChange: (searchData: Location | null) => void;
};

const Search = ({ onSearchChange }: SearchProps) => {
  const [search, setSearch] = useState<Location | null>(null);

  const handleOnChange = (selectedOption: Location | null) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  const loadOptions = async (inputValue: string) => {
    const cities = await fetchCityData(inputValue);
    return {
      options: cities.map((city: Location) => ({
        label: `${city.city}, ${city.countryCode}`,
        city: `${city.city}, ${city.countryCode}`,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude,
      })),
    };
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      isSearchable
      className="w-[80%] mx-auto mt-5 rounded-md border border-white shadow-intense"
    />
  );
};

export default Search;
