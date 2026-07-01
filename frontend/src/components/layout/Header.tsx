import { BurgerMenu } from "@/components/layout/BurgerMenu"
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div className="mx-auto flex h-16 w-full items-center justify-end gap-2 px-4 sm:px-6 lg:px-8">
        <LocaleSwitcher />
        <BurgerMenu />
      </div>
    </header>
  )
}
