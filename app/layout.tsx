import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Inter } from "next/font/google"
import "@/styles/globals.css"
import Link from "next/link"
import Image from "next/image"
import MomentumLogo from '@/public/momentum-logo.jpeg'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni'
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Momentum",
  description: "Build habits that move your life forward.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Momentum',
  },
};

export const viewport: Viewport = {
  themeColor: '#24421E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/momentum-icon.png" />
      </head>

      <body className={`${bodoni.variable} ${inter.variable} antialiased`}>

        <div className="min-h-screen w-full flex flex-col bg-linear-to-b from-[#0d4212] to-[#010602] overflow-auto">

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="tinyBlob tinyBlob1" />
            <span className="tinyBlob tinyBlob2" />
            <span className="tinyBlob tinyBlob3" />
          </div>

          <div className="p-4 lg:hidden">
            <Link href="/">
              <Image src={MomentumLogo} alt="Momentum Logo" width={130} height={130} />
            </Link>
          </div>

          <div className="flex-1">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}




