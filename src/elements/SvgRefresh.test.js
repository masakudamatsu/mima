import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgRefresh} from './SvgRefresh';

const mockProps = {
  title: 'Delete Forever',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgRefresh {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgRefresh {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="refresh"
    height="36px"
    role="img"
    viewBox="0 0 48 48"
    width="36px"
  >
    <title
      id="refresh"
    >
      Delete Forever
    </title>
    <path
      d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgRefresh {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgRefresh {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
