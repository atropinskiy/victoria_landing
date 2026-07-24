import type { ReactNode } from "react"

import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Modal } from "@/shared/ui/widgets/Modal"

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: ReactNode
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: "destructive" | "default"
  isPending?: boolean
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Удалить",
  cancelLabel = "Отмена",
  confirmVariant = "destructive",
  isPending,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description ? <Typography variant="bodyXs">{description}</Typography> : null}

      <div className="mt-6 flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onClose} disabled={isPending}>
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          className="flex-1"
          onClick={onConfirm}
          disabled={isPending}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
