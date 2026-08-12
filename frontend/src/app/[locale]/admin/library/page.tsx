import { setRequestLocale } from "next-intl/server"

import { LibraryCreate, LibraryList } from "@/widgets/admin/library"

export default async function AdminLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <div className="flex flex-col gap-10">
      <LibraryList />
      <LibraryCreate />
    </div>
  )
}
