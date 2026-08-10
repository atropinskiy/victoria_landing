"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { Dropzone } from "@/shared/ui/widgets/Dropzone"
import { Field, FieldError } from "@/shared/ui/field"

interface FormDropzoneProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof Dropzone>, "name" | "value" | "onChange"> {
  name: FieldPath<T>
  control: Control<T>
}

function FormDropzone<T extends FieldValues>({
  name,
  control,
  ...props
}: FormDropzoneProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <Dropzone
            {...props}
            value={field.value ?? null}
            onChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  )
}

export { FormDropzone }
