"use client"

import type { ServiceFormValues } from "@/widgets/admin/model/service-schema"

import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { ServiceForm } from "@/widgets/admin/ui/services/ServiceForm"
import { useServiceCreate } from "@/entities/service"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

export function ServiceCreate() {
  const [open, setOpen] = useState(false)

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
      <div className="flex justify-end">
        <Button
          type="button"
          aria-label="Добавить услугу"
          aria-expanded={open}
          className="h-12"
          onClick={() => setOpen((value) => !value)}
        >
          <Plus />
          Добавить услугу
        </Button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-border mt-6 flex flex-col gap-3 rounded-sm border bg-white p-4">
            <ServiceForm submitLabel="Создать" isPending={isPending} submit={handleCreate} />
          </div>
        </div>
      </div>
    </div>
  )
}
