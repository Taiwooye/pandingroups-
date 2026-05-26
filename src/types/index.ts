export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  gallery: string[];
  capacity: number;
  size: number;
  features: string[];
  amenities: string[];
  available: boolean;
  category: "standard" | "deluxe" | "suite" | "penthouse";
}

export interface Apartment {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  gallery: string[];
  bedrooms: number;
  bathrooms: number;
  size: number;
  features: string[];
  amenities: string[];
  available: boolean;
  type: "studio" | "1-bedroom" | "2-bedroom" | "3-bedroom" | "penthouse";
}

export interface EventHall {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  gallery: string[];
  capacity: number;
  size: number;
  features: string[];
  suitable: string[];
  available: boolean;
}

export interface LoungeBar {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  openHours: string;
  features: string[];
  menu: MenuItem[];
  available: boolean;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "hotel" | "apartments" | "events" | "dining" | "lounge" | "exterior";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

export interface DiningItem {
  id: string;
  name: string;
  description: string;
  image: string;
  openHours: string;
  cuisine: string;
  priceRange: string;
  features: string[];
  menu: DiningMenuSection[];
}

export interface DiningMenuSection {
  section: string;
  items: DiningMenuItem[];
}

export interface DiningMenuItem {
  name: string;
  description: string;
  price: number;
}
