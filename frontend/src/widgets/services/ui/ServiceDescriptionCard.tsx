import type { cardVariants } from "@/shared/ui/card"
import type { VariantProps } from "class-variance-authority"

import { Card, CardContent, CardHeader } from "@/shared/ui/card"

interface ServiceDescriptionCardProps extends Pick<VariantProps<typeof cardVariants>, "variant"> {
  title: React.ReactNode
  children: React.ReactNode
}

export function ServiceDescriptionCard({ title, children }: ServiceDescriptionCardProps) {
  return (
    <Card
      className="h-67.25 w-full shrink-0 snap-start gap-12 overflow-visible sm:w-125"
      variant="slate"
      rounded="rounded"
    >
      <CardHeader>{title}</CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end">{children}</CardContent>
    </Card>
  )
}
