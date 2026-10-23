import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Use on dark (wine) backgrounds */
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-gold-light" : "text-gold-dark"}`}>
        {eyebrow}
      </span>
      <h2 className={`font-serif text-3xl md:text-5xl font-semibold mt-3 leading-tight ${light ? "text-white" : "text-wine"}`}>
        {title}
      </h2>
      <div className={`gold-divider mt-5 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-5 max-w-xl leading-relaxed ${centered ? "mx-auto" : ""} ${light ? "text-white/70" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
