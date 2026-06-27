import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yayan Faturrohman | Full-Stack Engineer",
  description:
    "Building custom management information systems, web apps, and mobile applications — from Banten for clients across Indonesia.",
  verification: {
    other: {
      "facebook-domain-verification": ["db7s6dpvh2t8satvwa4ohhrz7aeas6"],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
