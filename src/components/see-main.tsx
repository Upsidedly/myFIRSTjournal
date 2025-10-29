import { cn } from "@/lib/utils"
import Link from "next/link"

export function SeeMain({ className, href }: { className?: string, href: string }) {
    return <Link
            href={href}
            className={cn(
            "group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all mt-1 no-underline",
            className
)}>See main article</Link> }