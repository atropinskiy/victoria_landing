import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function ContactsSection() {
  return (
    <Container id="contacts" bg="secondary">
      <Typography as="h1" variant="h1" color="burgundy" className="self-center sm:self-start">
        Контакты
      </Typography>
    </Container>
  )
}
