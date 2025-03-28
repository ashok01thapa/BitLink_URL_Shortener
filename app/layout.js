import localFont from "next/font/local";


import "./globals.css";
import Navbar from "@/componenets/Navbar";
const geistSans = localFont({
  src: "./Fonts/Poppins-ExtraBold.ttf",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Bitlinks - Your trusted URL shortener",
  description: "bitlinks helps you shorten your Urls easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  antialiased bg-purple-50`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
