import localFont from "next/font/local"

export const ptSansCaption = localFont({
  variable: "--font-heading",
  src: [
    { path: "./files/pt-sans-caption-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./files/pt-sans-caption-400-cyrillic.woff2", weight: "400", style: "normal" },
    { path: "./files/pt-sans-caption-700-latin.woff2", weight: "700", style: "normal" },
    { path: "./files/pt-sans-caption-700-cyrillic.woff2", weight: "700", style: "normal" },
  ],
})

export const inter = localFont({
  variable: "--font-sans",
  src: [
    { path: "./files/inter-latin.woff2", weight: "400 600", style: "normal" },
    { path: "./files/inter-cyrillic.woff2", weight: "400 600", style: "normal" },
  ],
})
