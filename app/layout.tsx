import Header from "@/components/shared/Header";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Providers from "@/components/providers/CartProvider";

const siteName = "Dydy Custom";
const defaultDescription =
  "Your one-stop shop for custom-designed clothing. Create unique styles that express your personality.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: ["custom clothing", "fashion", "clothing", "Dydy Custom", "custom design"],
  authors: [{ name: siteName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
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
        <Providers>
          <Header />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
