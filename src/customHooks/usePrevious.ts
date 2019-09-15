import { useRef, useEffect } from 'react';

/**
 * A custom hook to provide the data's value from a previous render.
 *
 * Added from [useHooks.com](https://usehooks.com/usePrevious/)
 *
 * See also the description in the [official React Hooks docs](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)
 */
export default function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
