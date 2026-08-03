import type { ReactNode } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface ModalProps {
  open: boolean
  onClose: (open: boolean) => void
  title: ReactNode
  showCloseButton?: boolean
  className?: string
  children?: ReactNode
}

export function Modal({
  open,
  onClose,
  title,
  showCloseButton = true,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={className}
        // onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="pb-5">{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
