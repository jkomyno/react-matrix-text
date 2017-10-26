// @flow
type Chunk = (arr: Array<string>, len: number) => Array<Array<string>>;

export const getCharArray = (sentence: string) =>
  sentence
    .split(' ')
    .join('')
    .split('');

export const chunkify: Chunk = (arr, len) =>
  arr.reduce((prev, _, i) => {
    if (i % len === 0) {
      prev.push(arr.slice(i, i + len));
    }
    return prev;
  }, []);
