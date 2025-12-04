import { cn } from "@/lib/utils";
import Link from "next/link";

export function SeeMain({
  className,
  href,
  name,
}: {
  className?: string;
  href: string;
  name?: string;
}) {
  const baseClasses = "group flex items-center gap-1 pl-5 text-sm text-muted-foreground -mt-1 no-underline";
  const linkClasses = "text-sm no-underline hover:text-foreground/100 transition-all";

  return (
    <div className={cn(baseClasses, className)}>
      ❖<span className="ml-1" />
      {name ? (
        <>
          See main article:&nbsp;
          <Link href={href} className={cn("pl-0 mt-0", linkClasses)}>
            {name}
          </Link>
        </>
      ) : (
        <Link href={href} className={linkClasses}>
          See main article
        </Link>
      )}
    </div>
  );
}