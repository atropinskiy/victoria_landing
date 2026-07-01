"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState } from "react"

import MenuIcon from "@/components/icons/menu.svg"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Typography } from "@/components/ui/typography"
import { NAV_LINKS } from "@/consts/routes"

export function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations("nav")

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="bg-background h-9 w-11"
      >
        <MenuIcon className="block size-auto" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="bg-cream border-cream w-full px-8 py-12 sm:w-72">
          <SheetTitle className="sr-only">Navigation</SheetTitle>

          <nav className="mt-16 flex flex-col gap-10">
            {NAV_LINKS.map(({ href, key }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <Typography variant="menuItem" color="navy" className="whitespace-pre-line">
                  {t(key)}
                </Typography>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
