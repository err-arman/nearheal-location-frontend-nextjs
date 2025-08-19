import { getLocations } from "@/api/locationApi";
import { Location } from "@/types/location";
import { categories } from "@/lib/utils";
import { Layers, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
type SelectedItem = {
  type: "category" | "provider";
  value: string;
};

export default function CategoryDropdown({
  setSelectedItems,
  selectedItems,
}: {
  setSelectedItems: (value: SelectedItem[]) => void;
  selectedItems: SelectedItem[];
}) {
  const [inputValue, setInputValue] = useState(
    selectedItems[0]?.value || "" // ✅ only store string in input
  );
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const debounceRef = useRef<NodeJS.Timeout>();

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

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredCategories([]);
      return;
    }
    const filtered = categories.filter((cat) =>
      cat.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [inputValue]);

  // --- Selection handlers ---
  const handleSelectCategory = (item: string) => {
    setSelectedItems([{ type: "category", value: item }]);
    setInputValue(item);
    setIsOpen(false);
  };

  const handleSelectProvider = (item: string) => {
    setSelectedItems([{ type: "provider", value: item }]);
    setInputValue(item);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Default to category if user presses enter
      setSelectedItems([{ type: "category", value: inputValue.trim() }]);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative">
        <div className="p-2 border rounded-lg shadow-sm">
          <input
            type="text"
            className="w-full min-w-0 focus:outline-none text-gray-800 bg-white"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              if (value.trim().split(/\s+/).length <= 10) {
                setInputValue(value);
                if (value.trim() === "") {
                  setSelectedItems([]);
                }
              }
            }}
            onClick={() => setIsOpen(true)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Provider or NDIS Categories to reach your needs"
          />
        </div>
        {isOpen &&
          (filteredCategories.length > 0 || filteredProviders.length > 0) && (
            <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border rounded-lg shadow-lg">
              {filteredCategories.length > 0 && (
                <>
                  <li className="flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 bg-gray-50 sticky top-0">
                    <Layers size={14} className="text-gray-400" />
                    NDIS Category
                  </li>
                  {filteredCategories.map((item, idx) => (
                    <li
                      key={`cat-${idx}`}
                      onClick={() => handleSelectCategory(item)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
                    >
                      {item}
                    </li>
                  ))}
                </>
              )}

              {filteredProviders.length > 0 && (
                <>
                  <li className="flex items-center gap-2 px-4 py-2 font-semibold text-gray-500 bg-gray-50 sticky top-0">
                    <Users size={14} className="text-gray-400" />
                    Providers
                  </li>
                  {filteredProviders.map((loc) => (
                    <li
                      key={`prov-${loc.id}`}
                      onClick={() => handleSelectProvider(loc.title)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {loc.title}
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
      </div>
    </div>
  );
}
