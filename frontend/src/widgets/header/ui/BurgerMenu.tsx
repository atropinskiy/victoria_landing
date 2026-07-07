"use client"

import { XIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { NAV_LINKS } from "@/widgets/header/config/routes"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/shared/ui/drawer"
import { MenuIcon } from "@/shared/ui/icons"
import { Typography } from "@/shared/ui/typography"

export function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations("nav")

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.currentTarget.blur()
          setOpen(true)
        }}
        aria-label="Open menu"
        className="bg-background h-9 w-11"
      >
        <MenuIcon className="block size-auto" />
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="bg-cream border-cream px-8 py-12 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:rounded-l-none data-[vaul-drawer-direction=right]:sm:w-72">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>

          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-4 sm:right-6 lg:right-8"
            >
              <XIcon className="size-8" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>

          <nav className="mt-16 flex flex-col gap-10">
            {NAV_LINKS.map(({ href, key, subKey }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <Typography variant="menuItem" color="navy">
                  {t(key)}
                </Typography>
                {subKey && (
                  <Typography
                    variant="menuItem"
                    color="navy"
                    className="mt-1 text-sm whitespace-pre-line opacity-60"
                  >
                    {t(subKey)}
                  </Typography>
                )}
              </Link>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}
