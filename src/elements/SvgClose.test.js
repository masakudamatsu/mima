import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgClose} from './SvgClose';

const mockProps = {
  title: 'Close search box',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgClose {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

test('renders UI correctly', () => {
  const {container} = render(<SvgClose {...mockProps} icon="add" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="close"
    height="36px"
    role="img"
    viewBox="0 0 24 24"
    width="36px"
  >
    <title
      id="close"
    >
      Close search box
    </title>
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    />
  </svg>
</div>
`);
});

test('has accessible name set by the title prop', () => {
  render(<SvgClose {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgClose {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
