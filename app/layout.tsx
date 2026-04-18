import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Inter } from "next/font/google"
import "@/styles/globals.css"

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

        
          <div>
            {children}
          </div>

      </body>
    </html>
  );
}




