"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"

import { FileDropzone } from "@/shared/ui/widgets/FileDropzone"
import { Field, FieldError } from "@/shared/ui/field"

interface FormFileDropzoneProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof FileDropzone>, "name" | "value" | "onChange"> {
  name: FieldPath<T>
  control: Control<T>
}

function FormFileDropzone<T extends FieldValues>({
  name,
  control,
  ...props
}: FormFileDropzoneProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <FileDropzone
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

export { FormFileDropzone }
