import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function LibrarySection() {
  return (
    <Container id="library">
      <Typography as="h3" variant="h3" color="burgundy" className="self-center sm:self-start">
        Библиотека
      </Typography>
    </Container>
  )
}
