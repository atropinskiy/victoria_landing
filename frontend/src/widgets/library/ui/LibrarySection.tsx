import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function LibrarySection() {
  return (
    <Container id="library">
      <Typography as="h1" variant="h1" color="burgundy" className="self-center sm:self-start">
        Библиотека
      </Typography>
    </Container>
  )
}
