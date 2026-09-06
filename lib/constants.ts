export const SITE = {
  name: "YD",
  fullName: "Yayan Faturrohman",
  handle: "yayandev",
  tagline: "Full-Stack Engineer",
  email: "faturrohman0311@gmail.com",
  github: "https://github.com/yayandev",
  instagram: "https://www.instagram.com/yayandev",
  whatsapp: "https://wa.me/6281234567890",
  location: "Banten, Indonesia",
  timezone: "Asia/Jakarta",
  stack: ["Laravel", "MySQL", "React Native"],
} as const;

export const NAV_ITEMS = [
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.approach", href: "#approach" },
  { key: "nav.contact", href: "#contact" },
] as const;

export const SERVICES = ["web", "mobile", "maintenance"] as const;

export const APPROACH = ["custom", "pricing", "direct"] as const;

export const PORTFOLIO_API = "https://api-yayandev.vercel.app/api/portfolio";

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  image_url: string;
  created_at: string;
}
