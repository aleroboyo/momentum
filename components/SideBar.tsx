'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { RxDashboard } from 'react-icons/rx'
import { IoLeafOutline, IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { IoPersonOutline } from 'react-icons/io5'
import { IoAddOutline } from 'react-icons/io5'
import { IoListOutline } from 'react-icons/io5'
import LogoutButton from '@/components/LogoutButton'

const SideBar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [habitsOpen, setHabitsOpen] = useState(false)
  const isActive = (href: string) => pathname === href

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-50 text-[#24421E]"
      >
        <CgMenuLeftAlt size={28} />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <div className={`
        fixed top-0 left-0 h-screen w-64 md:w-100 lg:w-64 z-50
        bg-[#24421E] text-[#fff5d7]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-4 text-[#fff5d7]"
        >
          <IoClose size={24} />
        </button>

        <div className="p-6 pb-4">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <Image
              src="/Momentum Logo _Transparent.png"
              alt="Momentum Logo"
              width={110}
              height={110}
            />
          </Link>
        </div>

        <div className="h-px bg-[#fff5d7]/20 mx-6 mb-4" />

        <div className="flex-1 px-4 md:px-12 mt-18 md:mt-28 lg:px-4 lg:mt-4 flex flex-col gap-6">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-inter text-sm transition-all
              ${isActive('/dashboard')
                ? 'bg-[#fff5d7] text-[#24421E] font-medium'
                : 'text-[#fff5d7]/70 hover:bg-[#fff5d7]/10 hover:text-[#fff5d7]'
              }`}
          >
            <RxDashboard size={18} />
            Dashboard
          </Link>

          <div>
            <button
              onClick={() => setHabitsOpen(!habitsOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-full font-inter text-sm transition-all
                ${pathname.startsWith('/habits')
                  ? 'bg-[#fff5d7] text-[#24421E] font-medium'
                  : 'text-[#fff5d7]/70 hover:bg-[#fff5d7]/10 hover:text-[#fff5d7]'
                }`}
            >
              <div className="flex items-center gap-3">
                <IoLeafOutline size={18} />
                My Habits
              </div>
              {habitsOpen
                ? <IoChevronUpOutline size={16} />
                : <IoChevronDownOutline size={16} />
              }
            </button>

            {habitsOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                <Link
                  href="/habits"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full font-inter text-sm transition-all
                    ${isActive('/habits')
                      ? 'bg-[#fff5d7]/20 text-[#fff5d7] font-medium'
                      : 'text-[#fff5d7]/60 hover:bg-[#fff5d7]/10 hover:text-[#fff5d7]'
                    }`}
                >
                  <IoListOutline size={16} />
                  All Habits
                </Link>
                <Link
                  href="/habits/create-habit"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full font-inter text-sm transition-all
                    ${isActive('/habits/create-habit')
                      ? 'bg-[#fff5d7]/20 text-[#fff5d7] font-medium'
                      : 'text-[#fff5d7]/60 hover:bg-[#fff5d7]/10 hover:text-[#fff5d7]'
                    }`}
                >
                  <IoAddOutline size={16} />
                  Create Habit
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-inter text-sm transition-all
              ${isActive('/profile')
                ? 'bg-[#fff5d7] text-[#24421E] font-medium'
                : 'text-[#fff5d7]/70 hover:bg-[#fff5d7]/10 hover:text-[#fff5d7]'
              }`}
          >
            <IoPersonOutline size={18} />
            Profile
          </Link>

        </div>

        <div className="h-px bg-[#fff5d7]/20 mx-6 mb-4" />

        <div className="p-4 pb-6">
          <LogoutButton />
        </div>

      </div>
    </>
  )
}

export default SideBar