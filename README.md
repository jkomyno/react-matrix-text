# react-matrix-text

Small ReactJS component that renders a text in rows and columns

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

## This solution

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
- [Typings](#typings)
- [Available scripts](#available-scripts)
- [Related Projects](#related-projects)
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

### sentence

> `string` | defaults to `''`

Sentence to split into a matrix. Spaces (' ') will be removed.

### columns

> `number` | defaults to `3`

This is the number of columns of the resulting matrix.

### renderRow

> `(cols: Array<React.ComponentType<{}>>) => React.ComponentType<>` | defaults to `(cols) => <div className="row">{cols}</div>`

This is the callback prop which renders the rows of the resulting matrix. It receives a `cols` array of React Components (the rendered columns) and has to return the wrapper for them.

### renderCol

> `(c: string) => React.ComponentType<{}>` | defaults to: `(char) => <span>{char}</span>`

This is the callback prop which renders the single columns of the resulting matrix. It receives a `char` as argument (the current character of the sentence) and has to return the wrapper for it.

## Example

An example React app which uses this module is located in the [example folder](/example).

## Typings

This project uses Flow as its type system. It automatically exports *.flow files, but not *.ts. If you do know
how to automatically export TypeScript bindings without writing the same types twice, please let me know by
opening a Pull Request.

## Available Scripts

- `clean`: Deletes the compiled lib folder;
- `build`: Runs the clean script, transpiles the code with babel to the lib folder and copies the flow references;
- `build:watch`: Runs the build script in watch mode
- `lint`: Runs eslint
- `flow`: Verifies if there are flow errors;
- `test`: Runs the test suites with jest;
- `test:watch`: Runs the tests in watch mode;
- `test:cov`: Runs the tests and displays coverage
- `test:ci`: Tests lint, flow, and jest errors

You can build your own light version of setting the env.targets property in .babelrc to `"node": "current"`.
The version deployed to npm requires NodeJS 6.0.0.

## License

This project is [MIT](LICENSE) licensed.

## Contributing

Pull requests are welcome!
