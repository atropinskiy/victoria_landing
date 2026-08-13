"use client"

import type { Case } from "@/entities/case"
import type { CaseFormValues } from "@/widgets/admin/cases/model/case-schema"

import { useCaseUpdate } from "@/entities/case"
import { toastSaveChanges } from "@/shared/lib/toast"

import { CaseForm } from "./CaseForm"

interface CaseEditProps {
  caseItem: Case
  onSaved?: () => void
}

export function CaseEdit({ caseItem, onSaved }: CaseEditProps) {
  const { isPending, mutateAsync } = useCaseUpdate()

  async function handleUpdate(values: CaseFormValues): Promise<void> {
    await toastSaveChanges(mutateAsync({ case_id: caseItem.id, payload: values }))
    onSaved?.()
  }

  return (
    <CaseForm
      submitLabel="Сохранить"
      isPending={isPending}
      submit={handleUpdate}
      defaultValues={{
        title: { ru: caseItem.title.ru ?? "", en: caseItem.title.en ?? "" },
        description: { ru: caseItem.description.ru ?? "", en: caseItem.description.en ?? "" },
      }}
      previewUrl={caseItem.image}
    />
  )
}
