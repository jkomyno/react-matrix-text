/* tslint:disable */
import { shallow } from 'enzyme';
import * as React from 'react';
// @ts-ignore
import * as trim from 'string.prototype.trim'; // imported in enzyme
import MatrixText, { Props } from '../../src/index';

const setup = (columns = 3, sentence = 'THIS IS CORE MEDIA') => {
  const renderRow = (columns: JSX.Element[], rowIndex: number) => <div className="row">{columns}</div>;
  const renderColumn = (char: string, rowIndex: number, columnIndex?: number) => <span className="column">{char}</span>;
  const props = {
    columns,
    renderColumn,
    renderRow,
    sentence,
  } as Props;
  const wrapper = shallow(<MatrixText {...props} />)

  return {
    props,
    wrapper,
  };
}

describe('MatrixText', () => {
  it('Should render', () => {
    const { props, wrapper } = setup();

    expect(wrapper.find('div.row').exists()).toBe(true);
  });

  it('Should render 5 rows with 3 columns each with the sentence "THIS IS CORE MEDIA"', () => {
    const { props, wrapper } = setup();

    expect(wrapper.find('.row').length).toBe(5);
  });

  it('Should add the default keys when the getter keys are missing', () => {
    const { props, wrapper } = setup();

    expect(wrapper.find('.row').map((rowWrapper, i) =>
      rowWrapper.key()
    )).toEqual([
      'row_0_THI',
      'row_1_SIS',
      'row_2_COR',
      'row_3_EME',
      'row_4_DIA'
    ]);

    expect(wrapper.find('.row > span').map((rowWrapper, i) =>
      rowWrapper.key()
    )).toEqual([
      'column_0_0_T',
      'column_0_1_H',
      'column_0_2_I',
      'column_1_0_S',
      'column_1_1_I',
      'column_1_2_S',
      'column_2_0_C',
      'column_2_1_O',
      'column_2_2_R',
      'column_3_0_E',
      'column_3_1_M',
      'column_3_2_E',
      'column_4_0_D',
      'column_4_1_I',
      'column_4_2_A'
    ]);
  });

  it ('Should render the sentence in with the column restraints', () => {
    const { props, wrapper } = setup();

    /**
     * One-liner method needed to simulate the same HTML minification that happens
     * inside the enzyme package when `html()` is called.
     */
    const replaceHTMLSpace = (strings: TemplateStringsArray) => strings.join('').split('\n').map(trim).join('');

    expect(wrapper.map((rowWrapper, i) => {
      return rowWrapper.html();
    })).toEqual([
      replaceHTMLSpace`
      <div class="row">
        <span class="column">T</span>
        <span class="column">H</span>
        <span class="column">I</span>
      </div>
      `,
      replaceHTMLSpace`
      <div class="row">
        <span class="column">S</span>
        <span class="column">I</span>
        <span class="column">S</span>
      </div>
      `,
      replaceHTMLSpace`
      <div class="row">
        <span class="column">C</span>
        <span class="column">O</span>
        <span class="column">R</span>
      </div>
      `,
      replaceHTMLSpace`
      <div class="row">
        <span class="column">E</span>
        <span class="column">M</span>
        <span class="column">E</span>
      </div>
      `,
      replaceHTMLSpace`
      <div class="row">
        <span class="column">D</span>
        <span class="column">I</span>
        <span class="column">A</span>
      </div>
      `,
    ]);
  });
});
