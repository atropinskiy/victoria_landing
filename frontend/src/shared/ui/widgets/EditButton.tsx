import { Pencil } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

interface EditButtonProps {
  label: string
  onClick: () => void
  expanded?: boolean
  className?: string
}

export function EditButton({ label, onClick, expanded, className }: EditButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      aria-expanded={expanded}
      className={cn("hover:bg-transparent", className)}
      onClick={onClick}
    >
      <Pencil className="text-navy size-4" />
    </Button>
  )
}
