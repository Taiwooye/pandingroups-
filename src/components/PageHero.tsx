import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs?: Breadcrumb[];
  height?: "sm" | "md" | "lg";
}

export default function PageHero({
  title,
  subtitle,
  image,
  breadcrumbs,
  height = "md",
}: PageHeroProps) {
  const heightClass = {
    sm: "h-48 md:h-64",
    md: "h-64 md:h-80",
    lg: "h-80 md:h-96",
  }[height];

  return (
    <div className={`relative ${heightClass} mt-16 md:mt-20 overflow-hidden`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
      <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        {breadcrumbs && (
          <nav className="flex items-center gap-2 mb-3 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/40">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-amber-300 hover:text-amber-200 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-base md:text-lg text-white/80 max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
