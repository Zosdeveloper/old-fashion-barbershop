export const SITE_CONFIG = {
  name: "Old Fashion Barbershop",
  tagline: "Where Men Elevate Their Presence",
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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/oldfashionbarbershop",
} as const;

export const BOOKSY_URL =
  process.env.NEXT_PUBLIC_BOOKSY_URL ||
  "https://booksy.com/en-us/dl/placeholder";

export const HERO_IMAGES = [
  { src: "/images/hero/hero-beard-trim.jpg", alt: "Master barber trimming a client's beard" },
  { src: "/images/hero/hero-cocktail.jpg", alt: "Signature Old Fashioned cocktail being crafted" },
  { src: "/images/hero/hero-scissors-cut.jpg", alt: "Precision scissor cut in progress" },
  { src: "/images/hero/hero-finishing.jpg", alt: "Barber finishing a fresh cut" },
] as const;

export const SERVICES = [
  {
    id: "best-experience",
    title: "Best Experience In Town",
    description: "An extended session combining premium grooming, styling, and complete relaxation. Includes haircut, beard work, hot towel treatments, and the attention to detail you deserve. This is for men who refuse to settle for ordinary.",
    image: "/images/services/hot-towel-shave.jpg",
    duration: "1h 20min",
    signature: false,
  },
  {
    id: "mens-haircut",
    title: "Men's Haircut",
    description: "A tailored cut built around your style, facial structure, and lifestyle. We assess your hair type, face shape, and personal preferences to deliver a cut that looks sharp and feels right. This isn't a template — it's precision craftsmanship designed for you.",
    image: "/images/services/classic-haircut.jpg",
    duration: "30min",
    signature: true,
  },
  {
    id: "haircut-beard-trim",
    title: "Men's Haircut & Beard Trim",
    description: "Razor-sharp detailing and professional shaping with premium oils and balms. We sculpt your beard to complement your face and enhance your presence. Every line matters.",
    image: "/images/services/beard-trim.jpg",
    duration: "30min",
    signature: false,
  },
  {
    id: "haircut-hot-steam-shave",
    title: "Haircut & Hot Steam Shave",
    subtitle: "Premium",
    description: "The classic straight razor shave with steam, hot towels, and a finishing ritual using high-quality aftershave. Paired with a precision haircut, this is old-school grooming at its finest — no rushing, no compromise.",
    image: "/images/services/line-work.jpg",
    duration: "1h",
    signature: false,
  },
  {
    id: "hot-steam-shave",
    title: "Hot Steam Shave",
    description: "The classic straight razor shave with steam, hot towels, and a finishing ritual. Smooth, clean, and incredibly satisfying. This is old-school grooming at its finest.",
    image: "/images/services/fade.jpg",
    duration: "30min",
    signature: false,
  },
  {
    id: "kids-cut",
    title: "Kid's Cut",
    description: "A classic introduction to grooming, delivered with patience and precision. We make it comfortable, professional, and fun. Teaching the next generation what quality grooming looks like.",
    image: "/images/gallery/cuts-05.jpg",
    duration: "30min",
    signature: false,
  },
] as const;

export const ADDON_SERVICES = [
  { id: "ear-waxing", title: "Ear Waxing", duration: "15min" },
  { id: "nose-waxing", title: "Nose Waxing", duration: "15min" },
  { id: "hair-wash", title: "Hair Wash", duration: "10min" },
] as const;

export type GalleryCategory = "All" | "Cuts" | "Interior" | "Team" | "Cocktails";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Cuts",
  "Interior",
  "Team",
  "Cocktails",
];

export const GALLERY_ITEMS = [
  { id: "cuts-01", src: "/images/gallery/cuts-01.jpg", alt: "Fresh fade with styled top on young client", category: "Cuts" as const },
  { id: "cuts-02", src: "/images/gallery/cuts-02.jpg", alt: "Clean skin fade side profile", category: "Cuts" as const },
  { id: "cuts-03", src: "/images/gallery/cuts-03.jpg", alt: "Precision fade with textured finish", category: "Cuts" as const },
  { id: "cuts-04", src: "/images/gallery/cuts-04.jpg", alt: "Curly hair detail work from behind", category: "Cuts" as const },
  { id: "cuts-05", src: "/images/gallery/cuts-05.jpg", alt: "Client portrait after fresh haircut", category: "Cuts" as const },
  { id: "interior-01", src: "/images/gallery/interior-01.jpg", alt: "Barber working at the station with brick wall backdrop", category: "Interior" as const },
  { id: "interior-02", src: "/images/gallery/interior-02.jpg", alt: "Overhead view of the barbershop floor", category: "Interior" as const },
  { id: "interior-03", src: "/images/gallery/interior-03.jpg", alt: "Barber and client at the chair with ring light", category: "Interior" as const },
  { id: "team-01", src: "/images/gallery/team-01.jpg", alt: "Barber shaping a client's hairline", category: "Team" as const },
  { id: "team-02", src: "/images/gallery/team-02.jpg", alt: "Owner and happy client posing together", category: "Team" as const },
  { id: "team-03", src: "/images/gallery/team-03.jpg", alt: "Barber trimming client's beard in the chair", category: "Team" as const },
  { id: "cocktails-01", src: "/images/gallery/cocktails-01.jpg", alt: "Bourbon being poured into crystal Old Fashioned glass", category: "Cocktails" as const },
  { id: "cocktails-02", src: "/images/gallery/cocktails-02.jpg", alt: "Old Fashioned garnished with cherry on gold pick", category: "Cocktails" as const },
  { id: "cocktails-03", src: "/images/gallery/cocktails-03.jpg", alt: "Signature Old Fashioned being handed to a client", category: "Cocktails" as const },
  { id: "interior-04", src: "/images/gallery/interior-04.jpg", alt: "Full shop interior with leather barber chairs and brick walls", category: "Interior" as const },
  { id: "cocktails-04", src: "/images/gallery/cocktails-04.jpg", alt: "Client enjoying an Old Fashioned cocktail in the barber chair", category: "Cocktails" as const },
] as const;

