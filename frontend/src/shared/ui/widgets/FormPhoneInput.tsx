"use client"

import type { ComponentProps } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"

import { cn } from "@/shared/lib/utils"
import { Field, FieldError } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"

interface FormPhoneInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name" | "aria-label" | "onChange" | "value" | "onBlur" | "type" | "defaultValue"
> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
}

function FormPhoneInput<T extends FieldValues>({
  name,
  control,
  label = "",
  className,
  ...props
}: FormPhoneInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          <PatternFormat
            customInput={Input}
            type="tel"
            format="+7 (###) ###-##-##"
            mask="_"
            getInputRef={field.ref}
            value={field.value}
            onValueChange={(values) => field.onChange(values.formattedValue)}
            onBlur={field.onBlur}
            {...props}
            aria-invalid={fieldState.invalid}
            placeholder={label}
            aria-label={label}
            className={cn("font-mono", className)}
          />
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  )
}

export { FormPhoneInput }
