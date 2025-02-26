import "@/styles/globals.css";
import { Roboto_Condensed } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { MantineProvider } from "@mantine/core";
import { NextUIProvider } from "@nextui-org/react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/Providers";
import MenuNav from "@/components/menunav/MenuNav";

const font = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Investment-X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={font.className}>
      <body className="bg-black text-white max-h-screen flex flex-col overflow-auto">
        <MantineProvider>
          <NextUIProvider>
            <ErrorBoundary>
              <Providers>
                <div className="flex flex-row max-h-screen overflow-auto">
                  <MenuNav />
                  <div className="flex flex-col flex-grow max-h-screen overflow-auto">
                    <header className="sticky top-0 left-0 w-full bg-gray-800 shadow-lg z-50">
                      <Navbar />
                    </header>
                    <main className="flex-grow w-full mx-auto bg-black p-6">
                      {children}
                    </main>
                    <footer className="w-full text-sm text-gray-400 text-center mt-auto py-4 border-t border-gray-700">
                      <div>
                        © {new Date().getFullYear()} Investment-X. All rights reserved.
                      </div>
                    </footer>
                  </div>
                </div>
              </Providers>
            </ErrorBoundary>
          </NextUIProvider>
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}

