import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

const containerVariants = cva("w-full", {
  variants: {
    bg: {
      primary: "bg-primary",
      secondary: "bg-default",
    },
  },
})

function Container({
  className,
  bg,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div className={containerVariants({ bg })}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-360 flex-col px-4 py-14 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Container }
