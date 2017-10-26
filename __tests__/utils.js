import {
  getCharArray,
  chunkify,
} from '../src/utils';

describe('getCharArray', () => {
  it ('should return the sentence without spaces in an array of its chars', () => {
    const a = getCharArray('this is a test');
    expect(a).toEqual(['t', 'h', 'i', 's', 'i', 's', 'a', 't', 'e', 's', 't']);
  });

  it ('should keep punctuation such as `,` or `!`', () => {
    const comma = getCharArray('hi, comma');
    expect(comma).toEqual(['h', 'i', ',', 'c', 'o', 'm', 'm', 'a']);

    const exclamation = getCharArray('wow! cool.');
    expect(exclamation).toEqual(['w', 'o', 'w', '!', 'c', 'o', 'o', 'l', '.']);
  });
});

describe('chunkify', () => {
  it ('size should be smaller than the length of the array', () => {
    expect(chunkify(['t', 'e', 's', 't' ], 3)).toEqual([['t', 'e', 's'], ['t']]);
  });

  it ('size should be larger than the length of the array', () => {
    expect(chunkify(['t', 'e', 's', 't' ], 6)).toEqual([['t', 'e', 's', 't']]);
  });
});
