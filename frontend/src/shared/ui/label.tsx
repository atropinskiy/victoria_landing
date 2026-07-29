"use client"

import { Field as LabelPrimitive } from "@base-ui/react/field"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

function Label({
  className,
  ...props
}: Omit<React.ComponentProps<typeof LabelPrimitive.Label>, "className"> & {
  className?: string
}) {
  return (
    <LabelPrimitive.Label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
