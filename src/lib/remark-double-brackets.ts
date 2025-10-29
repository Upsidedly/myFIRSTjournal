/* eslint-disable @typescript-eslint/no-explicit-any */
import { findAndReplace } from "mdast-util-find-and-replace";
import type { Plugin } from "unified";
import type { PhrasingContent } from "mdast";

// Matches [[anything but ]]], non-greedy
const RE = /\[\[([\s\S]+?)\]\]/g;

const remarkDoubleBrackets: Plugin<[], any> = () => {
  return (tree: any) => {
    findAndReplace(tree, [
      [
        RE,
        (...args) => {
          // mdast-util-find-and-replace passes match, capture, and extra info
          const match = args[0] as string;
          const inner = (args[1] as string) ?? match.slice(2, -2);
          // Return an MDX JSX *text* element: <Bracket>inner</Bracket>
          return {
            type: "mdxJsxTextElement",
            name: "Bracket",
            attributes: [],
            children: [{ type: "text", value: inner }] as PhrasingContent[],
          };
        },
      ],
    ]);
  };
};

export default remarkDoubleBrackets;
