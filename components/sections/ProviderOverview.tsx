import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Location } from "@/types/location";

interface ProviderOverviewProps {
  location: Location;
}

const ProviderOverview: React.FC<ProviderOverviewProps> = ({ location }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Generate sample categories for the features
  const featureCategories = [
    "All",
    "Accessibility",
    "Support",
    "Facilities",
    "Services",
    "Staff",
  ];

  // Assign each feature to a category (in a real app, these would come from the backend)
  const categorizedFeatures = location.features
    ? location.features.map((feature, index) => {
        // This is just for demonstration - in a real app, features would have proper categories
        const category =
          featureCategories[
            Math.floor(index % (featureCategories.length - 1)) + 1
          ];
        return { text: feature, category };
      })
    : [];

  // Filter features based on search and category
  const filteredFeatures = categorizedFeatures.filter((feature) => {
    const matchesSearch = feature.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Determine how many features to show
  const visibleFeatures = showAllFeatures
    ? filteredFeatures
    : filteredFeatures.slice(0, 12);
  return (
    <section id="overview" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="text-[#e5b45b] font-medium mb-4">
            — PROVIDER OVERVIEW
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                About <span className="text-[#2d4c41]">{location.title}</span>
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Learn what makes us a leading NDIS provider in{" "}
                {location.location}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-background ">
          <div className="mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Story Section - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl rounded-xl overflow-hidden h-full">
                  <div className="bg-[#2d4c41] text-white p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-bold">
                        Our Story
                      </h3>
                      {location?.contentStories &&
                        location.contentStories.length > 1 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/80">
                              {currentStoryIndex + 1} of{" "}
                              {location.contentStories.length}
                            </span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                onClick={() =>
                                  setCurrentStoryIndex((prev) =>
                                    prev === 0
                                      ? location.contentStories!.length - 1
                                      : prev - 1
                                  )
                                }
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                onClick={() =>
                                  setCurrentStoryIndex((prev) =>
                                    prev === location.contentStories!.length - 1
                                      ? 0
                                      : prev + 1
                                  )
                                }
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6">
                    {location?.contentStories &&
                    location.contentStories.length > 0 ? (
                      <>
                        <div className="prose max-w-none">
                          <p className="text-sm md:text-base leading-relaxed">
                            {
                              location.contentStories[currentStoryIndex]
                                ?.description
                            }
                          </p>
                        </div>
                      </>
                    ) : (
                      // Default content when no stories available
                      <>
                        <div className="prose max-w-none">
                          <p className="text-sm md:text-base leading-relaxed">
                            We are committed to providing exceptional NDIS
                            services to our community. Our experienced team
                            works closely with participants to achieve their
                            goals and live their best life.
                          </p>
                        </div>

                        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-[#2d4c41]/5 rounded-lg border border-[#2d4c41]/10">
                          <h4 className="text-base md:text-lg font-semibold mb-3 text-[#2d4c41]">
                            Provider Highlights
                          </h4>
                          <ul className="space-y-2 md:space-y-3">
                            <li className="flex items-start">
                              <div className="bg-[#e5b45b] rounded-full p-1 mr-3 flex-shrink-0">
                                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#2d4c41]" />
                              </div>
                              <span className="text-sm md:text-base text-gray-700">
                                NDIS Registered Provider
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-[#e5b45b] rounded-full p-1 mr-3 flex-shrink-0">
                                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#2d4c41]" />
                              </div>
                              <span className="text-sm md:text-base text-gray-700">
                                Serving {location?.location || "the community"}{" "}
                                since 2015
                              </span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-[#e5b45b] rounded-full p-1 mr-3 flex-shrink-0">
                                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#2d4c41]" />
                              </div>
                              <span className="text-sm md:text-base text-gray-700">
                                Qualified and experienced staff
                              </span>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Features Section - Takes up 3 columns */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-xl rounded-xl overflow-hidden">
                  <div className="bg-[#2d4c41] text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-2xl font-bold">Provider Features</h3>
                    <div className="text-sm bg-[#e5b45b] text-[#2d4c41] px-4 py-1.5 rounded-full font-medium">
                      {filteredFeatures.length} features available
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Search and Filter Controls */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4">
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search features..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="relative min-w-[180px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41] appearance-none bg-white"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {featureCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    {filteredFeatures.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                        {visibleFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start p-3 bg-[#2d4c41]/5 hover:bg-[#2d4c41]/10 rounded-lg transition-colors"
                          >
                            <div className="bg-[#e5b45b] rounded-full p-1 mr-3 flex-shrink-0">
                              <Check className="h-4 w-4 text-[#2d4c41]" />
                            </div>
                            <div>
                              <span className="text-gray-800">
                                {feature.text}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {feature.category}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                          No features match your search criteria.
                        </p>
                      </div>
                    )}

                    {/* Show More/Less Button */}
                    {filteredFeatures.length > 12 && (
                      <div className="flex justify-center mt-6">
                        <Button
                          variant="outline"
                          className="border-[#2d4c41] text-[#2d4c41] hover:bg-[#2d4c41]/5 flex items-center gap-2"
                          onClick={() => setShowAllFeatures(!showAllFeatures)}
                        >
                          {showAllFeatures ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Show All {filteredFeatures.length} Features
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderOverview;
