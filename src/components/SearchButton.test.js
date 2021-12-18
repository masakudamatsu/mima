// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {SearchButton} from './SearchButton';
import {buttonLabel} from 'src/utils/uiCopies';

const accessibleName = buttonLabel.search;
const mockProps = {
  setSearchBoxOpen: jest.fn().mockName('setSearchBoxOpen'),
};

describe('HTML checks', () => {
  beforeEach(() => {
    render(<SearchButton {...mockProps} />);
  });
  test(`sets the type attribute to be "button"`, () => {
    expect(screen.getByRole('button', {name: accessibleName})).toHaveAttribute(
      'type',
      'button',
    );
  });
});

describe('Clicking the button', () => {
  beforeEach(() => {
    render(<SearchButton {...mockProps} />);
    userEvent.click(screen.getByRole('button', {name: buttonLabel.search}));
  });
  test(`calls a function specified with setSearchBoxOpen prop`, () => {
    expect(mockProps.setSearchBoxOpen).toHaveBeenCalledTimes(1);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<SearchButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
