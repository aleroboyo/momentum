"use client"

type InputProps = {
  label?: string
  placeholder?: string
  width?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
}

const Input = ({ label, placeholder, width = "full", value, onChange, name }: 
InputProps) => {
  return (
    <div className="flex flex-col font-inter">

      <label className='text-[14px] font-bold text-left md:text-lg'>{label}</label>

      <input
        type='text'
        placeholder={placeholder}
        className={`${width} h-10 border border-[#bcbbbb] rounded-md p-2 focus:ring-4 focus:ring-blue-200 focus:outline-none `}
        value={value}
        onChange={onChange}
        name={name}
      />

    </div>
  )
}


export default Input
