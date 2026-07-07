import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function CasesSection() {
  return (
    <Container id="cases" bg="secondary">
      <Typography as="h3" variant="h3" color="burgundy" className="self-center sm:self-start">
        Кейсы
      </Typography>
    </Container>
  )
}
