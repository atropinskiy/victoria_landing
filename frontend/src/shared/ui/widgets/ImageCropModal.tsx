"use client"

import type { Area, Point } from "react-easy-crop"

import { useMemo, useState } from "react"
import Cropper from "react-easy-crop"

import { cropImageFile } from "@/shared/lib/cropImage"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Modal } from "@/shared/ui/widgets/Modal"

interface ImageCropModalProps {
  file: File | null
  aspect: number
  onClose: () => void
  onCropped: (file: File) => void
}

interface CropAreaProps {
  file: File
  src: string
  aspect: number
  onClose: () => void
  onCropped: (file: File) => void
}

function CropArea({ file, src, aspect, onClose, onCropped }: CropAreaProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState<Area | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!area) return

    setIsPending(true)
    setError(null)

    try {
      onCropped(await cropImageFile(file, area))
    } catch (error) {
      setError(error instanceof Error ? error.message : "Не удалось обработать изображение")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <div className="bg-navy relative h-72 overflow-hidden rounded-xl">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          showGrid={false}
          style={{ cropAreaStyle: { borderRadius: "0.75rem" } }}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_croppedArea, croppedAreaPixels) => setArea(croppedAreaPixels)}
        />
      </div>

      <label className="mt-4 flex items-center gap-3">
        <Typography as="span" variant="bodyXs" className="text-slate shrink-0">
          Масштаб
        </Typography>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          aria-label="Масштаб изображения"
          className="accent-burgundy h-1 w-full cursor-pointer"
        />
      </label>

      {error && (
        <Typography variant="bodyXs" className="text-destructive mt-2">
          {error}
        </Typography>
      )}

      <div className="mt-6 flex gap-4">
        <Button variant="surface" className="flex-1" onClick={onClose} disabled={isPending}>
          Отмена
        </Button>
        <Button className="flex-1" onClick={handleSave} disabled={isPending || !area}>
          Применить
        </Button>
      </div>
    </>
  )
}

export function ImageCropModal({ file, aspect, onClose, onCropped }: ImageCropModalProps) {
  const src = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  const handleClose = () => {
    if (src) URL.revokeObjectURL(src)
    onClose()
  }

  const handleCropped = (cropped: File) => {
    if (src) URL.revokeObjectURL(src)
    onCropped(cropped)
  }

  return (
    <Modal
      open={Boolean(file)}
      onClose={handleClose}
      title="Кадрирование"
      className="sm:max-w-md"
      noScaleAnimation
    >
      {file && src && (
        <CropArea
          key={src}
          file={file}
          src={src}
          aspect={aspect}
          onClose={handleClose}
          onCropped={handleCropped}
        />
      )}
    </Modal>
  )
}
