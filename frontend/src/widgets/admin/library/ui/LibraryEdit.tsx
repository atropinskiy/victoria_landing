"use client"

import type { LibraryItem } from "@/entities/library"
import type { LibraryFormValues } from "@/widgets/admin/library/model/library-schema"

import { toast } from "sonner"

import { useLibraryUpdate } from "@/entities/library"

import { LibraryForm } from "./LibraryForm"

interface LibraryEditProps {
  item: LibraryItem
  onSaved?: () => void
}

export function LibraryEdit({ item, onSaved }: LibraryEditProps) {
  const { isPending, mutateAsync } = useLibraryUpdate()

  async function handleUpdate(values: LibraryFormValues): Promise<void> {
    const promise = mutateAsync({ item_id: item.id, payload: values })

    toast.promise(promise, {
      loading: "Сохраняем изменения",
      success: "Изменения сохранены",
      error: (error) => ({
        message: error?.message || "Не удалось сохранить изменения",
      }),
    })

    await promise
    onSaved?.()
  }

  return (
    <LibraryForm
      submitLabel="Сохранить"
      isPending={isPending}
      submit={handleUpdate}
      defaultValues={{
        title: { ru: item.title.ru ?? "", en: item.title.en ?? "" },
      }}
      previewUrl={item.image}
      documentUrl={item.document}
    />
  )
}
