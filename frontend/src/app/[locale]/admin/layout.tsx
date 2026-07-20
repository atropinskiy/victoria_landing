import type { Metadata } from "next"

import { Sidebar } from "@/widgets/admin"
import { Container } from "@/shared/ui/widgets"

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
    <div className="flex h-full flex-1">
      <Sidebar />
      <Container className="mt-20">{children}</Container>
    </div>
  )
}
