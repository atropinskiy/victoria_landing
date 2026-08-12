import type { components } from "@/shared/api"

type Bilingual = components["schemas"]["Bilingual"]

export type LibraryBody = components["schemas"]["Body_create_library_item_library_post"]

export type LibraryPayload = {
  title: Bilingual
  description?: Bilingual
  image?: File
  document?: File
}

export type LibraryItem = components["schemas"]["LibraryRead"]
export type LibraryOrderItem = components["schemas"]["LibraryOrderItem"]