export const TEAM_MEMBERS = [
  {
    id: "marco",
    name: "Marco Rossi",
    role: "Owner & Master Barber",
    bio: "With over 15 years behind the chair, Marco founded Old Fashion Barbershop to bring authentic craftsmanship back to Naples. His signature fades and hot towel shaves have earned a loyal following.",
    image: "/images/team/barber-01.jpg",
  },
  {
    id: "daniel",
    name: "Daniel Cruz",
    role: "Senior Barber",
    bio: "A precision artist with an eye for detail, Daniel specializes in modern fades and intricate line work. His steady hand and creative vision keep clients coming back.",
    image: "/images/team/barber-02.jpg",
  },
  {
    id: "james",
    name: "James Turner",
    role: "Barber & Stylist",
    bio: "James brings a fresh perspective to classic barbering. Trained in both traditional and contemporary techniques, he has a talent for finding the perfect cut for every face shape.",
    image: "/images/team/barber-03.jpg",
  },
  {
    id: "tony",
    name: "Tony Valentino",
    role: "Barber",
    bio: "Tony grew up in barbershops and carries that old-school passion into every service. Known for his meticulous beard shaping and relaxed chair-side manner.",
    image: "/images/team/barber-04.jpg",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Old Fashioned isn't just a barbershop — it's where I go to reset. The attention to detail is unmatched and the Old Fashioned cocktail is the cherry on top.",
    name: "Michael R.",
    title: "Regular Client",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Finally, a place that understands what men want. Professional, masculine, and worth every minute. I've been coming for over a year and every single cut has been perfect.",
    name: "David K.",
    title: "Regular Client",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Walked in without an appointment and they fit me right in. Daniel gave me the best fade I've ever had. The vibe is incredible — brick walls, great music, and top-shelf cocktails.",
    name: "James L.",
    title: "First-Time Client",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "The hot towel shave changed everything. I drove 45 minutes from Fort Myers and it was worth every mile. This is the only barbershop I trust with my look.",
    name: "Chris P.",
    title: "Fort Myers Client",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "My son and I both get our cuts here. The barbers are craftsmen who make everyone feel welcome. It's become our Saturday tradition.",
    name: "Robert T.",
    title: "Regular Client",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Do you accept walk-ins?",
    answer: "Yes, we welcome walk-ins during business hours. However, we recommend booking through Booksy to guarantee your preferred time slot, especially on Saturdays.",
  },
  {
    question: "What should I expect on my first visit?",
    answer: "Your barber will start with a one-on-one consultation to understand your style and preferences. From there, you'll receive a precision cut tailored to you, finished with styling and grooming tips. And yes — you'll be offered our signature Old Fashioned cocktail.",
  },
  {
    question: "Is parking available?",
    answer: "Street parking is available along 1st Avenue South and surrounding blocks. There is also a public parking garage within a short walk of the shop.",
  },
  {
    question: "How long does a typical appointment take?",
    answer: "A standard haircut takes approximately 30-45 minutes. Services like our Hot Towel Shave or combination packages may take up to an hour. We never rush — quality takes the time it takes.",
  },
  {
    question: "Do you serve alcohol?",
    answer: "We offer a complimentary signature Old Fashioned cocktail to clients during their service. It's part of the premium experience that sets us apart.",
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept all major credit and debit cards, Apple Pay, Google Pay, and cash. Tips can be added to card payments or given directly to your barber.",
  },
  {
    question: "Can I request a specific barber?",
    answer: "Absolutely. When booking through Booksy, you can select your preferred barber. If you're a walk-in, we'll do our best to accommodate your request based on availability.",
  },
] as const;
