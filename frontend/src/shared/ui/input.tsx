import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 rounded-lg px-5 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
  {
    variants: {
      variant: {
        dark: "border-none bg-slate/30 text-cream file:text-cream placeholder:text-cream/70 focus-visible:ring-slate/60 disabled:bg-slate/15 aria-invalid:ring-destructive/40",
        light:
          "border-input bg-white text-ink file:text-ink placeholder:text-slate focus-visible:ring-burgundy/20 disabled:bg-muted aria-invalid:ring-destructive/40 border",
      },
      size: {
        default: "h-13 py-3 text-body-sm",
        sm: "h-10 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Input }
