import { QueryProvider } from "@/app/providers/QueryProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}
