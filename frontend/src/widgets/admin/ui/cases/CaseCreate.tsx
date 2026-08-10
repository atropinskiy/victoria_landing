"use client"

import type { CaseFormValues } from "@/widgets/admin/model/case-schema"

import { toast } from "sonner"

import { CaseForm } from "@/widgets/admin/ui/cases/CaseForm"
import { useCaseCreate } from "@/entities/case"
import { Typography } from "@/shared/ui/typography"

export function CaseCreate() {
  const { isPending, mutateAsync } = useCaseCreate()

  async function handleCreate(values: CaseFormValues): Promise<void> {
    const promise = mutateAsync(values)

    toast.promise(promise, {
      loading: "Создаём кейс…",
      success: "Кейс создан",
      error: (error) => ({
        message: error?.message || "Не удалось создать кейс",
      }),
    })

    await promise
  }

  return (
    <div className="flex flex-col">
      <div className="border-border flex flex-col gap-3 rounded-sm border bg-white p-5">
        <Typography variant="h6" color="burgundy" className="mb-1 text-center">
          Добавить кейс
        </Typography>
        <CaseForm
          submitLabel="Создать"
          isPending={isPending}
          submit={handleCreate}
          requireImage
        />
      </div>
    </div>
  )
}
