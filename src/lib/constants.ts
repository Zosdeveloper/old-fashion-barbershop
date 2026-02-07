export const SITE_CONFIG = {
  name: "Old Fashion Barbershop",
  tagline: "Precision Grooming for the Discerning Man",
  description:
    "Premium barbershop in Naples, FL. Expert haircuts, fades, beard shaping, and hot towel shaves in a refined atmosphere. Walk-ins welcome.",
  url: "https://oldfashionbarbershop.com",
} as const;

export const BUSINESS_INFO = {
  phone: "(239) 285-8347",
  email: "info@oldfashionbarbershop.com",
  address: {
    street: "852 1st Ave South",
    city: "Naples",
    state: "FL",
    zip: "34102",
    full: "852 1st Ave South, Naples, FL 34102",
  },
  serviceArea: ["Naples", "Bonita Springs", "Fort Myers", "Marco Island", "Cape Coral"],
  hours: [
    { day: "Sunday", open: "Closed", close: "Closed" },
    { day: "Monday", open: "9:00 AM", close: "2:00 PM", reopen: "4:00 PM", reclose: "7:30 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "2:00 PM", reopen: "4:00 PM", reclose: "7:30 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "2:00 PM", reopen: "4:00 PM", reclose: "7:30 PM" },
    { day: "Thursday", open: "9:00 AM", close: "2:00 PM", reopen: "4:00 PM", reclose: "7:30 PM" },
    { day: "Friday", open: "9:00 AM", close: "2:00 PM", reopen: "4:00 PM", reclose: "7:30 PM" },
    { day: "Saturday", open: "12:00 PM", close: "6:00 PM" },
  ],
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Gallery", href: "/gallery" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/oldfashionbarbershop",
} as const;

export const BOOKSY_URL =
  process.env.NEXT_PUBLIC_BOOKSY_URL ||
  "https://booksy.com/en-us/dl/placeholder";
