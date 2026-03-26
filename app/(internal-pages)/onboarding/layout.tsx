export const metadata = {
    title: "Momentum | Onboarding"
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full flex flex-col  overflow-auto">

            <div>
                {children}
            </div>

        </div>
    )
}

export default Layout