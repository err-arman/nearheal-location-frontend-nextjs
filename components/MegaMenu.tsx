"use client"

import { useState } from "react"
import { Briefcase, ShoppingCart, Calendar, Stethoscope, BookOpen, ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const menuItems = [
  {
    title: "Career Portal",
    description: "Find your dream job in healthcare and education",
    icon: Briefcase,
    href: process.env.NEXT_PUBLIC_JOB_PORTAL_URL || "/#",
  },
  {
    title: "Marketplace",
    description: "Shop for healthcare products and equipment",
    icon: ShoppingCart,
    href: process.env.NEXT_PUBLIC_ECOMMERCE_URL || "/#",
  },
  {
    title: "RMarketplace",
    description: "Buy and sell used medical equipment",
    icon: ShoppingCart,
    href: "/#",
  },
  {
    title: "Event Management",
    description: "Healthcare conferences and workshops",
    icon: Calendar,
    href: "/#",
  },
  {
    title: "Telehealth",
    description: "Virtual consultations with healthcare professionals",
    icon: Stethoscope,
    href: "/#",
  },
  {
    title: "E-learning",
    description: "Online courses for healthcare professionals",
    icon: BookOpen,
    href: "/#",
  },
]

export const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
        className="px-4 py-2 text-gray-700 hover:text-primary transition-colors flex items-center"
      >
        Products
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => !isMobile && setIsOpen(false)}
          className={`${isMobile ? "relative w-full" : "absolute left-1/2 -translate-x-1/2"}
            bg-white shadow-lg rounded-lg py-6 px-4 md:px-8 ${
              isMobile
                ? "grid grid-cols-1"
                : "w-[1000px] max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            } 
            gap-4 md:gap-8 border-t z-50
          `}
          style={{ top: isMobile ? "0" : "calc(100% + 1px)" }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-md text-primary-foreground">{item.title}</h3>
                <p className="mt-1 text-xs text-primary-foreground/80">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
