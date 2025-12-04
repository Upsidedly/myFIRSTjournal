import { cn } from "@/lib/utils"
import Image from "next/image"

export function Wordmark({ className, asSpan = true, logoOnly = false, textOnly = false, size = 'default' }: { className?: string, asSpan?: boolean, logoOnly?: boolean, textOnly?: boolean, size?: 'default' | 'large' }) {

    const Component = asSpan ? 'span' : 'p';
    
    if (logoOnly) {
        const logoSize = size === 'large' ? 'h-8' : 'h-[1em]';
        return <Component className={cn('flex items-center', className)}>
            <Image src="/crocodocs.svg" alt="CrocoDocs" width={32} height={32} className={cn('w-auto', logoSize)} style={{ color: '#E43437' }} />
        </Component>
    }
    
    if (textOnly) {
        return <Component className={cn('font-bold', className)} style={{ color: '#E43437' }}>
            CrocoDocs
        </Component>
    }
    
    return <Component className={cn('flex items-center gap-2', className)}>
        <Image src="/crocodocs.svg" alt="CrocoDocs" width={32} height={32} className="w-auto h-[1em] inline mr-1" />
        <span className="font-bold" style={{ color: '#E43437' }}>
            CrocoDocs
        </span>
    </Component>

}