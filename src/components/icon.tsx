'use client';

import { cn } from '@/lib/utils';
import { Icon as IconifyIcon } from '@iconify-icon/react';

export function Icon({ className, ...props }: React.ComponentProps<typeof IconifyIcon>) {
  return <IconifyIcon className={cn("w-[1em] h-[1em] mx-1", className)} {...props} />;
}