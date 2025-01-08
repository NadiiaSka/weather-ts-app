import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions as fetchCityData } from "@/utils/api";
import { City } from "@/utils/types";

type SearchProps = {
  onSearchChange: (searchData: City | null) => void;
};

const Search = ({ onSearchChange }: SearchProps) => {
  const [search, setSearch] = useState<City | null>(null);

  const handleOnChange = (selectedOption: City | null) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  const loadOptions = async (inputValue: string) => {
    const cities = await fetchCityData(inputValue);
    return {
      options: cities.map((city: City) => ({
        label: `${city.city}, ${city.countryCode}`,
        id: city.id,
        city: city.city,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude,
      })),
    };
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      isSearchable
      className="w-[80%] mx-auto mt-5 rounded-md"
    />
  );
};

export default Search;
