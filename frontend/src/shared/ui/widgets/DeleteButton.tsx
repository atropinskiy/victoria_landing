import type { LucideIcon } from "lucide-react"

import { Trash2 } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

interface DeleteButtonProps {
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
}: DeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn("text-destructive hover:text-destructive hover:bg-transparent", className)}
      onClick={onClick}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </Button>
  )
}
