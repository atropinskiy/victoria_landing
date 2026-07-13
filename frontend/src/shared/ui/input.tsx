import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

const inputVariants = cva(
  "bg-slate/30 text-cream file:text-cream placeholder:text-cream/70 focus-visible:ring-cream/40 disabled:bg-slate/15 aria-invalid:ring-destructive/40 w-full min-w-0 rounded-lg border-none px-5 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
  {
    variants: {
      size: {
        default: "h-13 py-3 text-body-sm",
        sm: "h-10 py-2 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  size,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}

export { Input }
