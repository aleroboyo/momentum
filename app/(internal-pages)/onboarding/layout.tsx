export const metadata = {
    title: "Momentum | Onboarding"
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-linear-to-b from-[#0d4212] to-[#010602] overflow-auto">

            <div>
                {children}
            </div>

        </div>
    )
}

export default Layout