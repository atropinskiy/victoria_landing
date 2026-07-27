import type { Metadata } from "next"

import { Sidebar } from "@/widgets/admin"
import { AdminGuard } from "@/features/auth"

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex h-full flex-1">
        <Sidebar />
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-22 pb-10 sm:px-6 lg:px-8 2xl:max-w-360">
          {children}
        </div>
      </div>
    </AdminGuard>
  )
}
