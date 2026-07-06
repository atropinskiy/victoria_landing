import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

const cardVariants = cva(
  "group/card ring-foreground/10 flex flex-col gap-(--card-spacing) overflow-hidden py-(--card-spacing) text-sm ring-1 shadow-lg shadow-black/20 [--card-spacing:--spacing(6)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        secondary:
          "bg-secondary text-secondary-foreground ring-0 [&_[data-slot=typography]]:text-secondary-foreground",
        primary:
          "bg-primary text-primary-foreground ring-0 [&_[data-slot=typography]]:text-primary-foreground",
        accent:
          "bg-accent text-accent-foreground ring-0 [&_[data-slot=typography]]:text-accent-foreground",
      },
      rounded: {
        default: "rounded-xl *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "none",
    },
  }
)

function Card({
  className,
  size = "default",
  variant = "default",
  rounded,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants({ variant, rounded }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) text-xl font-bold uppercase has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

const cardTitleVariants = cva(
  "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      align: "left",
    },
  }
)

function CardTitle({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ align }), className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground group-data-[variant=accent]/card:text-accent-foreground group-data-[variant=primary]/card:text-primary-foreground group-data-[variant=secondary]/card:text-secondary-foreground text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "bg-muted/50 flex items-center rounded-b-xl border-t p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  cardTitleVariants,
}
