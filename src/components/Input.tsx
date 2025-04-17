import { ComponentProps } from "react";

type InputProps = ComponentProps<'input'> & {
  label: string;
  error?: string;
}

export const Input = ({label, value, error, ...props}:InputProps) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-start gap-2"
    >
      <label className="block font-medium mb-1">{label}</label>
      <input
        className="w-full h-9 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        {...props}
      />
      <p 
        data-visible={!!error}
        className="text-red-500 font-medium data-[visible='true']:visible invisible text-sm mt-1"
      
      >
          {error}
        </p> 
    </div>
  )
}