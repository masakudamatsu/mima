import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SvgPlace} from './SvgPlace';

const mockProps = {};

test('sets the SVG image size explicitly', () => {
  render(<SvgPlace {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByTestId('svg')).toHaveAttribute('width');
  expect(screen.getByTestId('svg')).toHaveAttribute('height');
});

describe('SvgPlace component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<SvgPlace {...mockProps} />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-hidden="true"
    data-testid="svg"
    height="24px"
    style="margin-left: -4px; margin-right: -4px;"
    viewBox="0 0 24 24"
    width="24px"
  >
    <path
      d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
    />
  </svg>
</div>
`);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgPlace {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
