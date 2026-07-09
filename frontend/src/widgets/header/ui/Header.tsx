import { BurgerMenu } from "@/widgets/header/ui/BurgerMenu"
import { LocaleSwitcher } from "@/widgets/header/ui/LocaleSwitcher"
import { LoginButton } from "@/widgets/header/ui/LoginButton"
import { Container } from "@/shared/ui/widgets"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <Container className="flex-row items-center justify-end gap-2 py-6">
        <LoginButton />
        <LocaleSwitcher />
        <BurgerMenu />
      </Container>
    </header>
  )
}
