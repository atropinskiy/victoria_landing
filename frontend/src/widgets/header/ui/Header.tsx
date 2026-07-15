import { BurgerMenu } from "@/widgets/header/ui/BurgerMenu"
import { LocaleSwitcher } from "@/widgets/header/ui/LocaleSwitcher"
import { LoginButton } from "@/widgets/header/ui/LoginButton"
import { Container } from "@/shared/ui/widgets"

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-transparent pr-(--removed-body-scroll-bar-size,0px)">
      <Container className="flex-row justify-end py-6">
        <div className="pointer-events-auto flex items-center gap-2">
          <LoginButton />
          <LocaleSwitcher />
          <BurgerMenu />
        </div>
      </Container>
    </header>
  )
}
