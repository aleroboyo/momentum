'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TiHeartFullOutline } from "react-icons/ti"
import { TbFlowerFilled, TbTargetArrow } from "react-icons/tb"
import { PiFlowerLotusFill } from "react-icons/pi"
import { FaLeaf, FaSmile, FaSmileBeam, FaRunning } from "react-icons/fa"
import { BsStars } from "react-icons/bs"
import { MdOutlineStar } from "react-icons/md"
import { RiDiamondFill } from "react-icons/ri"
import { GiWeightLiftingUp, GiWhiteBook, GiMeditation, GiNotebook, GiNightSleep } from "react-icons/gi"
import { IoWater, IoFastFood } from "react-icons/io5"
import { IoMdLaptop } from "react-icons/io"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useRef } from 'react'

const icons = [
  { value: "heart", component: <TiHeartFullOutline size={20} /> },
  { value: "flower", component: <TbFlowerFilled size={20} /> },
  { value: "lotus", component: <PiFlowerLotusFill size={20} /> },
  { value: "leaf", component: <FaLeaf size={20} /> },
  { value: "smile", component: <FaSmile size={20} /> },
  { value: "stars", component: <BsStars size={20} /> },
  { value: "star", component: <MdOutlineStar size={20} /> },
  { value: "smilebeam", component: <FaSmileBeam size={20} /> },
  { value: "diamond", component: <RiDiamondFill size={20} /> },
  { value: "workout", component: <GiWeightLiftingUp size={20} /> },
  { value: "read", component: <GiWhiteBook size={20} /> },
  { value: "water", component: <IoWater size={20} /> },
  { value: "meditate", component: <GiMeditation size={20} /> },
  { value: "journal", component: <GiNotebook size={20} /> },
  { value: "sleep", component: <GiNightSleep size={20} /> },
  { value: "run", component: <FaRunning size={20} /> },
  { value: "laptop", component: <IoMdLaptop size={20} /> },
  { value: "food", component: <IoFastFood size={20} /> },
  { value: "target", component: <TbTargetArrow size={20} /> },
]

interface HabitData {
  name: string
  icon: string
  frequency: string
  target: number
  unit: string
}

interface HabitActionsProps {
  habitId: string
  habit: HabitData
}

const HabitActions = ({ habitId, habit }: HabitActionsProps) => {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState<null | 'edit' | 'delete'>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: habit.name,
    icon: habit.icon,
    frequency: habit.frequency,
    target: habit.target.toString(),
    unit: habit.unit,
    customUnit: '',
  })

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
        }
      } else {
        if (scrollLeft <= 10) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" })
        } else {
          scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
        }
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) { alert('Please enter a habit name'); return }
    if (!formData.icon) { alert('Please select an icon'); return }
    if (!formData.frequency) { alert('Please select a frequency'); return }
    if (!formData.target || Number(formData.target) <= 0) { alert('Please enter a valid target'); return }
    if (!formData.unit) { alert('Please select a unit'); return }

    const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit

    setLoading(true)
    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          icon: formData.icon,
          frequency: formData.frequency,
          target: formData.target,
          unit: finalUnit,
        }),
      })

      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Something went wrong'); return }

      router.refresh()
      setMode(null)

    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) { alert(data.error || 'Something went wrong'); return }

      router.push('/habits')

    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (mode === null) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setMode('edit')}
          className="py-2 px-4 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm font-medium hover:bg-[#24421E] hover:text-[#fff5d7] transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => setMode('delete')}
          className="py-2 px-4 rounded-full border-2 border-red-400 text-red-400 text-sm font-medium hover:bg-red-400 hover:text-white transition-all"
        >
          Delete
        </button>
      </div>
    )
  }

  if (mode === 'delete') {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-[#fff5d7] rounded-3xl p-8 max-w-sm w-full text-center">
          <p className="text-xl font-medium text-[#24421E] mb-2">Delete Habit?</p>
          <p className="text-sm text-[#24421E]/60 mb-6">
            This will permanently delete this habit and all its logs. This cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="py-2 px-6 rounded-full bg-red-400 text-white text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Yes, delete'}
            </button>
            <button
              onClick={() => setMode(null)}
              className="py-2 px-6 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-[#fff5d7] rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-medium text-[#24421E] mb-6">Edit Habit</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">

          <div>
            <label className="text-sm text-[#24421E]/60 mb-2 block">Icon</label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scroll("left")} className="shrink-0">
                <IoIosArrowBack size={20} />
              </button>
              <div ref={scrollRef} className="flex gap-2 overflow-hidden scrollbar-hide scroll-smooth">
                {icons.map((icon) => (
                  <button
                    key={icon.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, icon: icon.value }))}
                    className={`p-3 rounded-full border-2 shrink-0 transition-all
                      ${formData.icon === icon.value
                        ? 'border-[#24421E] bg-[#24421E] text-[#fff5d7]'
                        : 'border-[#24421E]/30 text-[#24421E]'
                      }`}
                  >
                    {icon.component}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => scroll("right")} className="shrink-0">
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#24421E]/60 mb-2 block">Habit Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
            />
          </div>

          <div>
            <label className="text-sm text-[#24421E]/60 mb-2 block">How often?</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, frequency: 'daily' }))}
                className={`py-2 px-5 rounded-full border-2 text-sm transition-all
                  ${formData.frequency === 'daily'
                    ? 'bg-[#24421E] text-[#fff5d7] border-[#24421E]'
                    : 'text-[#24421E] border-[#24421E]'
                  }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, frequency: 'weekly' }))}
                className={`py-2 px-5 rounded-full border-2 text-sm transition-all
                  ${formData.frequency === 'weekly'
                    ? 'bg-[#24421E] text-[#fff5d7] border-[#24421E]'
                    : 'text-[#24421E] border-[#24421E]'
                  }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#24421E]/60 mb-2 block">Target</label>
            <div className="flex gap-3">
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="w-24 h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
              >
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
                <option value="times">times</option>
                <option value="pages">pages</option>
                <option value="km">km</option>
                <option value="calories">calories</option>
                <option value="other">other</option>
              </select>
            </div>
            {formData.unit === 'other' && (
              <input
                type="text"
                name="customUnit"
                placeholder="e.g. steps, reps..."
                value={formData.customUnit}
                onChange={handleChange}
                className="mt-2 w-full h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
              />
            )}
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={() => setMode(null)}
              className="py-2 px-6 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 rounded-full bg-[#24421E] text-[#fff5d7] text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default HabitActions