import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  if (!name) return "U"

  const names = name.trim().split(" ")
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export const categories = [
  "Accommodation/Tenancy",
  "Assist Access/Maintain Employ",
  "Assist Personal Activities",
  "Assist Prod-Pers Care/Safety",
  "Assist-Life Stage/ Transition",
  "Assist-Travel/Transport",
  "Assistive Equip-Recreation",
  "Assistive Prod-Household Task",
  "Behaviour Support",
  "Comms & Info Equipment",
  "Community Nursing Care",
  "Custom Prosthetics",
  "Daily Tasks/Shared Living",
  "Development-Life Skills",
  "Early Childhood Supports",
  "Ex Phys Pers Training",
  "Group/Centre Activities",
  "Hearing Equipment",
  "Home Modification",
  "Household Tasks",
  "Innov Community Participation",
  "Interpret/Translate",
  "Participate Community",
  "Personal Activities High",
  "Personal Mobility Equipment",
  "Plan Management",
  "Spec Support Employ",
  "Specialised Disability Accommodation",
  "Specialised Driver Training",
  "Support Coordination",
  "Therapeutic Supports",
  "Vehicle Modifications",
  "Vision Equipment",
];

export const localStorageKey = {
  token: "accessToken",
  userInfo: "userInfo"
}
