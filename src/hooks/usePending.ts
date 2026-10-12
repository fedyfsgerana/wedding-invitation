import { useCallback, useRef, useState } from "react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function usePending(minDuration = 500) {
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  const run = useCallback(
    async (action?: () => unknown) => {
      if (busy.current) return;
      busy.current = true;
      setPending(true);
      const started = Date.now();
      try {
        await action?.();
      } finally {
        const rest = minDuration - (Date.now() - started);
        if (rest > 0) await wait(rest);
        busy.current = false;
        setPending(false);
      }
    },
    [minDuration],
  );

  return { pending, run };
}
