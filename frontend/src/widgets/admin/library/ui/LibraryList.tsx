"use client"

import type { LibraryItem } from "@/entities/library"
import type { Locale } from "@/shared/i18n"

import { useLocale } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

import { useLibrary, useLibraryDelete, useLibraryOrder } from "@/entities/library"
import { Typography } from "@/shared/ui/typography"
import {
  ConfirmModal,
  DeleteButton,
  EditButton,
  SortableList,
  SortableListSkeleton,
} from "@/shared/ui/widgets"

import { LibraryEdit } from "./LibraryEdit"

export function LibraryList() {
  const locale = useLocale() as Locale
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const { isPending, data: items } = useLibrary()
  const { mutateAsync: deleteItem, isPending: isDeleting } = useLibraryDelete()
  const { mutate: reorder } = useLibraryOrder()

  const handleOrder = (items: LibraryItem[]) => {
    if (items) reorder(items.map((item, idx) => ({ id: item.id, order: idx })))
  }

  const handleSaved = () => {
    setExpandedId(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = () => {
    if (!pendingDeleteId) return

    toast.promise(
      deleteItem(pendingDeleteId).then(() => setPendingDeleteId(null)),
      {
        loading: "Удаление…",
        success: "Материал удалён",
        error: (error) => ({
          message: error?.message || "Не удалось удалить материал",
        }),
      }
    )
  }

  if (isPending) return <SortableListSkeleton />
  if (!items) return null

  return (
    <>
      <SortableList
        items={items}
        getId={(item) => item.id}
        onReorder={handleOrder}
        onDragStart={() => setExpandedId(null)}
        expandedId={expandedId}
        renderExpanded={(item) => <LibraryEdit item={item} onSaved={handleSaved} />}
        renderItem={(item) => (
          <>
            <Typography variant="bodyXs">{item.title[locale]}</Typography>

            <div className="flex shrink-0 gap-2">
              <EditButton
                label="Редактировать материал"
                expanded={item.id === expandedId}
                onClick={() => setExpandedId((id) => (id === item.id ? null : item.id))}
              />
              <DeleteButton label="Удалить материал" onClick={() => setPendingDeleteId(item.id)} />
            </div>
          </>
        )}
      />
      <ConfirmModal
        open={pendingDeleteId !== null}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleDelete}
        title="Удалить материал?"
        description="Действие необратимо."
        isPending={isDeleting}
      />
    </>
  )
}
