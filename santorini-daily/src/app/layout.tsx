import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santorini Daily",
  description: "Educational web app for learning Santorini history, nature, and culture.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
