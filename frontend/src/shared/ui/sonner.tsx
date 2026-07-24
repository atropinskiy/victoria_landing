"use client"

import type { ToasterProps } from "sonner"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="text-primary size-5" />,
        info: <InfoIcon className="text-primary size-5" />,
        warning: <TriangleAlertIcon className="text-primary size-5" />,
        error: <OctagonXIcon className="text-primary size-5" />,
        loading: <Loader2Icon className="text-slate size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast shadow-xl shadow-black/20 ring-1 ring-foreground/20",
          title: "text-base font-semibold",
          description: "!text-slate",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
