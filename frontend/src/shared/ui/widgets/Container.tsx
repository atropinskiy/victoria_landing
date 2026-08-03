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
  grow = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants> & { grow?: boolean }) {
  return (
    <div className={cn(containerVariants({ bg }), grow && "flex flex-1 flex-col")}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-col px-4 py-14 sm:px-6 lg:px-8 2xl:max-w-360",
          grow && "flex-1",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Container }
