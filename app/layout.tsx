import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${inter.variable} antialiased`}
      >
        <div className="relative h-screen w-full overflow-hidden">

          <div className="absolute inset-0 bg-linear-to-b from-[#0d4212] to-[#010602]"></div>

          <div className="relative z-20 p-4">
            <Link href="/">
              <Image src={MomentumLogo} alt="Momentum Logo" width={130} />
            </Link>
          </div>


          <div>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}




