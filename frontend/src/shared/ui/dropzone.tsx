"use client"

import type { DragEvent } from "react"

import { ImagePlus, Upload, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useId, useMemo, useRef, useState } from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

interface DropzoneProps {
  value?: File | null
  onChange: (file: File | null) => void
  previewUrl?: string | null
  accept?: string
  label?: string
  hint?: string
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

function Dropzone({
  value,
  onChange,
  previewUrl,
  accept = "image/*",
  label = "Перетащите изображение или нажмите, чтобы выбрать",
  hint,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
}: DropzoneProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
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

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const file = event.dataTransfer.files?.[0]
    if (file) onChange(file)
  }

  const handleClear = () => {
    onChange(null)
    inputRef.current?.focus()
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-input focus-within:ring-burgundy/20 group relative flex aspect-3/4 w-full overflow-hidden rounded-sm border bg-white transition-colors focus-within:ring-2",
        preview ? "border-solid" : "border-dashed",
        isDragging && "border-burgundy bg-burgundy/5",
        ariaInvalid && "border-destructive ring-destructive/40",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <label
        htmlFor={inputId}
        className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null
            event.target.value = ""
            onChange(file)
          }}
        />

        {preview ? (
          <>
            <Image
              src={preview}
              alt={value?.name ?? "Загруженное изображение"}
              fill
              unoptimized
              sizes="(min-width: 1024px) 264px, 100vw"
              className="object-cover"
            />
            <span className="bg-ink/55 text-cream absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
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

      {preview && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Удалить изображение"
          className="text-ink absolute top-2 right-2 rounded-sm bg-white/90 p-1.5 shadow-sm transition-colors hover:bg-white"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export { Dropzone }
