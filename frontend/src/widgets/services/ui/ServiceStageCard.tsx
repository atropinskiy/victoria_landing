import type { VariantProps } from "class-variance-authority"

import { Card, CardContent, CardHeader, cardVariants } from "@/shared/ui/card"

interface ServiceStageCardProps extends Pick<VariantProps<typeof cardVariants>, "variant"> {
  title: React.ReactNode
  children: React.ReactNode
}

export function ServiceStageCard({ title, children, variant = "accent" }: ServiceStageCardProps) {
  return (
    <Card variant={variant} className="sm:w-70 sm:shrink-0" rounded="default">
      <CardHeader className="text-center">{title}</CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end gap-10">{children}</CardContent>
    </Card>
  )
}
