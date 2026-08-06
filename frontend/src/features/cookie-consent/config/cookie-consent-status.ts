export const CookieConsentStatuses = {
  ACCEPTED: "accepted",
  DECLINED: "declined",
} as const

export type CookieConsentStatus = (typeof CookieConsentStatuses)[keyof typeof CookieConsentStatuses]
