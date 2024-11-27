import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata } from "next/dist/types";

export const metadata: Metadata = {
  title: "VicePlay",
  description: "Vibe Like Vice City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className={`antialiased`}>
        <Navbar />
        <video autoPlay muted loop className="video">
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        {children}
      </body>
    </html>
  );
}
