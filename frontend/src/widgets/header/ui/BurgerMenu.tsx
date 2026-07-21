"use client"

import { XIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { ADMIN_NAV_LINK, NAV_LINKS } from "@/widgets/header/config/routes"
import { useMe } from "@/features/auth"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/shared/ui/drawer"
import { MenuIcon } from "@/shared/ui/icons"
import { Typography } from "@/shared/ui/typography"

export function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations("nav")
  const { data } = useMe()

  const isAdmin = !!data

  return (
    <>
      <Button
        variant="glass"
        size="icon"
        onClick={(e) => {
          e.currentTarget.blur()
          setOpen(true)
        }}
        aria-label="Open menu"
        className="h-9 w-11"
      >
        <MenuIcon className="block size-auto" />
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="bg-cream border-cream px-8 py-12 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:rounded-l-none data-[vaul-drawer-direction=right]:sm:w-92">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>

          <DrawerClose asChild>
            <Button
              variant="plain"
              size="icon"
              className="absolute top-5 right-4 sm:right-6 lg:right-8"
            >
              <XIcon className="size-8" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>

          <nav className="mt-16 flex flex-col gap-10">
            {NAV_LINKS.map(({ href, key, subKey }) => (
              <Link key={key} href={href} onClick={() => setOpen(false)}>
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
            {isAdmin && (
              <Link href={ADMIN_NAV_LINK.href} onClick={() => setOpen(false)}>
                <Typography variant="menuItem" color="navy">
                  {t(ADMIN_NAV_LINK.key)}
                </Typography>
              </Link>
            )}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  )
}
