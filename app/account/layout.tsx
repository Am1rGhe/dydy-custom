import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My account",
  description: "Manage your Dydy Custom account, orders and settings.",
  robots: { index: false, follow: true },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
