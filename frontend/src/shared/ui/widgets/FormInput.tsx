"use client"

import type { ComponentProps, ReactNode } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { Field, FieldDescription, FieldError } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"

interface FormInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name" | "aria-label"
> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  helperText?: ReactNode
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label = "",
  helperText,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <Input
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
            placeholder={label}
            aria-label={label}
          />
          {fieldState.error ? (
            <FieldError errors={[fieldState.error]} />
          ) : (
            <FieldDescription>{helperText}</FieldDescription>
          )}
        </Field>
      )}
    />
  )
}

export { FormInput }
