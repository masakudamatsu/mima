import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgLogout} from './SvgLogout';

const mockProps = {
  title: 'Logout',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgLogout {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgLogout {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="logout"
    height="36px"
    role="img"
    viewBox="0 0 48 48"
    width="36px"
  >
    <title
      id="logout"
    >
      Logout
    </title>
    <path
      d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgLogout {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgLogout {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
