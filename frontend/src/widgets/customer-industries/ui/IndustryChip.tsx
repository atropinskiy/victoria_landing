import { Typography } from "@/shared/ui/typography"

interface IndustryChipProps {
  children: React.ReactNode
}

export function IndustryChip({ children }: IndustryChipProps) {
  return (
    <li className="border-primary/60 bg-primary/5 rounded-full border px-5 py-2">
      <Typography as="span" color="burgundy" variant="bodySm" className="font-semibold italic">
        {children}
      </Typography>
    </li>
  )
}
