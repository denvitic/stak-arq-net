import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'src/lib/utils'

const inputVariants = cva(
  'flex h-10 w-full border rounded-lg px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:rounded-sm file:text-sm file:font-medium file:text-primary file:mr-5  focus-visible:outline-0',
  {
    variants: {
      variant: {
        default:
          'border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-[#c6a87c] focus-visible:ring-1 focus-visible:ring-[#c6a87c]',
        gray: 'border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#c6a87c] focus-visible:ring-1 focus-visible:ring-[#c6a87c]',
        info: 'border-blue-300 bg-blue-50/50 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:ring-blue-500',
        failure:
          'border-red-300 bg-red-50/50 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500',
        warning:
          'border-amber-300 bg-amber-50/50 text-amber-900 placeholder-amber-400 focus:border-amber-500 focus:ring-amber-500',
        success:
          'border-emerald-300 bg-emerald-50/50 text-emerald-900 placeholder-emerald-400 focus:border-emerald-500 focus:ring-emerald-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
