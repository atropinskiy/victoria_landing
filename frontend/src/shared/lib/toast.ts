import { toast } from "sonner"

export function toastSaveChanges<T>(promise: Promise<T>): Promise<T> {
  toast.promise(promise, {
    loading: "Сохраняем изменения",
    success: "Изменения сохранены",
    error: (error) => ({
      message: error?.message || "Не удалось сохранить изменения",
    }),
  })
  return promise
}
