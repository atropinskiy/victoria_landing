"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { Field, FieldError } from "@/shared/ui/field"
import { PasswordInput } from "@/shared/ui/widgets/PasswordInput"

interface FormPasswordInputProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof PasswordInput>, "name" | "aria-label"> {
  name: FieldPath<T>
  control: Control<T>
  label: string
}

function FormPasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: FormPasswordInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <PasswordInput
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

export { FormPasswordInput }
