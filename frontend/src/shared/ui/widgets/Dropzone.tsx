"use client"

import type { DragEvent } from "react"

import { ImagePlus, Upload, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useId, useMemo, useRef, useState } from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"
import { ImageCropModal } from "@/shared/ui/widgets/ImageCropModal"

interface DropzoneProps {
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

function matchesAccept(file: File, accept: string[]) {
  return accept.some((type) =>
    type.endsWith("/*") ? file.type.startsWith(type.slice(0, -1)) : file.type === type
  )
}

export function Dropzone({
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
}: DropzoneProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileToCrop, setFileToCrop] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const objectUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value])

  useEffect(() => {
    if (!objectUrl) return

    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  const preview = objectUrl ?? previewUrl ?? null

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleFile = (file: File | null) => {
    setError(null)

    if (!file) {
      onChange(null)
      return
    }

    if (!matchesAccept(file, accept)) {
      setError(acceptError)
      return
    }

    if (maxSize && file.size > maxSize) {
      setError(`Файл больше ${Math.round(maxSize / 1024 / 1024)} МБ`)
      return
    }

    if (aspect) {
      setFileToCrop(file)
      return
    }

    onChange(file)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const file = event.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    onChange(null)
    inputRef.current?.focus()
  }

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
                <Typography variant="bodyXs" className="text-inherit">
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
                <Typography variant="bodyXs" className="text-slate/70">
                  {hint}
                </Typography>
              )}
            </>
          )}
        </label>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Убрать выбранное изображение"
            className="text-ink absolute top-2 right-2 rounded-sm bg-white/90 p-1.5 shadow-sm transition-colors hover:bg-white"
          >
            <X className="size-4" />
          </button>
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
        <Typography variant="bodyXs" className="text-destructive">
          {error}
        </Typography>
      )}
    </div>
  )
}
