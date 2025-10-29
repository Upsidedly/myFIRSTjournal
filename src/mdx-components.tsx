import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import getPageCardComponents from '@suin/fumadocs-page-card';
import { source } from './lib/source';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...getPageCardComponents({ source }),
    ...components,
  };
}
