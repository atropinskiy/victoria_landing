"use client"

import type { Case } from "@/entities/case"
import type { CaseFormValues } from "@/widgets/admin/cases/model/case-schema"

import { toast } from "sonner"

import { useCaseUpdate } from "@/entities/case"

import { CaseForm } from "./CaseForm"

interface CaseEditProps {
  caseItem: Case
  onSaved?: () => void
}

export function CaseEdit({ caseItem, onSaved }: CaseEditProps) {
  const { isPending, mutateAsync } = useCaseUpdate()

  async function handleUpdate(values: CaseFormValues): Promise<void> {
    const promise = mutateAsync({ case_id: caseItem.id, payload: values })

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
    <CaseForm
      submitLabel="Сохранить"
      isPending={isPending}
      submit={handleUpdate}
      defaultValues={{ title: caseItem.title, description: caseItem.description }}
      previewUrl={caseItem.image}
    />
  )
}
