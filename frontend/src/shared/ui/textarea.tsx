import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { inputSurfaceVariants } from "@/shared/ui/input"

const textareaVariants = cva(
  "flex w-full resize-none rounded-sm px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        dark: cn(
          inputSurfaceVariants.dark,
          "text-cream placeholder:text-cream/70 focus-visible:ring-cream/40 disabled:bg-slate/15"
        ),
        light: cn(
          inputSurfaceVariants.light,
          "text-ink placeholder:text-slate focus-visible:ring-burgundy/20 disabled:bg-muted"
        ),
      },
      size: {
        sm: "h-16",
        md: "h-28",
        lg: "h-40",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "sm",
    },
  }
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Textarea }
