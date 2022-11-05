import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgCreditCard} from './SvgCreditCard';

const mockProps = {
  title: 'Credit Card',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgCreditCard {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgCreditCard {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="credit-card"
    height="36px"
    role="img"
    viewBox="0 0 48 48"
    width="36px"
  >
    <title
      id="credit-card"
    >
      Credit Card
    </title>
    <path
      d="M44 11v26q0 1.2-.9 2.1-.9.9-2.1.9H7q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1ZM7 16.45h34V11H7Zm0 6.45V37h34V22.9ZM7 37V11v26Z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgCreditCard {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgCreditCard {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
