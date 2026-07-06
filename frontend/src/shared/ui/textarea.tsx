import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-lg border-none bg-slate/30 px-5 py-3 text-base text-cream transition-colors outline-none placeholder:text-cream/70 focus-visible:ring-3 focus-visible:ring-cream/40 disabled:cursor-not-allowed disabled:bg-slate/15 disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/40 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
