export const AppRoutes = {
  ABOUT: "/",
  // ABOUT: "/about",
  SERVICES: "/services",
  // SERVICES_BUSINESS: '/services/business-partnership',
  // SERVICES_DIVORCE: '/services/divorce-process',
  // SERVICES_MEDIATION: '/services/mediation',
  // SERVICES_REALTY: '/services/real-estate',
  CASES: "/cases",
  LIBRARY: "/library",
  PROFILE: "/profile",
  CONTACTS: "/contacts",
} as const

export const NAV_LINKS = [
  { href: AppRoutes.ABOUT, key: "about" },
  { href: AppRoutes.SERVICES, key: "services_items" },
  { href: AppRoutes.CASES, key: "cases" },
  { href: AppRoutes.LIBRARY, key: "library" },
  { href: AppRoutes.PROFILE, key: "profile" },
  { href: AppRoutes.CONTACTS, key: "contacts" },
] as const

// export const NAV_SERVICES_SUBMENU = [
//   { href: AppRoutes.SERVICES_BUSINESS, key: 'services_business' },
//   { href: AppRoutes.SERVICES_DIVORCE, key: 'services_divorce' },
//   { href: AppRoutes.SERVICES_MEDIATION, key: 'services_mediation' },
//   { href: AppRoutes.SERVICES_REALTY, key: 'services_realty' },
// ] as const;
