import { setRequestLocale } from "next-intl/server"

import { ContactsEdit } from "@/widgets/admin/contacts"

export default async function AdminContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return <ContactsEdit />
}
