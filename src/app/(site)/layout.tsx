import { AppointmentBookingProvider } from "@/components/appointment-booking";
import { Footer, Header } from "@/components/layout";
import { Preloader } from "@/components/preloader";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex w-full min-h-screen flex-col">
        <AppointmentBookingProvider>
          <Preloader />
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </AppointmentBookingProvider>
      </body>
    </html>
  );
}
