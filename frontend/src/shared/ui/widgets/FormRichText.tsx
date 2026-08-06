"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { Field, FieldError } from "@/shared/ui/field"
import { RichTextEditor } from "@/shared/ui/widgets/RichTextEditor"

interface FormRichTextProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label: string
  height?: string
}

export function FormRichText<T extends FieldValues>({
  name,
  control,
  label,
  height,
}: FormRichTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            placeholder={label}
            height={height}
          />
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  )
}
