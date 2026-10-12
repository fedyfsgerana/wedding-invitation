const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function withMinDuration<T>(
  action: () => T | Promise<T>,
  minDuration: number,
): Promise<T> {
  const started = Date.now();
  try {
    return await action();
  } finally {
    const rest = minDuration - (Date.now() - started);
    if (rest > 0) await wait(rest);
  }
}
