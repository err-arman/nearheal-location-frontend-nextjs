import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";

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
import { useEffect } from "react";
import BasicSearchInput from "@/components/search/BasicSearchInput";
import PlaceAutoComplete from "../search/PlaceAutoComplete";
import { useRouter, useSearchParams } from "next/navigation";
interface FilterSidebarProps {
  filterSearchTerm: string;
  setFilterSearchTerm: (value: string) => void;
  fetchLocation: () => void;
  selectedCategory: string[];
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
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];

    setFilterSearchTerm(search);
    setSelectedRegion(region);
    setSelectedCategory(categories);

    if (search || region || categories.length > 0) {
      fetchLocation();
    }
  }, []);

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

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Filters</h3>
      {showTitle && (
        <BasicSearchInput
          value={title!}
          onChange={setTitle!}
          placeholder="Search by title"
        />
      )}
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
