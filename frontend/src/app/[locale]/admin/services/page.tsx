import { setRequestLocale } from "next-intl/server"

import { ServiceCreate, ServicesList } from "@/widgets/admin"

export default async function AdminServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <div className="flex flex-col gap-6">
      <ServicesList />
      <ServiceCreate />
    </div>
  )
}
