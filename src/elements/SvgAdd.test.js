import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgAdd} from './SvgAdd';

const mockProps = {
  title: 'Search',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgAdd {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgAdd {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="add"
    height="36px"
    role="img"
    viewBox="0 0 24 24"
    width="36px"
  >
    <title
      id="add"
    >
      Search
    </title>
    <path
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    />
     
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgAdd {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgAdd {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
