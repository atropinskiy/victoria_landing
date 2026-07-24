"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { Field, FieldError } from "@/shared/ui/field"
import { Textarea } from "@/shared/ui/textarea"

interface FormTextareaProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Textarea>,
  "name" | "aria-label"
> {
  name: FieldPath<T>
  control: Control<T>
  label: string
}

function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <Textarea
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
            placeholder={label}
            aria-label={label}
          />
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  )
}

export { FormTextarea }
