"use client"

import type { Service } from "@/entities/service"
import type { ServiceFormValues } from "@/widgets/admin/services/model/service-schema"

import { useServiceUpdate } from "@/entities/service"
import { toastSaveChanges } from "@/shared/lib/toast"

import { ServiceForm } from "./ServiceForm"

interface ServiceEditFormProps {
  service: Service
  onSaved?: () => void
}

export function ServiceEdit({ service, onSaved }: ServiceEditFormProps) {
  const { isPending, mutateAsync } = useServiceUpdate()

  async function handleCreate(values: ServiceFormValues): Promise<void> {
    await toastSaveChanges(mutateAsync({ service_id: service.id, body: values }))
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
