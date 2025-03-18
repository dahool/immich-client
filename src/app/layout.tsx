import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ThemeModeScript } from "flowbite-react";
import "@/app/globals.css";
import { NextDevtoolsProvider } from "@next-devtools/core";
import { environment } from "@/env/environment";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: environment.app.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} antialised`}>
        <NextDevtoolsProvider>
          {children}
        </NextDevtoolsProvider>
      </body>
    </html>
  );
}
