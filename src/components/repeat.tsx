import React from "react";

interface RepeatProps {
  count: number;
  children?: React.ReactNode;
}

/**
 * Repeat
 * Renders the `children` repeated `count` times.
 * - No styling or wrapper element is added by this component.
 * - When possible it clones child elements to provide stable keys across the list.
 */
export default function Repeat({ count, children }: RepeatProps) {
  const times = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
  if (times <= 0) return null;

  // Flatten children into an array and ensure stable keys by cloning when possible
  const childArray = React.Children.toArray(children);

  const output: React.ReactNode[] = [];

  for (let i = 0; i < times; i++) {
    childArray.forEach((child, idx) => {
      // If it's a valid React element, clone it and set a composite key
      if (React.isValidElement(child)) {
        const key = `${i}-${String(child.key ?? idx)}`;
        output.push(React.cloneElement(child, { key }));
      } else {
        // For non-elements (strings, numbers, etc) wrap in fragment with key
        output.push(
          <React.Fragment key={`${i}-${idx}`}>{child}</React.Fragment>
        );
      }
    });
  }

  return <>{output}</>;
}
