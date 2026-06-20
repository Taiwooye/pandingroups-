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
  type: "1-bedroom" | "2-bedroom" | "3-bedroom" | "4-bedroom";
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

// ---- API response types ----

export interface ApiMedia {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
  type: string;
  size: number;
  sort_order: number;
}

export interface ApiRoom {
  id: number;
  slug: string;
  name: string;
  property_type: { value: string; label: string };
  category: { value: string; label: string };
  description: string;
  price_per_night: string;
  price_per_week: string | null;
  price_per_month: string | null;
  max_guests: number;
  size_sqm: number | null;
  bedroom_count: number | null;
  features: string[];
  amenities: string[] | null;
  facilities: string[] | null;
  sort_order: number;
  available_count: number;
  total_count: number;
  media: ApiMedia[];
  units?: { id: number; room_number: string | number; status: string }[];
  related?: { id: number; slug: string; name: string; price_per_night: string; category: string; first_media_url: string }[];
}

export interface ApiApartment {
  id: number;
  slug: string;
  name: string;
  property_type: { value: string; label: string };
  category: { value: string; label: string };
  description: string;
  price_per_night: string;
  price_per_week: string | null;
  price_per_month: string | null;
  max_guests: number;
  size_sqm: number | null;
  bedroom_count: number | null;
  features: string[];
  amenities: string[] | null;
  facilities: string[] | null;
  sort_order: number;
  available_count: number;
  total_count: number;
  media: ApiMedia[];
  units?: { id: number; unit_label: string; status: string }[];
  related?: { id: number; slug: string; name: string; price_per_night: string; category: string; first_media_url: string }[];
}

export interface ApiVenue {
  id: number;
  slug: string;
  name: string;
  description: string;
  min_capacity: number;
  max_capacity: number;
  floor_space_sqm: number;
  price_per_day: string;
  status: { value: string; label: string };
  features: string[];
  event_types: string[];
  sort_order: number;
  media: ApiMedia[];
}

export interface ApiBarMenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
}

export interface ApiBar {
  id: number;
  slug: string;
  name: string;
  description: string;
  status: { value: string; label: string };
  features: string[];
  sort_order: number;
  media: ApiMedia[];
  menu?: {
    beers?: ApiBarMenuItem[];
    cocktails?: ApiBarMenuItem[];
    non_alcoholic?: ApiBarMenuItem[];
    spirits?: ApiBarMenuItem[];
    wines?: ApiBarMenuItem[];
  };
}

export interface ApiOffering {
  type: string;
  label: string;
  description: string;
  meta: Record<string, unknown>;
}

export interface ApiTestimonial {
  id: number;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_image_url: string | null;
  review_text: string;
  review_date: string;
}

export interface ApiRecreation {
  id: number;
  slug: string;
  name: string;
  type: { value: string; label: string };
  description: string;
  status: { value: string; label: string };
  features: string[];
}

// ---- Existing / legacy types ----

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
