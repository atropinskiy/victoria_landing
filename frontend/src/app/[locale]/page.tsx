import { getTranslations } from "next-intl/server"

import { PostList } from "@/components/sections/ExamplePostList"

export default async function HomePage() {
  const t = await getTranslations("main")

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{t("title")}</h1>
      <p className="mt-4 text-lg text-zinc-600">{t("welcome")}</p>
      <PostList />
    </div>
  )
}
