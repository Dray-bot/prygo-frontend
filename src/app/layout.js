"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Prygo</title>
        <meta name="description" content="Prygo: Manage and track your orders effortlessly." />
        <meta property="og:title" content="Prygo" />
        <meta property="og:description" content="Prygo: Manage and track your orders effortlessly." />
        <meta property="og:image" content="/images/prygo.png" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClerkProvider>
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
