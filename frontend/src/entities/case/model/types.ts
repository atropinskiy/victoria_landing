import type { components } from "@/shared/api"

type Bilingual = components["schemas"]["Bilingual"]

export type CaseBody = components["schemas"]["Body_create_case_cases_post"]

export type CasePayload = {
  title: Bilingual
  description: Bilingual
  image?: File
}

export type Case = components["schemas"]["CaseRead"]
export type CaseOrderItem = components["schemas"]["CaseOrderItem"]
