import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe by Chan",
  description: "To reduce food waste!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={"bg-black"}>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
