import type { paths } from "./schema"

import createClient from "openapi-fetch"

import { BASE_URL } from "@/shared/config"

export const client = createClient<paths>({ baseUrl: BASE_URL, credentials: "include" })
