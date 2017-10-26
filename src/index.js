// @flow
import * as React from 'react';
import {
  chunkify,
  getCharArray,
} from './utils';

type Props = {
  sentence: string,
  columns: number,
  renderRow: (cols: Array<React.ComponentType<{}>>) => React.ComponentType<>,
  renderCol: (c: string) => React.ComponentType<{}>,
};

const MatrixText = ({ sentence, columns, renderRow, renderCol }: Props) =>
  chunkify(
    getCharArray(sentence),
    columns,
  ).map(row => renderRow(row.map(renderCol)));

MatrixText.defaultProps = {
  sentence: '',
  columns: 3,
  renderRow: cols => <div className="row">{cols}</div>,
  renderCol: char => <span>{char}</span>,
};

export default MatrixText;
