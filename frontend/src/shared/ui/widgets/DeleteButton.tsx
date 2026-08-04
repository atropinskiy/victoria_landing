import type { LucideIcon } from "lucide-react"
import type { ComponentProps } from "react"

import { Trash2 } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

interface DeleteButtonProps extends ComponentProps<typeof Button> {
  label: string
  onClick: () => void
  className?: string
  icon?: LucideIcon
  iconClassName?: string
}

export function DeleteButton({
  label,
  onClick,
  className,
  icon: Icon = Trash2,
  iconClassName,
  ...props
}: DeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={label}
      className={cn(
        "text-destructive hover:text-destructive size-9 hover:bg-transparent",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </Button>
  )
}
