'use client';

import { getDictionaryEntry } from '@/lib/dictionary';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BracketProps {
  children: string;
  term?: string; // Optional term prop for custom lookup key
}

export function Bracket({ children, term }: BracketProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // Use the term prop if provided, otherwise use children as the lookup key
  const lookupKey = term || children;
  const entry = getDictionaryEntry(lookupKey);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMac = () => {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    };
    
    checkMobile();
    checkMac();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    if (!isOpen || !entry?.mainPage) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Windows/Linux: Ctrl+E, Mac: Cmd+O
      const isWindowsShortcut = e.ctrlKey && !e.metaKey && e.key === 'e';
      const isMacShortcut = e.metaKey && !e.ctrlKey && e.key === 'o';
      
      if ((isWindowsShortcut || isMacShortcut) && entry.mainPage) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        router.push(entry.mainPage);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, entry, router]);

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow cursor movement to tooltip
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeout and close other tooltips
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Force close any other open tooltips by dispatching custom event
    window.dispatchEvent(new CustomEvent('close-all-brackets', { detail: { except: lookupKey } }));
    setIsOpen(true);
  };

  // Listen for close-all-brackets event to close this tooltip when another opens
  useEffect(() => {
    const handleCloseAll = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.except !== lookupKey) {
        setIsOpen(false);
      }
    };

    window.addEventListener('close-all-brackets', handleCloseAll);
    return () => window.removeEventListener('close-all-brackets', handleCloseAll);
  }, [lookupKey]);

  if (!entry) {
    // If no dictionary entry exists, just render the text in brackets
    return <span className="text-muted-foreground">[[{children}]]</span>;
  }

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="cursor-help underline decoration-dotted decoration-primary/50 hover:decoration-primary hover:text-primary transition-colors"
          >
            {children}
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{entry.term}</DrawerTitle>
            {entry.category && (
              <DrawerDescription>{entry.category}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="px-4 pb-4 space-y-3">
            <p className="text-sm text-foreground">{entry.definition}</p>
            {entry.mainPage && (
              <Link 
                href={entry.mainPage}
                className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                <span>See main article: {entry.term}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Popover with hover
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-help underline decoration-dotted decoration-primary/50 hover:decoration-primary hover:text-primary transition-colors"
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        side="bottom"
        align="start"
      >
        <div className="space-y-2">
          <div className="font-semibold text-sm">{entry.term}</div>
          {entry.category && (
            <div className="text-xs text-muted-foreground">{entry.category}</div>
          )}
          <div className="text-sm">{entry.definition}</div>
          {entry.mainPage && (
            <div className="space-y-1.5 pt-1">
              <Link 
                href={entry.mainPage}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                <span>See main article: {entry.term}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span>Press</span>
                {isMac ? (
                  <>
                    <KbdGroup>
                      <Kbd>⌘</Kbd>
                      <Kbd>O</Kbd>
                    </KbdGroup>
                  </>
                ) : (
                  <Kbd>^E</Kbd>
                )}
                <span>to open</span>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
