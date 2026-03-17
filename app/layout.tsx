import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";
import { CartProvider } from "./context/CartContext";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elfrutito.vercel.app"),
  title:
    "El Frutito | Frutos Secos, Frutas Deshidratadas, Semillas y más | Cordoba Capital",
  description:
    "Catalogo online de Frutos Secos, Frutas Deshidratadas, Semillas y más. /n Cordoba Capital",
  openGraph: {
    title: "El Frutito | Frutos secos en Córdoba",
    description: "Frutos secos premium al mejor precio. Envíos en Córdoba.",
    url: "https://elfrutito.vercel.app",
    siteName: "El Frutito",
    images: [
      {
        url: "/elFrutito.png",
        width: 1200,
        height: 630,
        alt: "El Frutito - Frutos secos",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Frutito",
    description: "Frutos secos premium en Córdoba",
    images: ["/elFutito.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans.variable} antialiased`}>
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
