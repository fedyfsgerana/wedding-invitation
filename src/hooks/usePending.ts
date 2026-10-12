import { useCallback, useRef, useState } from "react";
import { withMinDuration } from "@/lib/withMinDuration";

export function usePending(minDuration = 500) {
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  const run = useCallback(
    async (action?: () => unknown) => {
      if (busy.current) return;
      busy.current = true;
      setPending(true);
      try {
        await withMinDuration(() => action?.(), minDuration);
      } finally {
        busy.current = false;
        setPending(false);
      }
    },
    [minDuration],
  );

  return { pending, run };
}
