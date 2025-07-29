import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { Location, BusinessHour } from "@/types/location";

interface BusinessHoursProps {
  location: Location;
}

const BusinessHours: React.FC<BusinessHoursProps> = ({ location }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Get business hours for a specific day
  const getBusinessHours = (day: string): BusinessHour | undefined => {
    if (!location || !location.businessHours) return undefined;
    return location.businessHours.find((hours) => hours.day === day);
  };

  // Check if today
  const isToday = (day: string): boolean => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return today === day;
  };

  return (
    <section id="hours" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="text-[#e5b45b] font-medium mb-4">— OPENING HOURS</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">Our <span className="text-[#2d4c41]">Business Hours</span></h2>
              <p className="text-gray-600 max-w-2xl">
                Find the best time to visit or contact our support team
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#2d4c41] text-white p-6 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">Weekly Schedule</h3>
              </div>
              <div className="hidden md:block text-sm bg-[#e5b45b] text-[#2d4c41] px-4 py-1.5 rounded-full font-medium">
                All times are in local timezone
              </div>
            </div>
            
            {/* Desktop view */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-gray-600 font-medium">Day of Week</th>
                    <th className="py-4 px-6 text-left text-gray-600 font-medium">Opening Hours</th>
                    <th className="py-4 px-6 text-center text-gray-600 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day, index) => {
                    const hours = getBusinessHours(day);
                    const isOpen = hours !== undefined;
                    return (
                      <tr 
                        key={day} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          isToday(day) ? 'bg-[#2d4c41]/5' : ''
                        }`}
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              isToday(day) ? 'bg-[#e5b45b] text-[#2d4c41]' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {day.substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{day}</p>
                              {isToday(day) && <p className="text-[#e5b45b] text-sm font-medium">Today</p>}
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-gray-700 font-medium">
                          {isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                        </td>
                        <td className="py-5 px-6 text-center">
                          <div className="flex justify-center">
                            {isOpen ? (
                              <div className="flex items-center text-green-600 bg-green-50 px-4 py-1.5 rounded-full">
                                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                                <span className="font-medium">Open</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600 bg-red-50 px-4 py-1.5 rounded-full">
                                <XCircle className="h-4 w-4 mr-1.5" />
                                <span className="font-medium">Closed</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
              <div className="text-sm bg-[#e5b45b]/20 text-[#2d4c41] px-4 py-2 text-center font-medium border-b border-gray-100">
                All times are in local timezone
              </div>
              <div className="divide-y divide-gray-100">
                {daysOfWeek.map((day) => {
                  const hours = getBusinessHours(day);
                  const isOpen = hours !== undefined;
                  return (
                    <div 
                      key={day} 
                      className={`p-5 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                        isToday(day) ? 'bg-[#2d4c41]/5' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          isToday(day) ? 'bg-[#e5b45b] text-[#2d4c41]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {day.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {day} {isToday(day) && <span className="text-[#e5b45b] ml-1">(Today)</span>}
                          </p>
                          <p className="text-gray-600">
                            {isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                          </p>
                        </div>
                      </div>
                      {isOpen ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-600 max-w-2xl mx-auto">
            <p>Need assistance outside business hours? Leave a message through our contact form and we'll get back to you as soon as possible on the next business day.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;
