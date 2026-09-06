import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="display-narrow text-[11px] text-accent">{eyebrow}</p>
      <h2 className="display-wide mt-4 text-[2rem] leading-[1.02] sm:text-4xl lg:text-[2.75rem] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
