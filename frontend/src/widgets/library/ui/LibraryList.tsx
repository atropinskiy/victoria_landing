import { getLibrary } from "@/entities/library"

import { LibraryCarousel } from "./LibraryCarousel"

export async function LibraryList() {
  const items = await getLibrary()

  if (!items.length) return null

  return <LibraryCarousel items={items} />
}
