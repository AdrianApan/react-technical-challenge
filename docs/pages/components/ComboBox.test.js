import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent, screen } from 'test/utils';
import ComboBox from './ComboBox';

const MOCK_OPTIONS = ['foo', 'bar'];
/**
 * You can run these tests with `yarn t ComboBox`.
 */
describe('<ComboBox />', () => {
  const render = createClientRender();

  it('should accept any input value', () => {
    render(<ComboBox options={MOCK_OPTIONS} />);
    const textbox = screen.getByRole('combobox');
    textbox.focus();
    fireEvent.change(textbox, { target: { value: 'foo' } });
    expect(textbox).to.have.attribute('value', 'foo');
  });

  it('should open the suggestions list on user input', () => {
    const { getByRole } = render(<ComboBox options={MOCK_OPTIONS} />);
    const textbox = getByRole('combobox');
    textbox.focus();
    fireEvent.change(textbox, { target: { value: 'foo' } });
    const listbox = getByRole('listbox');
    expect(listbox).to.have.attribute('id', 'countries');
  });

  it("should show 'no suggestion' message on no matching suggestion", () => {
    const { getByRole } = render(<ComboBox options={MOCK_OPTIONS} />);
    const textbox = getByRole('combobox');
    textbox.focus();
    fireEvent.change(textbox, { target: { value: 'foobar' } });
    const noResults = screen.getByTestId('no-results');
    expect(noResults).to.contain.html('<em>No suggestions available.</em>');
  });

  it('should correctly set aria-activedescendant prop on option selection', () => {
    const { getAllByRole } = render(<ComboBox options={MOCK_OPTIONS} />);
    const textbox = screen.getByRole('combobox');
    textbox.focus();
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open the popup
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // focus the first option
    const options = getAllByRole('option');
    expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));
  });

  it('should select the correct option', () => {
    const { getByRole } = render(<ComboBox options={MOCK_OPTIONS} />);
    const textbox = getByRole('combobox');
    textbox.focus();
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open the popup
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // focus the first option
    fireEvent.keyDown(textbox, { key: 'Enter' }); // select the first option
    expect(textbox).to.have.attribute('value', 'foo');
  });
});
