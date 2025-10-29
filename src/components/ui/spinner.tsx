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
      className={cn('spinner', className)}
      style={{ width: size, height: size }}
    >
      <div className="container">
        {[...Array(barCount)].map((_, i) => {
          const angle = (360 / barCount) * i;
          // evenly phase offsets so no dead frames
          const delay = -(duration / barCount) * i;
          return (
            <span
              key={i}
              className="bar"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: `rotate(${angle}deg) translate(${translate * 100}%)`,
                width: `${barLength * 100}%`,
                height: `${barThickness * 100}%`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        .spinner {
          display: block;
          position: relative;
        }

        .container {
          width: 100%;
          height: 100%;
          position: relative;
          left: 50%;
          top: 50%;
        }

        .bar {
          background-color: currentColor;
          position: absolute;
          top: -3.9%;
          left: -10%;
          border-radius: 9999px;
          animation-name: spinner-fade;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes spinner-fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
