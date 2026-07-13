import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

interface ModalProps {
  open: boolean
  onClose: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  footer?: ReactNode
  showCloseButton?: boolean
  children?: ReactNode
}

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
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
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {footer && <DialogFooter className="mt-1">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
