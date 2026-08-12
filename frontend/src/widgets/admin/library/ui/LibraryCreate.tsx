"use client"

import type { LibraryFormValues } from "@/widgets/admin/library/model/library-schema"

import { toast } from "sonner"

import { useLibraryCreate } from "@/entities/library"
import { Typography } from "@/shared/ui/typography"

import { LibraryForm } from "./LibraryForm"

export function LibraryCreate() {
  const { isPending, mutateAsync } = useLibraryCreate()

  async function handleCreate(values: LibraryFormValues): Promise<void> {
    const promise = mutateAsync(values)

    toast.promise(promise, {
      loading: "Добавляем материал…",
      success: "Материал добавлен",
      error: (error) => ({
        message: error?.message || "Не удалось добавить материал",
      }),
    })

    await promise
  }

  return (
    <div className="flex flex-col">
      <div className="border-border flex flex-col gap-3 rounded-sm border bg-white p-5">
        <Typography variant="h6" color="burgundy" className="mb-1 text-center">
          Добавить материал
        </Typography>
        <LibraryForm
          submitLabel="Добавить"
          isPending={isPending}
          submit={handleCreate}
          requireFiles
        />
      </div>
    </div>
  )
}
