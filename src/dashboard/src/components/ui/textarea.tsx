import * as React from "react"

import { cn } from "src/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "mt-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:outline-0 focus-visible:border-[#c6a87c] focus-visible:ring-1 focus-visible:ring-[#c6a87c] flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-sm shadow-2xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
