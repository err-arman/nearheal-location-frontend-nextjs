import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Map,
  ExternalLink,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types/location";
import GoogleMap from "@/components/ui/GoogleMap";
import Link from "next/link";

interface ContactInfoProps {
  location: Location;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ location }) => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10">
          <div className="text-[#e5b45b] font-medium mb-4">— CONTACT US</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-4xl font-bold mb-2">
              Get Your{" "}
              <span className="text-[#e5b45b] font-serif italic">
                Free Quote Today!
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Google Map */}
          <div className="lg:col-span-12 mb-8">
            {(location.latitude && location.longitude) ||
            location.googleAddress ? (
              <GoogleMap
                pins={[
                  {
                    lat: location.latitude || undefined,
                    lng: location.longitude || undefined,
                    address:
                      !location.latitude || !location.longitude
                        ? location.googleAddress
                        : undefined,
                    title: location.title,
                    description: location.googleAddress || "",
                    link: location.website || undefined,
                  },
                ]}
                height="400px"
                zoom={15}
              />
            ) : (
              <div className="bg-gray-100 rounded-lg flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Map className="h-12 w-12 text-[#365346] mx-auto mb-4" />
                  <p className="text-gray-500">Map location not available</p>
                </div>
              </div>
            )}
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form className="space-y-6" id="contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41]"
                    placeholder="Ex. John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41]"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41]"
                  placeholder="Enter Subject"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d4c41] focus:border-[#2d4c41]"
                  placeholder="Enter here.."
                  required
                ></textarea>
              </div>

              <div>
                <Button
                  type="submit"
                  className="rounded-full bg-[#e5b45b] hover:bg-[#d4a54a] text-[#2d4c41] border-none pl-1 py-3 flex items-center gap-2"
                >
                  <div className="flex items-center justify-center bg-[#2d4c41] rounded-full h-8 w-8 mr-2">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5">
            <div className="bg-[#2d4c41] text-white rounded-lg p-8 h-full">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-200">
                    {location.googleAddress ||
                      "4517 Washington Ave.\nManchester, Kentucky 39495"}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact</h3>
                  {location.phone && (
                    <p className="text-gray-200 mb-1">
                      Phone : {location.phone || "+0123-456-789"}
                    </p>
                  )}
                  {location.email && (
                    <p className="text-gray-200">
                      Email : {location.email || "example@gmail.com"}
                    </p>
                  )}
                  {location.email && (
                    <p className="text-gray-200">
                      Website : {location.website || "example@gmail.com"}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Open Time</h3>
                  <p className="text-gray-200 mb-1">
                    Monday - Friday : 10:00 - 20:00
                  </p>
                  {/* <p className="text-gray-200">
                    Saturday - Sunday : 11:00 - 18:00
                  </p> */}
                </div>

                {location.claimStatus === "Not claimed" ? (
                  <div className="">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_NEARHEAL_LOCATION_ADMIN_URL}`}
                    >
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

                <div>
                  <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-[#e5b45b] text-[#2d4c41] p-2 rounded-full hover:bg-[#d4a54a] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-[#e5b45b] text-[#2d4c41] p-2 rounded-full hover:bg-[#d4a54a] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-[#e5b45b] text-[#2d4c41] p-2 rounded-full hover:bg-[#d4a54a] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.7c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zM17 17h-2v-3c0-.77-.23-1.3-.8-1.3-.56 0-.89.38-1.04.77-.05.13-.06.31-.06.45v3.1h-2v-6h2v.92c.27-.35.76-.86 1.85-.86 1.36 0 2.05.87 2.05 2.73V17z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-[#e5b45b] text-[#2d4c41] p-2 rounded-full hover:bg-[#d4a54a] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-[#e5b45b] text-[#2d4c41] p-2 rounded-full hover:bg-[#d4a54a] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
