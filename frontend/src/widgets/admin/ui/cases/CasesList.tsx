"use client"

import type { Case } from "@/entities/case"
import type { Locale } from "@/shared/i18n"

import { useLocale } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

import { CaseEdit } from "@/widgets/admin/ui/cases/CaseEdit"
import { CasesListSkeleton } from "@/widgets/admin/ui/cases/CasesListSkeleton"
import { useCaseDelete, useCaseOrder, useCases } from "@/entities/case"
import { Typography } from "@/shared/ui/typography"
import { ConfirmModal, DeleteButton, EditButton, SortableList } from "@/shared/ui/widgets"

export function CasesList() {
  const locale = useLocale() as Locale
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const { isPending, data: cases } = useCases()
  const { mutateAsync: deleteCase } = useCaseDelete()
  const { mutate: reorder } = useCaseOrder()

  const handleOrder = (cases: Case[]) => {
    if (cases) reorder(cases.map((item, idx) => ({ id: item.id, order: idx })))
  }

  const handleSaved = () => {
    setExpandedId(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = () => {
    if (!pendingDeleteId) return

    toast.promise(
      deleteCase(pendingDeleteId).then(() => setPendingDeleteId(null)),
      {
        loading: "Удаление…",
        success: "Кейс удалён",
        error: (error) => ({
          message: error?.message || "Не удалось удалить кейс",
        }),
      }
    )
  }

  if (isPending) return <CasesListSkeleton />
  if (!cases) return null

  return (
    <>
      <SortableList
        items={cases}
        getId={(item) => item.id}
        onReorder={handleOrder}
        onDragStart={() => setExpandedId(null)}
        expandedId={expandedId}
        renderExpanded={(item) => <CaseEdit caseItem={item} onSaved={handleSaved} />}
        renderItem={(item) => (
          <>
            <Typography variant="bodyXs">{item.title[locale]}</Typography>

            <div className="flex shrink-0 gap-2">
              <EditButton
                label="Редактировать кейс"
                expanded={item.id === expandedId}
                onClick={() => setExpandedId((id) => (id === item.id ? null : item.id))}
              />
              <DeleteButton label="Удалить кейс" onClick={() => setPendingDeleteId(item.id)} />
            </div>
          </>
        )}
      />
      <ConfirmModal
        open={pendingDeleteId !== null}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleDelete}
        title="Удалить кейс?"
        description="Действие необратимо."
        isPending={isPending}
      />
    </>
  )
}
