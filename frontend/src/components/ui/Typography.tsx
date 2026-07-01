import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const typographyVariants = cva("font-heading", {
  variants: {
    variant: {
      h1: "text-[67px] leading-none font-bold tracking-normal uppercase",
      h2: "text-[47px] leading-none font-bold tracking-normal uppercase",
      h3: "text-[32px] leading-none font-bold tracking-normal uppercase",
      h4: "text-[28px] leading-none font-bold tracking-normal uppercase",
      h5: "text-[24px] leading-none font-bold tracking-normal uppercase",
      h6: "text-[24px] leading-none font-bold tracking-normal capitalize",

      menuItem: "text-[24px] leading-snug font-bold uppercase",

      bodyLg: "text-[24px] leading-normal font-bold text-justify",
      body: "text-[20px] leading-normal font-bold text-justify",
      bodySm: "font-sans text-[18px] leading-normal font-normal",
      accent: "font-sans text-[18px] leading-normal font-semibold italic capitalize",
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

  return <Comp className={cn(typographyVariants({ variant, color, className }))} {...props} />
}

export { Typography, typographyVariants }
