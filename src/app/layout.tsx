import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Old Fashion Barbershop",
  description: "Premium barbershop experience",
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
