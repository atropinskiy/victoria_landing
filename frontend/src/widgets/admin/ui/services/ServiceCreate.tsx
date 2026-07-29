"use client"

import type { ServiceFormValues } from "@/widgets/admin/model/service-schema"

import { toast } from "sonner"

import { ServiceForm } from "@/widgets/admin/ui/services/ServiceForm"
import { useServiceCreate } from "@/entities/service"
import { Typography } from "@/shared/ui/typography"

export function ServiceCreate() {
  const { isPending, mutateAsync } = useServiceCreate()

  async function handleCreate(values: ServiceFormValues): Promise<void> {
    const promise = mutateAsync(values)

    toast.promise(promise, {
      loading: "Создаём услугу…",
      success: "Услуга создана",
      error: (error) => ({
        message: error?.message || "Не удалось создать услугу",
      }),
    })

    await promise
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end"></div>

      <div className="grid transition-[grid-template-rows] duration-500 ease-out">
        <div className="overflow-hidden">
          <div className="border-border flex flex-col gap-3 rounded-sm border bg-white p-5">
            <Typography variant="h6" color="burgundy" className="mb-1 text-center">
              Добавить услугу
            </Typography>
            <ServiceForm submitLabel="Создать" isPending={isPending} submit={handleCreate} />
          </div>
        </div>
      </div>
    </div>
  )
}
