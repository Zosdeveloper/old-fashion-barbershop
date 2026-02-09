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

export const SERVICES = [
  {
    id: "classic-haircut",
    title: "Classic Haircut",
    description:
      "Every cut begins with a one-on-one consultation and ends with a ritual of precision. We take the time to understand your style, sculpt every line by hand, and deliver a finish that speaks for itself.",
    image: "/images/services/classic-haircut.jpg",
    signature: false,
  },
  {
    id: "fade-skin-fade",
    title: "Fade / Skin Fade",
    description:
      "Seamless blending elevated to an art form. Our barbers master the gradient from skin to length with meticulous clipper control, delivering modern craftsmanship that turns heads.",
    image: "/images/services/fade.jpg",
    signature: false,
  },
  {
    id: "line-work-details",
    title: "Line Work & Details",
    description:
      "Architectural precision for the finishing touch. Sharp edges, clean partings, and razor-defined lines that frame your look with the kind of detail only a master barber can deliver.",
    image: "/images/services/line-work.jpg",
    signature: false,
  },
  {
    id: "beard-trim-shaping",
    title: "Beard Trim & Shaping",
    description:
      "Expert sculpting that transforms facial hair into a statement. We shape, taper, and refine your beard with surgical precision, creating clean lines that complement your bone structure.",
    image: "/images/services/beard-trim.jpg",
    signature: false,
  },
  {
    id: "hot-towel-shave",
    title: "Hot Towel Shave",
    description:
      "The ultimate sensory experience in men's grooming. Warm lather, steaming towels, and the steady hand of a straight razor gliding across your skin. This is relaxation refined into ritual — our signature service.",
    image: "/images/services/hot-towel-shave.jpg",
    signature: true,
  },
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
