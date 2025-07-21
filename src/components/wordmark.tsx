import { cn } from "@/lib/utils"

export function Wordmark({ className, asSpan = true }: { className?: string, asSpan?: boolean }) {

    const Component = asSpan ? 'span' : 'p';
    return <Component className={cn('font-thin font-serif italic text-muted-foreground', className)}>
        <span>my</span><span className='text-foreground font-sans font-light'>FIRST</span>journal
    </Component>

}