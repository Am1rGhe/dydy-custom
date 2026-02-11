import Header from "@/components/shared/Header";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Providers from "@/components/providers/CartProvider";

export const metadata: Metadata = {
  title: "DydyShop",
  description: "A fashion Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
