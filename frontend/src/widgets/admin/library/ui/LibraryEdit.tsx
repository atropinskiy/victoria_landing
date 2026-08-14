"use client"

import type { LibraryItem } from "@/entities/library"
import type { LibraryFormValues } from "@/widgets/admin/library/model/library-schema"

import { useLibraryUpdate } from "@/entities/library"
import { toastSaveChanges } from "@/shared/lib/toast"

import { LibraryForm } from "./LibraryForm"

interface LibraryEditProps {
  item: LibraryItem
  onSaved?: () => void
}

export function LibraryEdit({ item, onSaved }: LibraryEditProps) {
  const { isPending, mutateAsync } = useLibraryUpdate()

  async function handleUpdate(values: LibraryFormValues): Promise<void> {
    await toastSaveChanges(mutateAsync({ item_id: item.id, payload: values }))
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
