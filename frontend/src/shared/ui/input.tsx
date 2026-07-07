import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-slate/30 text-cream file:text-cream placeholder:text-cream/70 focus-visible:ring-cream/40 disabled:bg-slate/15 aria-invalid:ring-destructive/40 h-13 w-full min-w-0 rounded-lg border-none px-5 py-3 text-body-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
        className
      )}
      {...props}
    />
  )
}

export { Input }
