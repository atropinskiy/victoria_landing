import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function ContactsSection() {
  return (
    <Container id="contacts" bg="secondary">
      <Typography as="h3" variant="h3" color="burgundy" className="self-center sm:self-start">
        Контакты
      </Typography>
    </Container>
  )
}
