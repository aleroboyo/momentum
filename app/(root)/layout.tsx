import Link from "next/link"
import Image from "next/image"
import MomentumLogo from '@/public/momentum-logo.jpeg'
import NavBar from "@/components/NavBar"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (

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

            <div className="hidden lg:block">
                <NavBar />
            </div>

            <div>
                {children}
            </div>

        </div>
    )
}

export default Layout