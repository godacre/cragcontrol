import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CragControl - Climbing Gym OS",
  description: "Full climbing gym management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
