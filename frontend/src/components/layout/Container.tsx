// src/components/layout/Container.tsx
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
