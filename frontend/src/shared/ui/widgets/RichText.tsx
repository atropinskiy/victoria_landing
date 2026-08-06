import { cn } from "@/shared/lib/utils"

interface RichTextProps {
  html: string
  className?: string
}

export function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={cn(
        "[&_a]:text-primary text-md flex flex-col gap-6 sm:text-[22px] [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right [&_a]:underline [&_h1]:text-2xl [&_h1]:font-bold [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html.replaceAll("&nbsp;", " ") }}
    />
  )
}
