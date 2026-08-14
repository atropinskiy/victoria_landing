"use client"

import type { DragEvent } from "react"

import { useEffect, useId, useMemo, useRef, useState } from "react"

function matchesAccept(file: File, accept: string[]) {
  return accept.some((type) =>
    type.endsWith("/*") ? file.type.startsWith(type.slice(0, -1)) : file.type === type
  )
}

interface UseDropzoneOptions {
  value?: File | null
  accept: string[]
  acceptError: string
  maxSize?: number
  disabled?: boolean
  onFile: (file: File | null) => void
}

export function useDropzone({
  value,
  accept,
  acceptError,
  maxSize,
  disabled,
  onFile,
}: UseDropzoneOptions) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const objectUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value])

  useEffect(() => {
    if (!objectUrl) return

    return () => URL.revokeObjectURL(objectUrl)
  }, [objectUrl])

  const handleFile = (file: File | null) => {
    setError(null)

    if (!file) {
      onFile(null)
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

    onFile(file)
  }

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
    if (file) handleFile(file)
  }

  const handleClear = () => {
    onFile(null)
    inputRef.current?.focus()
  }

  return {
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
  }
}
