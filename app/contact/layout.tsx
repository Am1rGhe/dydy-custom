import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dydy Custom. We would love to hear from you.",
  openGraph: {
    title: "Contact | Dydy Custom",
    description: "Get in touch with Dydy Custom. We would love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
