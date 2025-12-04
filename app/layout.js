import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GetStarted from "@/components/GetStarted";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Meww Store",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        <Header />
        <GetStarted />
        {children}
      </body>
    </html>
  );
}
