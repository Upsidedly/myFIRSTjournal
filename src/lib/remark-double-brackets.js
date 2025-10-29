/* eslint-disable @typescript-eslint/no-explicit-any */
import { findAndReplace } from "mdast-util-find-and-replace";

// Matches [[anything but ]]], non-greedy
const RE = /\[\[([\s\S]+?)\]\]/g;

const remarkDoubleBrackets = () => {
  return (tree) => {
    findAndReplace(tree, [
      [
        RE,
        (...args) => {
          // mdast-util-find-and-replace passes match, capture, and extra info
          const match = args[0];
          const inner = args[1] ?? match.slice(2, -2);
          
          // Check if the inner text contains a pipe separator
          // Format: [[display text|dictionary-key]]
          let displayText = inner;
          let lookupKey = inner;
          
          if (inner.includes('|')) {
            const parts = inner.split('|');
            displayText = parts[0].trim();
            lookupKey = parts[1].trim();
          }
          
          // Return an MDX JSX *text* element: <Bracket term="lookupKey">displayText</Bracket>
          return {
            type: "mdxJsxTextElement",
            name: "Bracket",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "term",
                value: lookupKey,
              },
            ],
            children: [{ type: "text", value: displayText }],
          };
        },
      ],
    ]);
  };
};

export default remarkDoubleBrackets;
