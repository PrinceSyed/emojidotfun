import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { ThirdwebProvider } from "thirdweb/react";
import { ThemeProvider } from "./components/ThemeProvider";
import HeaderNav from "./components/HeaderNav";
import { Toaster } from "@/components/ui/toaster";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Geenie.lol - Onchain Wishlist With Emojis",
  description:
    "Create an onchain wishlist with emojis and get paid in Eth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>



        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThirdwebProvider>
            <HeaderNav />
            {children}
            <Toaster />
          </ThirdwebProvider>

        </ThemeProvider>

      </body>
    </html>
  );
}


