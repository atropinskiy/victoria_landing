export const AppRoutes = {
  HOME: "/",
  ABOUT: { pathname: "/", hash: "about" },
  ABOUT_PAGE: "/about",
  SERVICES: { pathname: "/", hash: "services" },
  CASES: { pathname: "/", hash: "cases" },
  LIBRARY: { pathname: "/", hash: "library" },
  PROFILE: "/profile",
  CONTACTS: { pathname: "/", hash: "contacts" },
  BOOK: { pathname: "/", hash: "book" },
  ADMIN: {
    HOME: "/admin",
    ABOUT: "/admin/about",
    SERVICES: "/admin/services",
    CASES: "/admin/cases",
    LIBRARY: "/admin/library",
    CONTACTS: "/admin/contacts",
  },
} as const
