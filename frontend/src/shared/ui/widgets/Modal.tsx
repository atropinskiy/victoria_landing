import type { CSSProperties, ReactNode } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface ModalProps {
  open: boolean
  onClose: (open: boolean) => void
  title: ReactNode
  showCloseButton?: boolean
  noScaleAnimation?: boolean
  className?: string
  children?: ReactNode
}

const NO_SCALE_ANIMATION = {
  "--tw-enter-scale": 1,
  "--tw-exit-scale": 1,
} as CSSProperties

export function Modal({
  open,
  onClose,
  title,
  showCloseButton = true,
  noScaleAnimation,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={className}
        style={noScaleAnimation ? NO_SCALE_ANIMATION : undefined}
      >
        <DialogHeader>
          <DialogTitle className="pb-5">{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
