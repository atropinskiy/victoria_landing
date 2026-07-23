import { setRequestLocale } from "next-intl/server"

import { ServicesList } from "@/widgets/admin"

export default async function AdminServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <div>
      <ServicesList />
    </div>
  )
}
