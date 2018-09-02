import * as React from 'react';
import {
  chunkify,
  getCharArray,
} from './utils';

export interface Props {
  columns?: number,
  renderColumn: (char: string) => JSX.Element,
  renderRow: (columns: JSX.Element[]) => JSX.Element,
  sentence?: string,
};

class MatrixText extends React.Component<Props> {

  static defaultProps = {
    columns: 3,
    sentence: '',
  };

  public render() {
    return this.chunks.map(this.handleRenderRow);
  }

  private get chunks() {
    const { columns, sentence } = this.props;
    return chunkify(
      getCharArray(sentence),
      columns,
    );
  }

  private handleRenderRow = (charsForRow: string[]) => {
    const { renderColumn, renderRow } = this.props;
    const ColumnComponents = charsForRow.map(renderColumn);
    return renderRow(ColumnComponents);
  }
}

export default MatrixText;
