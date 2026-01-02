import { Providers } from "@/src/presentation/components/Providers";
import type { Metadata, Viewport } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Infinite Battle - Dragon Ball Style Combat",
  description: "Experience epic Dragon Ball style battles in your browser. Card-based combat, real-time multiplayer, and stunning 3D visuals.",
  keywords: ["game", "battle", "dragon ball", "fighting", "multiplayer", "cards"],
  authors: [{ name: "Infinite Battle Team" }],
  openGraph: {
    title: "Infinite Battle",
    description: "Epic card-based combat game",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
