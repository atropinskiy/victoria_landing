import { useTranslations } from "next-intl"
import Link from "next/link"

import { LocaleSwitcher } from "@/components/LocaleSwitcher"

export function Header() {
  const t = useTranslations("nav")

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Logo
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            {t("contact")}
          </Link>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  )
}
