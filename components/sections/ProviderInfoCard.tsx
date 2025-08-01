import React from "react";
import { CheckCircle } from "lucide-react";
import { Location } from "../../types/location";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProviderInfoCardProps {
  location: Location;
}

const ProviderInfoCard: React.FC<ProviderInfoCardProps> = ({ location }) => {
  return (
    <div className="rounded-lg relative z-20 mx-auto max-w-3xl">
      <div className="flex flex-col items-center text-center p-4 md:p-6 pt-1 pb-6">
        {/* Provider Logo - Positioned to overlap just the logo with the carousel */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <div className="h-32 w-32 md:h-42 md:w-42 rounded-full overflow-hidden border-4 border-[#e5b45b]/80 shadow-xl bg-white">
            {location.logo ? (
              <img
                src={location.logo}
                alt={`${location.title} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/128?text=Logo";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2d4c41] to-[#3a5f52] text-white">
                <span className="font-bold text-2xl md:text-3xl">
                  {location.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Provider Info */}
        <div className="text-center flex-grow mt-32 sm:mt-28">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d4c41]">
              {location.title}
            </h2>
          </div>

          {/* Claimed badge - vertically centered */}
          {location.claimStatus === "Not claimed" ? (
            <div className="">
              <Link href={`${process.env.NEXT_PUBLIC_NEARHEAL_LOCATION_ADMIN}`}>
                <Button
                  variant="outline"
                  className="bg-[#e5b45b] text-[#2d4c41]"
                >
                  Claim
                </Button>
              </Link>
            </div>
          ) : (
            <div className="ml-2 inline-flex items-center self-center">
              <CheckCircle className="h-4 w-4 text-[#e5b45b]" />
              <span className="text-xs text-[#e5b45b] ml-1">Claimed</span>
            </div>
          )}

          <p className="text-[#3a5f52] text-sm italic mb-2">
            We Are Here for You
          </p>
          <p className="text-gray-600 text-sm mb-2">
            {location.location || "Address not available"}
          </p>

          {/* Ratings */}
          {/* <div className="text-sm text-gray-500">0 Ratings</div> */}
        </div>
      </div>
      {/* horizontal line */}
      <div className="w-full h-[1px] bg-[#e5b45b]/40"></div>
    </div>
  );
};

export default ProviderInfoCard;
