import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import galleryData from "@/data/gallery.json";
import { GalleryImage } from "@/types";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our gallery showcasing the beauty of PandinGroups — rooms, events, dining, and more.",
};

const images = galleryData as GalleryImage[];
const categories = ["all", "hotel", "apartments", "events", "dining", "lounge", "exterior"] as const;

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through the elegance and luxury of PandinGroups."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        height="sm"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer capitalize transition-colors ${
                  cat === "all"
                    ? "bg-sky-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  idx % 7 === 0 || idx % 7 === 4 ? "col-span-2 row-span-2 h-80" : "h-48"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3">
                    <p className="text-white text-sm font-medium">{img.alt}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-sky-600/80 text-white text-xs rounded-full capitalize">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
