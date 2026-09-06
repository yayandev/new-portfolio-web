import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-ink hover:text-paper",
  secondary:
    "border border-line-strong text-ink hover:border-ink",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2.5 rounded-[4px] px-5 text-[14px] font-medium transition-colors duration-200",
        styles[variant],
        className
      )}
    >
      {children}
    </a>
  );
}
