import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import SideBar from '@/components/SideBar'

export default async function InternalLayout({ children }: { children: React.ReactNode }) {
  const userId = await getSession()
  if (!userId) redirect('/login')

  return (
    <div className="min-h-screen w-full flex bg-[#fff5d7]">
      
      <SideBar />

      <div className="flex-1 overflow-auto pt-16 lg:pt-0">
        {children}
      </div>

    </div>
  )
}