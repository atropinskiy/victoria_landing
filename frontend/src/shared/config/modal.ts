export const ModalIds = {
  LOGIN: "login",
  REGISTRATION: "registration",
} as const

export const MODAL_PARAM = "modal"

export type ModalId = (typeof ModalIds)[keyof typeof ModalIds]
