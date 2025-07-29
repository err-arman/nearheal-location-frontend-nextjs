import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface PlaceAutoCompleteSearchInputProps {
  initialTextValue?: string;
  setInitialTextValue: (value: string) => void;
  setselectedplace: any;
  placeholder?: string;
  searchType: string[];
  initialValue?: string;
}

const PlaceAutoComplete = (
  BasicSearchInputProps: PlaceAutoCompleteSearchInputProps
) => {
  const {
    setselectedplace,
    setInitialTextValue,
    placeholder,
    searchType,
    initialTextValue,
    initialValue,
  } = BasicSearchInputProps;
  const [mapCenter, setMapCenter] = useState();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "au" },
      types: searchType,
    },
    cache: false,
    debounce: 400,
  });

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setValue(value);
      setselectedplace(null);
      setInitialTextValue("");
    } else {
      setValue(value);
    }
  };

  useEffect(() => {
    if (initialTextValue) {
      setValue(initialTextValue, false);
      setselectedplace(null);
    }
    if (!initialTextValue) {
      setValue("", false);
      setselectedplace(null);
    }
  }, [initialTextValue]);

  const handleSelect = (suggestion: any) => async () => {
    let { description, place_id, structured_formatting } = suggestion;
    description = description.replace(/, Australia$/, "");
    // Remove state abbreviation at the end, with or without comma
    description = description.replace(
      /\s?(,)?\s?(ACT|NSW|NT|QLD|SA|TAS|VIC|WA)$/,
      ""
    );
    // Remove any trailing comma and space
    description = description.replace(/,\s*$/, "");

    description = description.replace(/,\s*$/, "");

    setValue(description, false);
    clearSuggestions();

    try {
      setInitialTextValue(description);
      const geocodes = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(geocodes[0]);
      const results = await getDetails({ placeId: place_id });
      // @ts-ignore
      const result = results.address_components[0].long_name;

      setselectedplace({
        description: result,
        main_text: structured_formatting.main_text,
        secondary_text: structured_formatting.secondary_text,
        place_id,
        lat: lat.toString(),
        lng: lng.toString(),
      });
    } catch (error) {
      console.error("Error getting place details", error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          className="flex items-center p-2 cursor-pointer rounded hover:bg-gray-100"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <div>
            <p className="text-sm font-medium">{main_text}</p>
            <p className="text-xs text-gray-500">{secondary_text}</p>
          </div>
        </div>
      );
    });

  return (
    <div>
      {/* Input wrapper */}
      <div className="relative">
        <input
          type="text"
          className={`w-full bg-white text-gray-800 rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 `}
          value={value}
          onChange={handleInputChange}
          disabled={!ready}
          placeholder={placeholder}
        />
      </div>

      {/* Suggestions list */}
      {status === "OK" && (
        <div className="absolute z-10 mt-2 bg-white shadow-md rounded-md p-2 w-full">
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};

export default PlaceAutoComplete;
