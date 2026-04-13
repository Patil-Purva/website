import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Navbar from "../components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ayurvedic Hospital",
  description: "Ayurvedic Hospital Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>

          {/* ✅ Navbar */}
          <Navbar />

          {/* ✅ Toast container (GLOBAL) */}
          <ToastContainer position="top-center" autoClose={3000} />

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

        </ReactQueryProvider>
      </body>
    </html>
  );
}