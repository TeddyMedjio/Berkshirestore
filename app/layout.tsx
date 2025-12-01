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
  title: "Berkshire - Premium Bronz Busts | Warren Buffett | Charlie Munger",
  description: "Warren and Charlie in bronze at last",
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
