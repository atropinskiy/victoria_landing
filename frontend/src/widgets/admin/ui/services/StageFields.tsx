"use client"

import type { ServiceFormValues } from "@/widgets/admin/model/service-schema"
import type { Control } from "react-hook-form"

import { Plus, X } from "lucide-react"
import { useFieldArray } from "react-hook-form"

import { BilingualRow } from "@/widgets/admin/ui/BilingualRow"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { DeleteButton } from "@/shared/ui/widgets"

export function StageFields({
  control,
  stageIndex,
  onRemove,
}: {
  control: Control<ServiceFormValues>
  stageIndex: number
  onRemove: () => void
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `stages.${stageIndex}.items`,
  })

  return (
    <div className="">
      <div className="flex items-end justify-between">
        <Typography variant="bodyXs" className="font-medium">
          Название этапа
        </Typography>
        <DeleteButton label="Удалить этап" onClick={onRemove} />
      </div>
      <BilingualRow control={control} name={`stages.${stageIndex}.title`} />
      <Typography variant="bodyXs" className="mt-2 font-medium">
        Пункты
      </Typography>
      {fields.map((field, index) => (
        <div key={field.id} className="mt-1.5 flex items-start gap-2">
          <BilingualRow
            control={control}
            name={`stages.${stageIndex}.items.${index}`}
            className="mt-0 flex-1"
          />
          <DeleteButton
            label="Удалить пункт"
            icon={X}
            iconClassName="size-5"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <Button
        className="mt-1"
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ ru: "", en: "" })}
      >
        <Plus />
        Добавить пункт
      </Button>
    </div>
  )
}
