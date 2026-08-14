import { cn } from "@/shared/lib/utils"

function IconBadge({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md [&_svg]:size-5",
        active ? "bg-primary text-primary-foreground" : "border-slate/40 text-slate border"
      )}
    >
      {children}
    </span>
  )
}

export { IconBadge }
