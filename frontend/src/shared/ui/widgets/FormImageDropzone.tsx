"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { ImageDropzone } from "@/shared/ui/widgets/ImageDropzone"
import { Field, FieldError } from "@/shared/ui/field"

interface FormImageDropzoneProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof ImageDropzone>, "name" | "value" | "onChange"> {
  name: FieldPath<T>
  control: Control<T>
}

function FormImageDropzone<T extends FieldValues>({
  name,
  control,
  ...props
}: FormImageDropzoneProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <ImageDropzone
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

export { FormImageDropzone }
