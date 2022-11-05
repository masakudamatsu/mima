import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgDeleteForever} from './SvgDeleteForever';

const mockProps = {
  title: 'Delete Forever',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgDeleteForever {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgDeleteForever {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="delete-forever"
    height="36px"
    role="img"
    viewBox="0 0 48 48"
    width="36px"
  >
    <title
      id="delete-forever"
    >
      Delete Forever
    </title>
    <path
      d="M18.05 33.05 24 27l6 6.05 2.35-2.4-5.95-6.05 5.95-6.05-2.35-2.4-6 6.05-5.95-6.05-2.4 2.4 6 6.05-6 6.05Zm-5 8.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-21.9 0V39Z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgDeleteForever {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgDeleteForever {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
