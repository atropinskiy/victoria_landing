import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-13 w-full min-w-0 rounded-lg border-none bg-slate/30 px-5 py-3 text-base text-cream transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-cream placeholder:text-cream/70 focus-visible:ring-3 focus-visible:ring-cream/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate/15 disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/40 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
