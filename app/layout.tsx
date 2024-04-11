// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ReduxProvider } from "@/lib/provider";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Recipe by Chan",
//   description: "To reduce food waste!",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={""}>
//       <body className={inter.className}>
//         <ReduxProvider>{children}</ReduxProvider>
//       </body>
//     </html>
//   );
// }
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
  const isDarkMode = true; // Replace with your logic to determine if dark mode is on
  return (
    <html lang="en" className={""}>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
