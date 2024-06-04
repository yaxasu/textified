import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from "@/components/Providers";
import { Toaster } from 'react-hot-toast';

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Textified",
  description: "Transform the way you interact with text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <head>
            <link rel="icon" href="/textifiedfavicon.ico" />
          </head>
          <body className={font.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
