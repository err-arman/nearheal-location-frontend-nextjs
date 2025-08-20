import React, { useState, useCallback, useEffect } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location, Service } from "@/types/location";
import useEmblaCarousel from "embla-carousel-react";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  category?: string;
  duration?: string;
}

interface ServicesCarouselProps {
  location: Location;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ location }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Generate service cards from categories and tagline
  const services: ServiceItem[] | Service[] = location?.services?.length
    ? location.services
    : [
        // {
        //   title: "Architectural Design",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        //   image:
        //     "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80",
        //   category: "Design",
        //   duration: "2-4 weeks",
        // },
        // {
        //   title: "Interior Design",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        //   image:
        //     "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80",
        //   category: "Design",
        //   duration: "1-3 weeks",
        // },
        // {
        //   title: "Hospitality Design",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
        //   image:
        //     "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        //   category: "Hospitality",
        //   duration: "3-6 weeks",
        // },
        ...(location?.categories || []).map((category) => ({
          title: category,
          description: "Professional NDIS service tailored to your needs",
          image:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          category: "NDIS",
          duration: "Ongoing",
        })),
        ...(location.tagline || []).map((tag) => ({
          title: tag,
          description: "Specialized support service",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80",
          category: "Support",
          duration: "As needed",
        })),
      ];

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="py-16 bg-[#2d4c41]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="text-[#e5b45b] font-medium mb-4">— OUR SERVICES</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Explore Our Services:
              </h2>
              <p className="text-[#e5b45b] text-2xl font-serif italic">
                Your Path to Success
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 bg-[#e5b45b] text-[#2d4c41] hover:bg-[#d4a54a] border-none rounded-full px-6 py-2 flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-[0_0_90%] min-w-0 md:flex-[0_0_45%] lg:flex-[0_0_30%] px-1"
              >
                <div className="group bg-white rounded-xl overflow-hidden h-full transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-[#e5b45b]/30 relative">
                  {/* Service number badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#e5b45b] text-[#2d4c41] w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>

                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d4c41]/80 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <img
                      src={service.image}
                      // @ts-ignore
                      alt={service.title || service.name}
                      className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {service.category || 'NDIS Service'}
                      </span>
                    </div> */}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-[#2d4c41] group-hover:text-[#e5b45b] transition-colors duration-300">
                      {
                        // @ts-ignore
                        service.title || service.name
                      }
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-between items-center mt-10">
          <div className="hidden md:flex items-center gap-2">
            <div className="text-sm font-medium text-[#2d4c41]">
              <span className="text-[#e5b45b] font-bold text-xl">
                {selectedIndex + 1}
              </span>
              <span className="mx-1">/</span>
              <span>{scrollSnaps.length}</span>
              <span className="ml-2 text-gray-500">Services</span>
            </div>
            <div className="h-1 w-24 bg-gray-200 rounded-full ml-3">
              <div
                className="h-full bg-[#e5b45b] rounded-full transition-all duration-300"
                style={{
                  width: `${((selectedIndex + 1) / scrollSnaps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="flex gap-3 mx-auto md:mx-0">
            <Button
              onClick={() => {
                const prevIndex =
                  selectedIndex === 0
                    ? scrollSnaps.length - 1
                    : selectedIndex - 1;
                emblaApi?.scrollTo(prevIndex);
              }}
              className="bg-white text-[#2d4c41] hover:bg-[#2d4c41]/5 border border-[#2d4c41]/20 rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              onClick={scrollNext}
              className="bg-[#e5b45b] text-[#2d4c41] hover:bg-[#d4a54a] rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:shadow-lg"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
