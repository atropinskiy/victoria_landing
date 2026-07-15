import { setRequestLocale } from "next-intl/server"

import { AboutSection } from "@/widgets/about"
import { AchievementsSection } from "@/widgets/achievements"
import { CasesSection } from "@/widgets/cases"
import { ConsultationForm } from "@/widgets/consultation-form"
import { ContactsSection } from "@/widgets/contacts"
import { CustomerIndustriesSection } from "@/widgets/customer-industries"
import { DirectionsSection } from "@/widgets/directions"
import { HeroSection } from "@/widgets/hero"
import { LibrarySection } from "@/widgets/library"
import { ServicesSection } from "@/widgets/services"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <main>
      <HeroSection />

      <AchievementsSection />

      <DirectionsSection />

      <CustomerIndustriesSection />

      <ConsultationForm />

      <AboutSection />

      <ServicesSection />

      <CasesSection />

      <LibrarySection />

      <ContactsSection />
    </main>
  )
}
