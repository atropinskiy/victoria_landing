import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useLogin, useLogout, useRegister } from "@/features/auth/api/useAuth"
import { QueryKeys } from "@/shared/config"

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

const mockUser = {
  id: 0,
  email: "mock_email",
  username: "mock_username",
  is_active: true,
  role: "user",
}

beforeEach(() => {
  mocks.post.mockReset()
})

afterEach(() => {
  cleanup()
})

describe("useRegister", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({
      data: { success: true, message: "", data: mockUser },
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
    expect(queryClient.getQueryData([QueryKeys.USER])).toEqual(mockUser)
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

    expect(queryClient.getQueryData([QueryKeys.USER])).toBeUndefined()
  })
})

describe("useLogin", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({
      data: { success: true, message: "", data: mockUser },
      error: undefined,
    })

    const queryClient = new QueryClient()
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper(queryClient) })

    await result.current.mutateAsync({ login: "user", password: "password" })

    expect(mocks.post).toHaveBeenCalledWith("/auth/login", {
      body: { login: "user", password: "password" },
    })
    expect(queryClient.getQueryData([QueryKeys.USER])).toEqual(mockUser)
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

    expect(queryClient.getQueryData([QueryKeys.USER])).toBeUndefined()
  })
})

describe("useLogout", () => {
  it("success", async () => {
    mocks.post.mockResolvedValueOnce({ data: {}, error: undefined })

    const queryClient = new QueryClient()

    queryClient.setQueryData([QueryKeys.USER], { id: 1, username: "test" })

    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper(queryClient) })
    await result.current.mutateAsync()

    expect(mocks.post).toHaveBeenCalledWith("/users/logout")
    expect(queryClient.getQueryData([QueryKeys.USER])).toBeNull()
  })

  it("error", async () => {
    mocks.post.mockRejectedValueOnce(new Error("network error"))

    const queryClient = new QueryClient()

    queryClient.setQueryData([QueryKeys.USER], { id: 1, username: "test_username" })

    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper(queryClient) })
    await expect(result.current.mutateAsync()).rejects.toThrow()

    expect(queryClient.getQueryData([QueryKeys.USER])).toBeNull()
  })
})
