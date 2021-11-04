import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgFlightTakeoff} from './SvgFlightTakeoff';

const mockProps = {
  title: 'Search',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgFlightTakeoff {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgFlightTakeoff {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="takeoff"
    height="36px"
    role="img"
    viewBox="0 0 24 24"
    width="36px"
  >
    <title
      id="takeoff"
    >
      Search
    </title>
    <path
      d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgFlightTakeoff {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgFlightTakeoff {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
