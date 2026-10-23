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
  /** Small gold label above the title; defaults to the current breadcrumb */
  eyebrow?: string;
}

export default function PageHero({
  title,
  subtitle,
  image,
  breadcrumbs,
  height = "md",
  eyebrow,
}: PageHeroProps) {
  const heightClass = {
    sm: "h-64 md:h-80",
    md: "h-80 md:h-[26rem]",
    lg: "h-96 md:h-[32rem]",
  }[height];
  const label = eyebrow ?? "PaNDiN Group";

  return (
    <div className={`relative ${heightClass} mt-16 md:mt-20 overflow-hidden bg-wine-deep`}>
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover animate-ken-burns" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/95 via-wine/70 to-wine-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        {breadcrumbs && (
          <nav className="hero-enter flex items-center gap-2 mb-5 text-sm" style={{ "--enter-delay": "50ms" } as React.CSSProperties}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gold/60">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-gold-light hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="hero-enter flex items-center gap-3 mb-3" style={{ "--enter-delay": "150ms" } as React.CSSProperties}>
          <span className="h-px w-10 bg-gold" />
          <span className="text-gold-light text-xs font-semibold tracking-[0.35em] uppercase">{label}</span>
        </div>
        <h1
          className="hero-enter font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
          style={{ "--enter-delay": "250ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-enter mt-4 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed"
            style={{ "--enter-delay": "400ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
