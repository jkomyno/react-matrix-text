import * as React from 'react';
import {
  chunkify,
  getCharArray,
} from './utils';

export interface Props {
  /**
   * The number of columns of the resulting matrix.
   */
  columns?: number;

  /**
   * The callback prop which renders the rows of the resulting matrix.
   * It receives a `columns` array of React Components (the rendered columns)
   * and the index of the current row, and must return the wrapper component
   * for them.
   */
  renderColumn: (char: string, rowIndex: number, columnIndex: number) => JSX.Element;
  
  /**
   * The callback prop which renders the single columns of the resulting matrix.
   * It receives a `char` string as argument (the current character of the sentence)
   * and must return the wrapper component for it.
   */
  renderRow: (columns: JSX.Element[], rowIndex: number) => JSX.Element;

  /**
   * Sentence to split into the matrix.
   * Spaces will be removed, but punctuation marks will be kept.
   */
  sentence?: string;

  /**
   * Callback that should return the key to be applied to a certain row,
   * provided the array of characters to be rendered, and the index of the current row.
   * The default generated key has the pattern `row_${rowIndex}_${charsForRow.join('')}`.
   */
  getRowKey?: (charsForRow: string[], rowIndex: number) => string;

  /**
   * Callback that should return the key to be applied to a certain column,
   * provided the character to be rendered, the index of the current row, and the
   * index of the current column.
   * The default generated key has the pattern `column_${rowIndex}_${columnIndex}_${char}`.
   */
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
