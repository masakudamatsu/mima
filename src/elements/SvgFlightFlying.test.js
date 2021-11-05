import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgFlightFlying} from './SvgFlightFlying';

const mockProps = {
  title: 'Search',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgFlightFlying {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgFlightFlying {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="flying"
    height="36px"
    role="img"
    viewBox="0 0 24 24"
    width="36px"
  >
    <title
      id="flying"
    >
      Search
    </title>
    <path
      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgFlightFlying {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgFlightFlying {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
