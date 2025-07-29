"use client"

import { useState } from "react"
import { ChevronDown, Stethoscope, HandHeart } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const menuItems = [
  {
    title: "Join as Provider",
    description: "Register as a healthcare provider and expand your reach",
    icon: Stethoscope,
    href: process.env.NEXT_PUBLIC_JOB_PORTAL_URL || "/#",
  },
  {
    title: "Become a NearHeal Member",
    description: "Start your journey as a healthcare support worker",
    icon: HandHeart,
    href: process.env.NEXT_PUBLIC_JOB_PORTAL_URL || "/#",
  },
]

export const JoinMenu = () => {
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
        Join Nearheal
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => !isMobile && setIsOpen(false)}
          className={`${isMobile ? "relative w-full" : "absolute left-1/2 -translate-x-1/2"}
            bg-white shadow-lg rounded-lg py-6 px-4 md:px-8 
            grid grid-cols-1 gap-4 border-t z-50
            ${isMobile ? "w-full" : "w-[600px]"}
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
