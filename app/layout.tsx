import type { Metadata } from "next";
import "./globals.css"; // Global styles

export const metadata: Metadata = {
  title: "Yayan Faturrohman | Senior Systems & Full-Stack Engineer",
  description:
    "Minimalist, responsive, and uniquely interactive portfolio featuring compiled interactive project terminals and systems architecture grids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
