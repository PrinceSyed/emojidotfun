import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { ThirdwebProvider } from "thirdweb/react";
import { ThemeProvider } from "./components/ThemeProvider";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Emoji.Fun - Onchain Wishlist With Emojis",
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

        <header className="flex justify-between items-center p-4 container mx-auto">
          <div className="flex justify-start items-center">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
            <Link href="/">
              <h1 className="text-p1 font-bold ml-2 hidden sm:block"> Emoji.Fun </h1>
            </Link>
          </div>

          <nav>
            <Link href="/wishlist">
              Wishlist
            </Link>
          </nav>
        </header>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}


