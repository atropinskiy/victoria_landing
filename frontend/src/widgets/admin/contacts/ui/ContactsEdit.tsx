"use client"

import { ContactsForm } from "@/widgets/admin/contacts/ui/ContactsForm"
import { ContactsFormSkeleton } from "@/widgets/admin/contacts/ui/ContactsFormSkeleton"
import { useContacts } from "@/entities/contact"

export function ContactsEdit() {
  const { data } = useContacts()

  if (!data) return <ContactsFormSkeleton />

  return <ContactsForm defaultValues={data} />
}
