import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function ServicesSection() {
  return (
    <Container id="services">
      <Typography as="h3" variant="h3" color="burgundy" className="self-center sm:self-start">
        Мои услуги
      </Typography>
    </Container>
  )
}
