"use client"

import type { ComponentProps } from "react"

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/input-group"

interface PasswordInputProps extends Omit<ComponentProps<typeof InputGroupInput>, "type"> {
  toggleLabel: string
}

function PasswordInput({ autoComplete, toggleLabel, variant, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <InputGroup variant={variant}>
      <InputGroupInput
        {...props}
        variant={variant}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete ?? "current-password"}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={toggleLabel}
          aria-pressed={visible}
        >
          {visible ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
