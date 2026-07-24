"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { cn } from "@/shared/lib/utils"
import { FormInput, FormTextarea } from "@/shared/ui/widgets"

interface BilingualRowProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  multiline?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BilingualRow<T extends FieldValues>({
  control,
  name,
  multiline,
  className,
}: BilingualRowProps<T>) {
  const ru = `${name}.ru` as FieldPath<T>
  const en = `${name}.en` as FieldPath<T>

  return (
    <div className={cn("mt-1.5 flex flex-col gap-1 sm:flex-row sm:gap-6", className)}>
      {multiline ? (
        <>
          <FormTextarea variant="light" size="md" control={control} name={ru} label="RU" />
          <FormTextarea variant="light" size="md" control={control} name={en} label="EN" />
        </>
      ) : (
        <>
          <FormInput variant="light" size="sm" control={control} name={ru} label="RU" />
          <FormInput variant="light" size="sm" control={control} name={en} label="EN" />
        </>
      )}
    </div>
  )
}
