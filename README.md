# react-matrix-text

ReactJS component that splits and renders a text in a given number of columns.

--------------------------------

[![Travis](https://img.shields.io/travis/jkomyno/react-matrix-text.svg)](https://travis-ci.org/jkomyno/react-matrix-text)
[![npm](https://img.shields.io/npm/v/react-matrix-text.svg)](https://npmjs.com/package/react-matrix-text)
[![npm](https://img.shields.io/npm/dm/react-matrix-text.svg)](https://npmjs.com/package/react-matrix-text)
[![Issue Stats](https://img.shields.io/issuestats/i/github/jkomyno/react-matrix-text.svg)]

## The problem

While looking for new designers to follow on [Dribbble](https://dribbble.com) I bumped into [this awesome mockup](https://dribbble.com/shots/2078854-Core-Media-Hero-Exploration) which sports a matrix-like section
with some stylish text in it, rendered across the rows and columns. I wanted to create a React component
as simple and flexible as possible that would emulate the same behaviour, given a sentence and the number
of columns I want it to be subdivided in.

## The solution

This component solves the problem while providing the maximum flexibility, with a really tiny API.
This is possible because this library uses a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) thanks to which you are
the only responsible for the rendering of practically everything. You simply have to apply props to what you're
rendering.
This allows you to define your own HTML tags and classNames, without having to pass a bunch of `view` related
parameters every time.

## Table of Contents

- [Installation](#installation)
- [Props](#props)
  - [sentence](#sentence)
  - [columns](#columns)
  - [renderRow](#renderrow)
  - [renderColumn](#rendercolumn)
- [Example](#example)
  - [Result](#result)
- [Typings](#typings)
- [Available scripts](#available-scripts)
- [License](#license)
- [Contributing](#contributing)

## Installation

The compiled version of this module is distributed via [npm](https://www.npmjs.com/) and should be installed as one of your project `dependencies`.

- `yarn add react-matrix-text`

Or, if you prefer using npm ([but you shouldn't](https://medium.com/@kaayru/what-is-yarn-and-should-we-use-it-dbd8c46de6a)):

- `npm i -S react-matrix-text`

It requires React ^16.0.0.

> This package also depends on `react^16.0.0`. Please make sure your `react` version matches.

## Props

### columns

> `number` | defaults to `3`

The number of columns of the resulting matrix.

### sentence

> `string` | defaults to `''`

Sentence to split into the matrix. Spaces will be removed, but punctuation marks will be kept.

### renderRow

> `(columns: JSX.Element[], rowIndex: number) => JSX.Element`

The callback prop which renders the rows of the resulting matrix.
It receives a `columns` array of React Components (the rendered columns) and the index of the current row, and must return the wrapper component for them.

### renderColumn

> `(char: string, rowIndex: number, columnIndex: number) => JSX.Element`

The callback prop which renders the single columns of the resulting matrix.
It receives a `char` string as argument (the current character of the sentence) and must return the wrapper component for it.

### getRowKey

> `(charsForRow: string[], rowIndex: number) => string`

Callback that should return the key to be applied to a certain row, provided the array of characters to be rendered, and the index of the current row.
The default generated key has the pattern `row_${rowIndex}_${charsForRow.join('')}`.

### getColumnKey

> `(char: string, rowIndex: number, columnIndex: number) => string`

Callback that should return the key to be applied to a certain column, provided the character to be rendered, the index of the current row, and the index of the current column.
The default generated key has the pattern `column_${rowIndex}_${columnIndex}_${char}`.

## Example

An example React app which uses this module is located in the [example folder](/example).

## Keys

Since version `1.1.0`, there's the possibility to inject custom keys to the generated rows and columns.
Let's first take a look at the default behaviour:

```jsx
<MatrixText
  number={3}
  sentence="This is"
  renderRow={(columns, rowIndex) => <div className="row">{columns}</div>}
  renderColumn={(char, rowIndex, columnIndex) => <span>{char}</span>}
/>
```

The interpreted JSX is the following:

```html
  <div key="row_0_THI" className="row">
    <span key="col_0_0_E">T</span>
    <span key="col_0_1_E">H</span>
    <span key="col_0_2_E">I</span>
  </div>
  <div key="row_1_SIS" className="row">
    <span key="col_1_0_E">S</span>
    <span key="col_1_1_E">I</span>
    <span key="col_1_2_E">S</span>
  </div>
```

With custom keys, the situation is the following:

```jsx
<MatrixText
  number={3}
  sentence="This is"
  renderRow={(columns, rowIndex) => <div className="row">{columns}</div>}
  renderColumn={(char, rowIndex, columnIndex) => <span>{char}</span>}
  getColumnKey={(char, rowIndex, columnIndex) => `c${rowIndex}/${columnIndex}/${char}`}
  getRowKey={(charsForRow, rowIndex) => `r${index}`}
/>
```

The interpreted JSX is now the following:

```html
  <div key="r0" className="row">
    <span key="c0/0/E">T</span>
    <span key="c/0/1/E">H</span>
    <span key="c/0/2/E">I</span>
  </div>
  <div key="r1" className="row">
    <span key="c/1/0/E">S</span>
    <span key="c/1/1/E">I</span>
    <span key="c/1/2/E">S</span>
  </div>
```

### Result

![Example image](./images/result.jpg)

## Typings

While this project used the Flow type system until version `0.1.0`, but it's entirely written in TypeScript 3.0 since version `1.0.0`.

## Available Scripts

- `clean`: Deletes the compiled lib folder;
- `build`: Runs the clean script and compiles `src/**/*.(ts|x)` files to `lib/**/*.js`;
- `lint`: Runs tslint;
- `test`: Runs the test suites with jest;
- `test:watch`: Runs the tests in watch mode;
- `test:cov`: Runs the tests and displays coverage
- `test:ci`: Tests lint, and jest errors at once

## License

This project is [MIT](LICENSE) licensed.

## Contributing

Pull requests are welcome!
