"use client"

import type { Service } from "@/entities/service"
import type { Locale } from "@/shared/i18n"

import { useLocale } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

import { ServiceEdit } from "@/widgets/admin/ui/services/ServiceEdit"
import { useServiceDelete, useServiceOrder, useServices } from "@/entities/service"
import { Typography } from "@/shared/ui/typography"
import { ConfirmModal, DeleteButton, EditButton, SortableList } from "@/shared/ui/widgets"

export function ServicesList() {
  const locale = useLocale() as Locale
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const { isPending, data: services } = useServices()
  const { mutateAsync: deleteService } = useServiceDelete()
  const { mutate: order } = useServiceOrder()

  const handleOrder = (services: Service[]) => {
    if (services) order(services.map((s) => s.id))
  }

  const handleDelete = () => {
    if (!pendingDeleteId) return

    toast.promise(deleteService(pendingDeleteId).then(() => setPendingDeleteId(null)), {
      loading: "Удаление…",
      success: "Услуга удалена",
      error: (error) => ({
        message: error?.message || "Не удалось удалить услугу",
      }),
    })
  }

  if (!services) return null
  return (
    <>
      <SortableList
        items={services}
        getId={(service) => service.id}
        onReorder={handleOrder}
        onDragStart={() => setExpandedId(null)}
        expandedId={expandedId}
        renderExpanded={(service) => <ServiceEdit service={service} />}
        renderItem={(service) => (
          <>
            <Typography variant="bodySm">{service.title[locale]}</Typography>

            <div className="flex shrink-0 gap-2">
              <EditButton
                label="Редактировать услугу"
                expanded={service.id === expandedId}
                onClick={() => setExpandedId((id) => (id === service.id ? null : service.id))}
              />
              <DeleteButton label="Удалить услугу" onClick={() => setPendingDeleteId(service.id)} />
            </div>
          </>
        )}
      />
      <ConfirmModal
        open={pendingDeleteId !== null}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleDelete}
        title="Удалить услугу?"
        description="Действие необратимо."
        isPending={isPending}
      />
    </>
  )
}
