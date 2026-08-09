import { setRequestLocale } from "next-intl/server"

import { CaseCreate, CasesList } from "@/widgets/admin"

export default async function AdminCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <div className="flex flex-col gap-10">
      <CasesList />
      <CaseCreate />
    </div>
  )
}
