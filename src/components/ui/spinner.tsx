'use client';

import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: number;
}

export function Spinner({ className, size = 40 }: SpinnerProps) {
  // Determine bar count based on size
  let barCount = 12;
  if (size <= 16) barCount = 8;
  else if (size <= 24) barCount = 10;

  // Adjust geometry by size
  let barLength = 0.24;
  let barThickness = 0.08;
  let translate = 1.46;
  let duration = 1.2;

  if (size <= 16) {
    barLength = 0.16;
    barThickness = 0.18;
    translate = 1.20;
    duration = 0.9;
  } else if (size <= 24) {
    barLength = 0.20;
    barThickness = 0.10;
    translate = 1.35;
    duration = 1.05;
  }

  return (
    <div
      className={cn('relative block', className)}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full left-1/2 top-1/2">
        {[...Array(barCount)].map((_, i) => {
          const angle = (360 / barCount) * i;
          // evenly phase offsets so no dead frames
          const delay = -(duration / barCount) * i;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-current animate-[spinner-fade_linear_infinite]"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: `rotate(${angle}deg) translate(${translate * 100}%)`,
                width: `${barLength * 100}%`,
                height: `${barThickness * 100}%`,
                top: '-3.9%',
                left: '-10%',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
