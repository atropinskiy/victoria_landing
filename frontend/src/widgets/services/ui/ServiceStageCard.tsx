import type { cardVariants } from "@/shared/ui/card"
import type { VariantProps } from "class-variance-authority"

import { Card, CardContent, CardHeader } from "@/shared/ui/card"

interface ServiceStageCardProps extends Pick<VariantProps<typeof cardVariants>, "variant"> {
  title: React.ReactNode
  children: React.ReactNode
}

export function ServiceStageCard({ title, children, variant = "accent" }: ServiceStageCardProps) {
  return (
    <Card variant={variant} className="w-68 shrink-0 snap-start" rounded="rounded">
      <CardHeader className="text-right">{title}</CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end gap-10">{children}</CardContent>
    </Card>
  )
}
