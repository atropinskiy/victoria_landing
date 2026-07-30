"use client"

import type { Service } from "@/entities/service"
import type { ServiceFormValues } from "@/widgets/admin/model/service-schema"

import { toast } from "sonner"

import { ServiceForm } from "@/widgets/admin/ui/services/ServiceForm"
import { useServiceUpdate } from "@/entities/service"

interface ServiceEditFormProps {
  service: Service
  onSaved?: () => void
}

export function ServiceEdit({ service, onSaved }: ServiceEditFormProps) {
  const { isPending, mutateAsync } = useServiceUpdate()

  async function handleCreate(values: ServiceFormValues): Promise<void> {
    const promise = mutateAsync({ service_id: service.id, body: values })

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
    <ServiceForm
      submitLabel="Сохранить"
      isPending={isPending}
      submit={handleCreate}
      defaultValues={service}
    />
  )
}
