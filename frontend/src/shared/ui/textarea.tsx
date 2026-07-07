import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-slate/30 text-cream placeholder:text-cream/70 focus-visible:ring-cream/40 disabled:bg-slate/15 aria-invalid:ring-destructive/40 flex h-16 w-full resize-none rounded-lg border-none px-5 py-3 text-sm transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
