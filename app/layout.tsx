import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "SimuTrade Base - Socialized Leveraged Trading Simulation",
  description: "Practice leveraged trading on Base with zero risk. Compete with friends, join strategy rooms, and master trading skills.",
  openGraph: {
    title: "SimuTrade Base",
    description: "Socialized Leveraged Trading Simulation on Base",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
