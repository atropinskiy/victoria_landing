"use client"

import { Download, FileText, Upload, X } from "lucide-react"

import { useDropzone } from "@/shared/lib/hooks"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

interface FileDropzoneProps {
  value?: File | null
  onChange: (file: File | null) => void
  previewUrl?: string | null
  accept?: string[]
  acceptError?: string
  label?: string
  hint?: string
  maxSize?: number
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean
}

export function FileDropzone({
  value,
  onChange,
  previewUrl,
  accept = ["application/pdf"],
  acceptError = "Недопустимый тип файла",
  label = "Перетащите файл или нажмите, чтобы выбрать",
  hint,
  maxSize,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
}: FileDropzoneProps) {
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
    onFile: onChange,
  })

  const savedName = previewUrl ? decodeURIComponent(previewUrl.split("/").pop() ?? "") : null
  const fileName = value?.name ?? savedName
  const fileUrl = objectUrl ?? previewUrl ?? null

  const input = (
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
  )

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-input focus-within:ring-burgundy/20 relative flex w-full overflow-hidden rounded-xl border bg-white transition-colors focus-within:ring-2",
          fileName ? "border-solid" : "border-dashed",
          isDragging && "border-burgundy bg-burgundy/5",
          (ariaInvalid || error) && "border-destructive ring-destructive/40",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {fileName ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
            {input}

            <FileText className="text-slate size-8 shrink-0" />

            <Typography
              variant="hint"
              className="text-ink line-clamp-2 w-full break-all sm:text-[14px]"
            >
              {fileName}
            </Typography>

            <div className="mt-1 flex w-full gap-2">
              {fileUrl && (
                <Button asChild variant="surface" size="sm" className="min-w-0 flex-1">
                  <a href={fileUrl} download={fileName ?? undefined}>
                    <Download />
                    Скачать
                  </a>
                </Button>
              )}
              <Button
                type="button"
                variant="surface"
                size="sm"
                className="min-w-0 flex-1"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
              >
                <Upload />
                Заменить
              </Button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
          >
            {input}

            <FileText className="text-slate size-8 shrink-0" />

            <Typography variant="bodyXs" className="text-slate">
              {label}
            </Typography>
            {hint && (
              <Typography variant="hint" className="text-slate/70">
                {hint}
              </Typography>
            )}
          </label>
        )}

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            aria-label="Убрать выбранный файл"
            className="text-ink bg-cream/10 absolute top-2 right-2 size-8"
          >
            <X className="size-4" />
          </Button>
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
