import type { Metadata } from "next";
import { Forum, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const forum = Forum({
  variable: "--font-forum",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://berkshirenerds.com'),
  title: {
    default: "Premium Bronze Busts of Warren Buffett & Charlie Munger | Berkshire Nerds",
    template: "%s | Berkshire Nerds"
  },
  description: "Hand-crafted premium bronze busts of Warren Buffett and Charlie Munger. Cast in 96% copper Everdur bronze with Blue Fantasy stone base. Perfect for your office or as a gift for fellow investors.",
  keywords: ["Warren Buffett", "Charlie Munger", "bronze bust", "Berkshire Hathaway", "investment", "office decor", "premium sculpture", "bronze statue"],
  authors: [{ name: "Berkshire Nerds" }],
  creator: "Berkshire Nerds",
  publisher: "Berkshire Nerds",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://berkshirenerds.com",
    siteName: "Berkshire Nerds",
    title: "Premium Bronze Busts of Warren Buffett & Charlie Munger",
    description: "Hand-crafted premium bronze busts of Warren Buffett and Charlie Munger. Cast in 96% copper Everdur bronze.",
    images: [
      {
        url: "/images/warren_table.jpg",
        width: 1200,
        height: 630,
        alt: "Warren Buffett Bronze Bust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Bronze Busts of Warren Buffett & Charlie Munger",
    description: "Hand-crafted premium bronze busts of Warren Buffett and Charlie Munger.",
    images: ["/images/warren_table.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${forum.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
