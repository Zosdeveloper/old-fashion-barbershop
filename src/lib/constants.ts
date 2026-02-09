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
  { id: "cuts-01", src: "/images/gallery/cuts-01.jpg", alt: "Classic scissor cut with textured finish", category: "Cuts" as const },
  { id: "cuts-02", src: "/images/gallery/cuts-02.jpg", alt: "Sharp skin fade with hard part", category: "Cuts" as const },
  { id: "cuts-03", src: "/images/gallery/cuts-03.jpg", alt: "Mid fade with styled top", category: "Cuts" as const },
  { id: "cuts-04", src: "/images/gallery/cuts-04.jpg", alt: "Low taper fade with beard lineup", category: "Cuts" as const },
  { id: "cuts-05", src: "/images/gallery/cuts-05.jpg", alt: "Precision buzz cut with edge work", category: "Cuts" as const },
  { id: "interior-01", src: "/images/gallery/interior-01.jpg", alt: "Barbershop interior with vintage chairs", category: "Interior" as const },
  { id: "interior-02", src: "/images/gallery/interior-02.jpg", alt: "Classic barber station and mirrors", category: "Interior" as const },
  { id: "interior-03", src: "/images/gallery/interior-03.jpg", alt: "Shop ambiance and waiting area", category: "Interior" as const },
  { id: "team-01", src: "/images/gallery/team-01.jpg", alt: "Barber at work on a client", category: "Team" as const },
  { id: "team-02", src: "/images/gallery/team-02.jpg", alt: "Team member with clippers", category: "Team" as const },
  { id: "team-03", src: "/images/gallery/team-03.jpg", alt: "Barber finishing a precision cut", category: "Team" as const },
  { id: "cocktails-01", src: "/images/gallery/cocktails-01.jpg", alt: "Old Fashioned cocktail at the bar", category: "Cocktails" as const },
  { id: "cocktails-02", src: "/images/gallery/cocktails-02.jpg", alt: "Signature cocktail being prepared", category: "Cocktails" as const },
  { id: "cocktails-03", src: "/images/gallery/cocktails-03.jpg", alt: "Premium spirits selection", category: "Cocktails" as const },
] as const;
