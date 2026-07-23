"use client"

import type { Locale } from "@/shared/i18n"

import { Pencil, Trash2 } from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"

import { MOCK_SERVICES } from "@/widgets/admin/config/mockServices"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { SortableList } from "@/shared/ui/widgets"

export function ServicesList() {
  const locale = useLocale() as Locale
  const [services, setServices] = useState(MOCK_SERVICES)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <SortableList
      items={services}
      getId={(service) => service.id}
      onReorder={setServices}
      isSelected={(service) => service.id === selectedId}
      renderItem={(service) => (
        <>
          <Typography variant="bodyXs" className="font-medium">
            {service.title[locale]}
          </Typography>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              aria-label="Редактировать услугу"
              onClick={() => setSelectedId(service.id)}
            >
              <Pencil className="text-navy size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-transparent hover:text-destructive"
              aria-label="Удалить услугу"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </>
      )}
    />
  )
}
