// These styles apply to every route in the application
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import React from "react";
// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Weg Insurance",
  description:
    "Tu bienestar, nuestra misión. Descubre tu cobertura de seguro médico ideal con Weg Insurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="size-full overflow-hidden">{children}</body>
      </html>
    </ClerkProvider>
  );
}
