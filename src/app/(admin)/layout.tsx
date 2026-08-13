import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "@/styles/globals.css";
import "@/styles/admin.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | RAC Nepal",
    template: "%s | RAC Nepal Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-screen w-full">{children}</body>
    </html>
  );
}
