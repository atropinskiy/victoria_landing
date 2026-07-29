import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useLogin, useLogout, useRegister } from "@/features/auth/api/useAuth"
import { USER_QUERY_KEY } from "@/entities/user"
import { getAuthToken, setAuthToken } from "@/shared/lib/auth"

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
}))

vi.mock("@/shared/api", () => ({
  client: { POST: mocks.post },
}))

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

beforeEach(() => {
  localStorage.clear()
  mocks.post.mockReset()
})

afterEach(() => {
  cleanup()
})

describe("useRegister", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: "",
        data: {
          id: 0,
          email: "mock_email",
          username: "mock_username",
          is_active: true,
          role: "user",
          access_token: "mock_token",
          token_type: "bearer",
        },
      },
    })

    const queryClient = new QueryClient()
    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper(queryClient) })
    await result.current.mutateAsync({
      username: "mock_username",
      email: "mock_email",
      password: "password",
    })

    expect(mocks.post).toHaveBeenCalledWith("/auth/register", {
      body: {
        username: "mock_username",
        email: "mock_email",
        password: "password",
      },
    })
    expect(getAuthToken()).toBe("mock_token")
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toEqual({
      id: 0,
      email: "mock_email",
      username: "mock_username",
      is_active: true,
      role: "user",
      access_token: "mock_token",
      token_type: "bearer",
    })
  })

  it("error", async () => {
    mocks.post.mockResolvedValueOnce({
      data: undefined,
      error: { message: "Invalid register" },
    })

    const queryClient = new QueryClient()
    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper(queryClient) })
    await expect(
      result.current.mutateAsync({
        username: "mock_username",
        email: "mock_email",
        password: "password",
      })
    ).rejects.toEqual({ message: "Invalid register" })

    expect(getAuthToken()).toBeNull()
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeUndefined()
  })
})

describe("useLogin", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: "",
        data: { access_token: "test_token", token_type: "bearer" },
      },
      error: undefined,
    })

    const queryClient = new QueryClient()
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper(queryClient) })

    await result.current.mutateAsync({ login: "user", password: "password" })

    expect(mocks.post).toHaveBeenCalledWith("/auth/login", {
      body: { login: "user", password: "password" },
    })
    expect(getAuthToken()).toBe("test_token")
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toEqual({
      access_token: "test_token",
      token_type: "bearer",
    })
  })

  it("error", async () => {
    mocks.post.mockResolvedValueOnce({
      data: undefined,
      error: { message: "Invalid login or password" },
    })

    const queryClient = new QueryClient()
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper(queryClient) })

    await expect(result.current.mutateAsync({ login: "user", password: "wrong" })).rejects.toEqual({
      message: "Invalid login or password",
    })

    expect(getAuthToken()).toBeNull()
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeUndefined()
  })
})

describe("useLogout", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({ data: {}, error: undefined })

    const queryClient = new QueryClient()

    queryClient.setQueryData(USER_QUERY_KEY, { id: 1, username: "test" })
    setAuthToken("test_token")

    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper(queryClient) })
    await result.current.mutateAsync()

    expect(mocks.post).toHaveBeenCalledWith("/users/logout")
    expect(getAuthToken()).toBeNull()
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeNull()
  })

  it("error", async () => {
    mocks.post.mockRejectedValueOnce(new Error("network error"))

    const queryClient = new QueryClient()

    queryClient.setQueryData(USER_QUERY_KEY, { id: 1, username: "test_username" })
    setAuthToken("test_token")

    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper(queryClient) })
    await expect(result.current.mutateAsync()).rejects.toThrow()

    expect(getAuthToken()).toBeNull()
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeNull()
  })
})
