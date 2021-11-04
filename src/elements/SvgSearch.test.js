import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgSearch} from './SvgSearch';

const mockProps = {
  title: 'Search',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgSearch {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgSearch {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="search"
    height="36px"
    role="img"
    viewBox="0 0 24 24"
    width="36px"
  >
    <title
      id="search"
    >
      Search
    </title>
    <path
      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgSearch {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgSearch {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
