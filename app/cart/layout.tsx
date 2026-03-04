import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart and proceed to checkout at Dydy Custom.",
  robots: { index: false, follow: true },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
