/**
 * Calls an async function with a timeout that throws a catchable error
 * if the function doesn't resolve in time.
 *
 * @param fn asynchronous function to call
 * @param errorMessage error message to display if call takes longer than time limit
 * @param ms number of milliseconds before timeout error is thrown
 * @returns value returned by fn argument
 */
export const asyncTimeout = <T>(fn: () => Promise<T>, errorMessage: string, ms: number = 10000) => {
  return new Promise<T>((resolve, reject) => {
    (async () => {
      const timeoutId = setTimeout(() => {
        reject(new Error(errorMessage));
      }, ms);

      const result = await fn();
      clearTimeout(timeoutId);
      resolve(result);
    })();
  });
};
