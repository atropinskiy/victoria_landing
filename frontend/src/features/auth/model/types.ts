export interface GeneralResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface User {
  id: number
  email: string
  username: string
  is_active: boolean
  role: string
}

export interface RegisterPayload {
  username: string
  email?: string
  password: string
}

export interface LoginPayload {
  login: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}
