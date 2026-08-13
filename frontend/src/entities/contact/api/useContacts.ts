import type { ContactsPayload } from "@/entities/contact/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { revalidateContacts } from "@/entities/contact/api/actions"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export function useContactsUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ body }: { body: ContactsPayload }) => {
      const { data, error } = await client.PATCH("/contacts", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CONTACTS] })
      revalidateContacts()
    },
  })
}

export function useContacts() {
  return useQuery({
    queryKey: [QueryKeys.CONTACTS],
    queryFn: async () => {
      const { data, error } = await client.GET("/contacts")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
