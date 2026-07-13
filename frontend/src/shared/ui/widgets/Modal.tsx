import type { ReactNode } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface ModalProps {
  open: boolean
  onClose: (open: boolean) => void
  title: ReactNode
  showCloseButton?: boolean
  children?: ReactNode
}

export function Modal({
  open,
  onClose,
  title,
  showCloseButton = true,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={showCloseButton}
        // onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="pb-4">{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
