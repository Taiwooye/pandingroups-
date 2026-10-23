import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

export default function ServiceCard({ title, description, image, href, badge }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="card-luxe group block relative rounded-3xl overflow-hidden h-80 md:h-96 border border-transparent shadow-md"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      {badge && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-gold/40 text-gold-light text-[11px] font-semibold rounded-full uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl font-semibold text-white mb-2">{title}</h3>
        <div className="h-px w-10 bg-gold mb-3 group-hover:w-20 transition-all duration-500" />
        <p className="text-sm text-white/75 line-clamp-2 mb-4">{description}</p>
        <span className="inline-flex items-center gap-2 text-gold-light text-sm font-semibold">
          Explore
          <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
