import * as React from 'react';
import {
  chunkify,
  getCharArray,
} from './utils';

export interface Props {
  columns?: number,
  sentence?: string,
  renderColumn: (char: string, rowIndex: number, columnIndex: number) => JSX.Element,
  renderRow: (columns: JSX.Element[], rowIndex: number) => JSX.Element,
  getRowKey?: (charsForRow: string[], rowIndex: number) => string;
  getColumnKey?: (char: string, rowIndex: number, columnIndex: number) => string;
};

class MatrixText extends React.Component<Props> {

  private static getColumnKeyDefault = (char: string, rowIndex: number, columnIndex: number): string =>
    `column_${rowIndex}_${columnIndex}_${char}`;

  private static getRowKeyDefault = (charsForRow: string[], rowIndex: number): string =>
    `row_${rowIndex}_${charsForRow.join('')}`;

  static defaultProps = {
    columns: 3,
    getColumnKey: MatrixText.getColumnKeyDefault,
    getRowKey: MatrixText.getRowKeyDefault,
    sentence: '',
  };

  public render() {
    return this.chunks.map(this.handleRenderRow);
  }

  private get chunks(): string[][] {
    const { columns, sentence } = this.props;
    return chunkify(
      getCharArray(sentence),
      columns,
    );
  }

  private handleRenderColumns = (charsForRow: string[], rowIndex: number): Array<React.ReactElement<any>> => {
    const { getColumnKey, renderColumn } = this.props;

    return charsForRow.map((char: string, columnIndex: number) => {
      const key = getColumnKey(char, rowIndex, columnIndex);
      return React.cloneElement(renderColumn(char, rowIndex, columnIndex), { key });
    });
  }

  private handleRenderRow = (charsForRow: string[], rowIndex: number): React.ReactElement<any> => {
    const { getRowKey, renderRow } = this.props;
    const key = getRowKey(charsForRow, rowIndex);
    const ColumnComponents = this.handleRenderColumns(charsForRow, rowIndex);
    
    return React.cloneElement(renderRow(ColumnComponents, rowIndex), { key });
  }
}

export default MatrixText;
