# Dictionary Reference Feature

This feature allows you to create interactive dictionary references in your MDX content using double brackets `[[term]]`.

## How It Works

1. **Remark Plugin**: `src/lib/remark-double-brackets.js` parses `[[term]]` syntax and converts it to a `<Bracket>` component
2. **Dictionary Data**: `src/lib/dictionary.ts` contains all term definitions
3. **Bracket Component**: `src/components/bracket.tsx` renders the interactive tooltip

## Usage in MDX

### Basic Usage

Simply wrap any term in double brackets:

```mdx
A [[robot]] is a programmable machine.
The [[FTC]] competition is exciting.
```

### Custom Display Text

Use the pipe `|` syntax to display custom text while using a dictionary entry:

```mdx
The [[First Tech Challenge|ftc]] is a great program.
We use [[proportional-integral-derivative|pid]] control.
```

**Format**: `[[display text|dictionary-key]]`
- The text on the **left** of the pipe is what displays to users
- The text on the **right** is the dictionary lookup key

## Adding New Terms

Edit `src/lib/dictionary.ts` and add entries to the dictionary object:

```typescript
export const dictionary: Record<string, DictionaryEntry> = {
  "your-term": {
    term: "Your Term",
    definition: "The definition of your term.",
    category: "Category Name" // optional
  },
  // ... more terms
};
```

**Note**: Dictionary keys are case-insensitive. `[[Robot]]`, `[[robot]]`, and `[[ROBOT]]` will all match the same entry.

## Features

- **Hover tooltip**: Displays definition when hovering over the term
- **Click toggle**: Click to pin the tooltip open
- **Custom display text**: Use `[[display|key]]` to show different text than the dictionary term
- **Fallback**: Undefined terms display as `[[term]]` without interaction
- **Styling**: Uses your theme's colors via Tailwind CSS
- **Categories**: Optional category labels for terms

## Example

Visit `/docs/getting-started/dictionary-demo` to see it in action.
