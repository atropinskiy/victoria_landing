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
      aria-label={label}
      aria-expanded={expanded}
      className={cn("size-9 hover:bg-transparent", className)}
      onClick={onClick}
    >
      <Pencil className="text-navy size-4" />
    </Button>
  )
}
