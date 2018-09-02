/**
 * chunkify splits an array in groups of len items
 * @param arr 
 * @param len 
 */
export function chunkify<T>(arr: T[], len: number): T[][] {
  return arr.reduce((prev, _, i) => {
    if (i % len === 0) {
      prev.push(arr.slice(i, i + len));
    }
    return prev;
  }, []);
};

/**
 * getCharArray removes every space and obtains an array of characters in the
 * order they appear in the sentence.
 * @param sentence The sentence to split into chars
 */
export const getCharArray = (sentence: string) =>
  sentence
    .split(' ')
    .join('')
    .split('');
