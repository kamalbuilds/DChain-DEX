import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { IBM_Plex_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import Navbar from "@/components/Navbar";

const fontHeading = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700',
})

const fontBody = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400',
})


const inter = Inter({ subsets: ["latin"] });


export const client = createThirdwebClient({ 
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body 
          className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <ThirdwebProvider>
          <Navbar />
          {children}
      </ThirdwebProvider>
      </body>
    </html>
  );
}