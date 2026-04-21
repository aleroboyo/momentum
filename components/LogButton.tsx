'use client'

import { useState } from 'react'

interface LogButtonProps {
  habitId: string
  unit: string
  target: number
  todayValue: number 
}

const LogButton = ({ habitId, unit, target, todayValue }: LogButtonProps) => {
  const [showInput, setShowInput] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(todayValue > 0)
  const [currentValue, setCurrentValue] = useState(todayValue)

  const handleLog = async () => {
    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habitId,
          value: Number(value),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Something went wrong')
        return
      }

      setCurrentValue(Number(value))
      setLogged(true)
      setShowInput(false)
      setValue('')

    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (logged) {
    return (
      <div className="mt-4">
        <div className="flex justify-between text-sm text-[#24421E]/60 mb-1">
          <span>Today</span>
          <span>{currentValue} / {target} {unit}</span>
        </div>

        <div className="w-full h-2 bg-[#24421E]/10 rounded-full">
          <div
            className="h-2 bg-[#24421E] rounded-full transition-all"
            style={{
              width: `${Math.min((currentValue / target) * 100, 100)}%`
            }}
          />
        </div>
        {currentValue >= target && (
          <p className="text-xs text-[#24421E] font-medium mt-1">
            ✅ Target hit!
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="mt-4">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full py-2 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm font-medium hover:bg-[#24421E] hover:text-[#fff5d7] transition-all"
        >
          Log Today
        </button>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder={`e.g. ${target}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 h-10 w-15 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none text-sm bg-transparent text-[#24421E]"
          />
          <span className="text-sm text-[#24421E]/60">{unit}</span>
          <button
            onClick={handleLog}
            disabled={loading}
            className="py-2 px-4 rounded-full bg-[#24421E] text-[#fff5d7] text-sm font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Save'}
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="text-sm text-[#24421E]/60 hover:text-[#24421E]"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default LogButton