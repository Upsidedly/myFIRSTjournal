/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from 'unist-util-visit';

const remarkSeeMain = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // Check if paragraph contains only a link that starts with =>
      if (
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === 'link'
      ) {
        const link = node.children[0];
        if (
          link.children &&
          link.children.length > 0 &&
          link.children[0].type === 'text'
        ) {
          const text = link.children[0].value;
          if (text.startsWith('=>')) {
            const name = text.slice(2).trim();
            const href = link.url;

            // Replace the paragraph with a block-level SeeMain MDX component
            const seeMainNode = {
              type: 'mdxJsxFlowElement',
              name: 'SeeMain',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'href',
                  value: href,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'name',
                  value: name,
                },
              ],
              children: [],
            };

            parent.children[index] = seeMainNode;
          }
        }
      }
    });
  };
};

export default remarkSeeMain;
