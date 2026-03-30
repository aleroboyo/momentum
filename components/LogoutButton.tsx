'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = async () => {

    await fetch('/api/auth/logout', { method: 'POST' })
    
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="font-inter bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
        >
          Log Out
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-[#fff5d7] font-medium">Are you sure you want to log out?</p>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="font-inter bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
            >
              Yes, log out
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="font-inter border-2 border-[#fff5d7] text-[#fff5d7] py-3 px-8 rounded-full hover:bg-[#fff5d7] hover:text-[#24421E] hover:font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogoutButton