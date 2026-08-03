import type { components } from "@/shared/api"

export interface Localized {
  ru: string
  en: string
}

export type TestCategory = "MONEY" | "PARTNERSHIP" | "ENTREPRENEUR"

export type Test = components["schemas"]["TestRead"]
export type TestSubmitRequest = components["schemas"]["TestSubmitRequest"]
export type TestAnswerItem = components["schemas"]["AnswerItem"]
export type TestResult = components["schemas"]["TestResultRead"]
