import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function ServicesSection() {
  return (
    <Container id="services">
      <Typography as="h1" variant="h1" color="burgundy" className="self-center sm:self-start">
        Мои услуги
      </Typography>
    </Container>
  )
}
