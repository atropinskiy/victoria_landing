"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { TestResultChart } from "@/entities/test"
import { useMe } from "@/entities/user"
import { Button } from "@/shared/ui/button"
import { Modal } from "@/shared/ui/widgets"

export function TestResultButton() {
  const t = useTranslations("main")
  const tTest = useTranslations("test")
  const { data } = useMe()
  const [open, setOpen] = useState(false)

  if (!data?.test_result) return null

  return (
    <>
      <Button
        type="button"
        rounded="full"
        variant="secondary"
        size="sm"
        className="h-auto w-full gap-1.5 px-4 py-2 text-center whitespace-normal uppercase sm:h-9 sm:w-auto sm:whitespace-nowrap"
        onClick={() => setOpen(true)}
      >
        {t("servicePartnershipResultCta")}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={tTest("resultTitle")}
        className="sm:max-w-lg"
      >
        <TestResultChart scores={data.test_result} />
      </Modal>
    </>
  )
}
