import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Removerr",
  description:
    "Application de suppression de films et séries, dans Radarr, Sonnarr et Overseerr.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "hsl(222.2 84% 4.9%)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
