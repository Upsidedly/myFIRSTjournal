import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    
    if (icon in icons) {
      // All icons use the CrocoDocs red #E43437
      const colorMap: Record<string, string> = {
        'Rocket': 'text-[#E43437]',
        'Eye': 'text-[#E43437]',
        'Target': 'text-[#E43437]',
        'BookOpen': 'text-[#E43437]',
      };
      
      const className = colorMap[icon] || 'text-red-500';
      
      return createElement(icons[icon as keyof typeof icons], { 
        className,
        size: 16,
      });
    }
  },
});
