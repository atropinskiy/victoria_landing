import { Typography } from "@/shared/ui/typography"

interface DirectionItemProps {
  children: React.ReactNode
}

export function DirectionItem({ children }: DirectionItemProps) {
  return (
    <Typography
      as="li"
      variant="h4"
      className="sm:bg-card sm:text-card-foreground sm:ring-foreground/10 rounded-sm font-normal sm:flex sm:items-center sm:p-6 sm:shadow-lg sm:ring-1 sm:shadow-black/20"
    >
      {children}
    </Typography>
  )
}
