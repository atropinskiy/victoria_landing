import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/shared/lib/utils"

const typographyVariants = cva("font-heading", {
  variants: {
    variant: {
      h1: "text-[67px] leading-tight font-bold tracking-normal uppercase",
      h2: "text-[47px] leading-tight font-bold tracking-normal uppercase",
      h3: "text-[32px] leading-tight font-bold tracking-normal uppercase",
      h4: "text-[28px] leading-tight font-bold tracking-normal uppercase",
      h5: "text-[24px] leading-tight font-bold tracking-normal uppercase",
      h6: "text-[24px] leading-tight font-bold tracking-normal capitalize",

      menuItem: "text-[24px] leading-snug font-bold uppercase",

      bodyLg: "text-[24px] leading-tight font-bold text-justify",
      body: "text-[20px] leading-tight text-justify",
      bodySm: "font-sans text-[18px] leading-tight font-normal",
      accent: "font-sans text-[18px] leading-tight font-semibold italic capitalize",
    },
    color: {
      burgundy: "text-primary",
      ink: "text-foreground",
      cream: "text-cream",
      navy: "text-navy",
      slate: "text-slate",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "ink",
  },
})

interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

function Typography({ className, variant, color, as, ...props }: TypographyProps) {
  const Comp = as ?? "p"

  return (
    <Comp
      data-slot="typography"
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
