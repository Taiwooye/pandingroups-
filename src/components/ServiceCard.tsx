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
    <Link href={href} className="group block relative rounded-2xl overflow-hidden h-72 md:h-80 shadow-md hover:shadow-xl transition-shadow duration-300">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
      {badge && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 bg-sky-600/90 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
            {badge}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-bold text-white mb-1.5">{title}</h3>
        <p className="text-sm text-white/75 line-clamp-2 mb-3">{description}</p>
        <span className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-semibold group-hover:text-sky-200 transition-colors">
          Explore
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
