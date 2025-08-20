import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { categories } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import BasicSearchInput from "@/components/search/BasicSearchInput";
import PlaceAutoComplete from "../search/PlaceAutoComplete";
import { useRouter, useSearchParams } from "next/navigation";
import { Location } from "@/types/location";
import { getLocations } from "@/api/locationApi";
interface FilterSidebarProps {
  filterSearchTerm: string;
  setFilterSearchTerm: (value: string) => void;
  fetchLocation: () => void;
  selectedCategory: string[];
  selectedTitle: string | null;
  setSelectedTitle: (value: any) => void;
  setSelectedCategory: (categories: string[]) => void;
  priceFilter: string[];
  setPriceFilter: (prices: string[]) => void;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  onResetFilters: () => void;
  initialTextValue?: string;
  setInitialTextValue?: (value: string) => void;
  setTitle?: (value: string) => void;
  showRegion?: boolean;
  showCategories?: boolean;
  showPlaces?: boolean;
  showTitle?: boolean;
  title?: string;
}

const FilterSidebar = ({
  setFilterSearchTerm,
  filterSearchTerm,
  selectedCategory,
  initialTextValue,
  setInitialTextValue,
  setTitle,
  title,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  fetchLocation,
  onResetFilters,
  showRegion = true,
  showCategories = true,
  showPlaces = true,
  showTitle = true,
  selectedTitle,
  setSelectedTitle,
}: // clickedReset,
FilterSidebarProps) => {
  // NDIS Categories
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = new URLSearchParams(useSearchParams());
  // Load filters from URL on component mount
  const router = useRouter();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const region = searchParams.get("region") || null;
    const title = searchParams.get("title") || null;
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    setSelectedTitle(title);
    setFilterSearchTerm(search);
    setSelectedRegion(region);
    setSelectedCategory(categories);

    if (search || region || categories.length > 0) {
      fetchLocation();
    }
  }, []);

  // keep your normal local input state

  // 🔑 whenever `selectedTitle` changes (set in useEffect),
  // also sync it into the input field
  useEffect(() => {
    if (selectedTitle) {
      setInputValue(selectedTitle);
    } else {
      setInputValue("");
    }
  }, [selectedTitle]);

  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (inputValue.trim() === "") {
      setFilteredProviders([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await getLocations({
          page: 1,
          limit: 10,
          search: inputValue.trim(),
        });
        setFilteredProviders(res?.data ?? []);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    }, 400);
  }, [inputValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectProvider = (item: string) => {
    setSelectedItems(item);
    setInputValue(item);
    setFilteredProviders([]);
    setIsOpen(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    // @ts-ignore
    if (filterSearchTerm?.description) {
      // @ts-ignore
      params.set("search", filterSearchTerm.description);
    }

    if (initialTextValue) {
      params.set("search", initialTextValue);
    }

    if (selectedRegion) {
      params.set("region", selectedRegion);
    }

    if (selectedCategory.length > 0) {
      params.set("categories", selectedCategory.join(","));
    }
    if (selectedItems?.length) {
      params.set("title", selectedItems);
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <h3 className="text-lg font-semibold ">Filters</h3>
      <div className="relative" ref={dropdownRef}>
        <BasicSearchInput
          value={inputValue}
          onChange={(value: any) => {
            if (value.trim().split(/\s+/).length <= 10) {
              setInputValue(value);
              if (value.trim() === "") {
                setSelectedItems("");
                setFilteredProviders([]);
              }
            }
          }}
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by provider name"
          className="bg-white"
        />

        {isOpen && filteredProviders.length > 0 && (
          <div
            className="
        absolute left-0 right-0 mt-1 z-50
        rounded-md border bg-white shadow-lg
        max-h-[240px] overflow-y-auto
      "
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
            }}
          >
            <ul className="divide-y divide-gray-100">
              <li className="sticky top-0 z-10 bg-gray-50 flex items-center gap-2 px-4 py-2 font-semibold text-gray-500">
                <Users size={14} className="text-gray-400" />
                Providers
              </li>
              {filteredProviders.map((loc) => (
                <li
                  key={`prov-${loc.id}`}
                  // onMouseDown={(e) => e.preventDefault()} {/* prevent input blur */}
                  onClick={() => handleSelectProvider(loc.title)}
                  className="px-4 py-3 cursor-pointer hover:bg-blue-100 active:bg-blue-200"
                >
                  {loc.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showPlaces && (
        <div className="relative">
          <PlaceAutoComplete
            setInitialTextValue={setInitialTextValue!}
            searchType={["(cities)"]}
            initialTextValue={initialTextValue}
            setselectedplace={setFilterSearchTerm}
            initialValue={filterSearchTerm}
            placeholder="Search places"
          />
        </div>
      )}
      {showRegion && (
        <div>
          <h4 className="text-sm font-medium mb-2">Region</h4>
          <Select
            value={selectedRegion || "all"}
            onValueChange={(value) =>
              setSelectedRegion(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Australian Capital Territory">
                Australian Capital Territory
              </SelectItem>
              <SelectItem value="New South Wales">New South Wales</SelectItem>
              <SelectItem value="South Australia">South Australia</SelectItem>
              <SelectItem value="Tasmania">Tasmania</SelectItem>
              <SelectItem value="Victoria">Victoria</SelectItem>
              <SelectItem value="Western Australia">
                Western Australia
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {showCategories && (
        <div>
          <h4 className="text-sm font-medium mb-2">NDIS Categories</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedCategory.length > 0 ? (
                  <>
                    <span className="mr-1">
                      Selected ({selectedCategory.length})
                    </span>
                    <Badge variant="secondary" className="mr-1">
                      {selectedCategory.length}
                    </Badge>
                  </>
                ) : (
                  "Select Categories"
                )}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                    {categories.map((category) => {
                      const isSelected = selectedCategory.includes(category);
                      return (
                        <CommandItem
                          key={category}
                          value={category}
                          onSelect={() => {
                            if (isSelected) {
                              setSelectedCategory(
                                selectedCategory.filter((c) => c !== category)
                              );
                            } else {
                              setSelectedCategory([
                                ...selectedCategory,
                                category,
                              ]);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border",
                                isSelected
                                  ? "bg-primary border-primary"
                                  : "opacity-50"
                              )}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span>{category}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedCategory.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedCategory.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory.filter((c) => c !== category)
                      )
                    }
                  />
                </Badge>
              ))}
              {selectedCategory.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory([])}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      <Button variant="default" onClick={handleSearch} className="mt-2">
        Search
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          onResetFilters();
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
