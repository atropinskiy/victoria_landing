"use client"

import { ImagePlus, Upload, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { useDropzone } from "@/shared/lib/hooks"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { ImageCropModal } from "@/shared/ui/widgets/ImageCropModal"

interface ImageDropzoneProps {
  value?: File | null
  onChange: (file: File | null) => void
  previewUrl?: string | null
  accept?: string[]
  acceptError?: string
  label?: string
  hint?: string
  aspect?: number
  maxSize?: number
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

export function ImageDropzone({
  value,
  onChange,
  previewUrl,
  accept = ["image/*"],
  acceptError = "Можно загрузить только изображение",
  label = "Перетащите изображение или нажмите, чтобы выбрать",
  hint,
  aspect,
  maxSize,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
}: ImageDropzoneProps) {
  const [fileToCrop, setFileToCrop] = useState<File | null>(null)

  const {
    inputId,
    inputRef,
    isDragging,
    error,
    objectUrl,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClear,
  } = useDropzone({
    value,
    accept,
    acceptError,
    maxSize,
    disabled,
    onFile: (file) => {
      if (file && aspect) {
        setFileToCrop(file)
        return
      }
      onChange(file)
    },
  })

  const preview = objectUrl ?? previewUrl ?? null

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-input focus-within:ring-burgundy/20 group relative flex aspect-3/4 w-full overflow-hidden rounded-xl border bg-white transition-colors focus-within:ring-2",
          preview ? "border-solid" : "border-dashed",
          isDragging && "border-burgundy bg-burgundy/5",
          (ariaInvalid || error) && "border-destructive ring-destructive/40",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <label
          htmlFor={inputId}
          className="relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={accept.join(",")}
            disabled={disabled}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null
              event.target.value = ""
              handleFile(file)
            }}
          />

          {preview ? (
            <>
              <Image
                src={preview}
                alt={value?.name ?? "Загруженное изображение"}
                fill
                unoptimized
                sizes="(min-width: 1024px) 208px, 100vw"
                className="object-cover"
              />
              <span className="bg-ink/55 text-cream absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <Upload className="size-6 shrink-0" />
                <Typography variant="hint" className="text-inherit">
                  Заменить изображение
                </Typography>
              </span>
            </>
          ) : (
            <>
              <ImagePlus className="text-slate size-8 shrink-0" />
              <Typography variant="bodyXs" className="text-slate">
                {label}
              </Typography>
              {hint && (
                <Typography variant="hint" className="text-slate/70">
                  {hint}
                </Typography>
              )}
            </>
          )}
        </label>

        {value && (
          <Button
            type="button"
            variant="surface"
            size="icon"
            onClick={handleClear}
            aria-label="Убрать выбранное изображение"
            className="text-ink absolute top-2 right-2 size-8 bg-white/90 hover:bg-white"
          >
            <X className="size-4" />
          </Button>
        )}

        {aspect && (
          <ImageCropModal
            file={fileToCrop}
            aspect={aspect}
            onClose={() => setFileToCrop(null)}
            onCropped={(file) => {
              setFileToCrop(null)
              onChange(file)
            }}
          />
        )}
      </div>

      {error && (
        <Typography variant="hint" className="text-destructive">
          {error}
        </Typography>
      )}
    </div>
  )
}
