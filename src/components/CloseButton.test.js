// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {CloseButton} from './CloseButton';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  ariaLabel: 'Close',
  handleClick: jest.fn().mockName('handleClick'),
};

describe(`Clicking the button`, () => {
  beforeEach(() => {
    render(<CloseButton {...mockProps} />);
    userEvent.click(screen.getByRole('button', {name: mockProps.ariaLabel}));
  });
  test(`calls a function specified with handleClick prop`, () => {
    expect(mockProps.handleClick).toHaveBeenCalledTimes(1);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<CloseButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
