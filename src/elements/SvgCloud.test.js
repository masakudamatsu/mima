import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import SvgCloud from './SvgCloud';

const mockProps = {
  icon: 'menu',
  title: 'mock accessible name',
};

test('sets the SVG image size explicitly', () => {
  render(<SvgCloud {...mockProps} />);
  // Otherwise Safari fails to render the SVG image as a button label
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'width',
  );
  expect(screen.getByRole('img', {name: mockProps.title})).toHaveAttribute(
    'height',
  );
});

describe('renders UI with each prop correctly', () => {
  test(`icon="add"`, () => {
    const {container} = render(<SvgCloud {...mockProps} icon="add" />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="add"
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id="add"
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
    <polygon
      id="material-icon-add"
      points="31.6666667 21.6666667 21.6666667 21.6666667 21.6666667 31.6666667 18.3333333 31.6666667 18.3333333 21.6666667 8.33333333 21.6666667 8.33333333 18.3333333 18.3333333 18.3333333 18.3333333 8.33333333 21.6666667 8.33333333 21.6666667 18.3333333 31.6666667 18.3333333"
      transform="translate(8.000000, 4.000000)"
    />
  </svg>
</div>
`);
  });
  test(`icon="flightLanding"`, () => {
    const {container} = render(
      <SvgCloud {...mockProps} icon="flightLanding" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="flightLanding"
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id="flightLanding"
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
    <path
      d="M3.75,28.5 L32.25,28.5 L32.25,31.5 L3.75,31.5 L3.75,28.5 Z M29.01,23.775 C30.21,24.09 31.44,23.385 31.77,22.185 C32.085,20.985 31.38,19.755 30.18,19.425 L22.215,17.295 L18.075,3.765 L15.18,3 L15.18,15.42 L7.725,13.425 L6.33,9.945 L4.155,9.36 L4.155,17.115 L29.01,23.775 Z"
      id="material-icon-flight-land"
      transform="translate(10.000000, 6.000000)"
    />
  </svg>
</div>
`);
  });
  test(`icon="flightTakeoff"`, () => {
    const {container} = render(
      <SvgCloud {...mockProps} icon="flightTakeoff" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="flightTakeoff"
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id="flightTakeoff"
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
    <path
      d="M3.125,23.75 L26.875,23.75 L26.875,26.25 L3.125,26.25 L3.125,23.75 Z M27.5875,12.05 C27.325,11.05 26.2875,10.45 25.2875,10.725 L18.65,12.5 L10.025,4.4625 L7.6125,5.1 L12.7875,14.0625 L6.575,15.725 L4.1125,13.8 L2.3,14.2875 L5.5375,19.9 L26.25,14.3625 C27.2625,14.075 27.85,13.05 27.5875,12.05 Z"
      id="material-icon-flight-takeoff"
      transform="translate(13.000000, 9.000000)"
    />
  </svg>
</div>
`);
  });
  test(`icon="menu"`, () => {
    const {container} = render(<SvgCloud {...mockProps} />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="menu"
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id="menu"
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
    <path
      d="M4.5,27 L31.5,27 L31.5,24 L4.5,24 L4.5,27 Z M4.5,19.5 L31.5,19.5 L31.5,16.5 L4.5,16.5 L4.5,19.5 Z M4.5,9 L4.5,12 L31.5,12 L31.5,9 L4.5,9 Z"
      id="material-icon-menu"
      transform="translate(10.000000, 6.000000)"
    />
  </svg>
</div>
`);
  });
  test(`icon="search"`, () => {
    const {container} = render(<SvgCloud {...mockProps} icon="search" />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby="search"
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id="search"
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
    <path
      d="M23.25,21 L22.065,21 L21.645,20.595 C23.115,18.885 24,16.665 24,14.25 C24,8.865 19.635,4.5 14.25,4.5 C8.865,4.5 4.5,8.865 4.5,14.25 C4.5,19.635 8.865,24 14.25,24 C16.665,24 18.885,23.115 20.595,21.645 L21,22.065 L21,23.25 L28.5,30.735 L30.735,28.5 L23.25,21 Z M14.25,21 C10.515,21 7.5,17.985 7.5,14.25 C7.5,10.515 10.515,7.5 14.25,7.5 C17.985,7.5 21,10.515 21,14.25 C21,17.985 17.985,21 14.25,21 Z"
      id="material-icon-search"
      transform="translate(10.000000, 6.000000)"
    />
  </svg>
</div>
`);
  });
  test(`icon prop not specified`, () => {
    const {container} = render(<SvgCloud {...mockProps} icon="" />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <svg
    aria-labelledby=""
    height="48px"
    role="img"
    viewBox="0 0 56 48"
    width="56px"
  >
    <title
      id=""
    >
      mock accessible name
    </title>
    <path
      d="M45.4620546,13.6147645 C51.6790144,16.4506152 56,22.7206975 56,30 C56,39.9411255 47.9411255,48 38,48 C32.9385058,48 28.3649488,45.9108926 25.09456,42.5479089 C22.9175971,43.482463 20.5192372,44 18,44 C8.0588745,44 0,35.9411255 0,26 C0,17.9805361 5.24437759,11.1859622 12.4906291,8.85878199 C15.6225135,3.55654277 21.3959192,0 28,0 C36.428553,0 43.5040602,5.79307725 45.4620546,13.6147645 Z"
      id="cloud"
    />
  </svg>
</div>
`);
  });
});

test('has accessible name set by the title prop', () => {
  render(<SvgCloud {...mockProps} />);
  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});

test('Accessibility checks', async () => {
  const {container} = render(<SvgCloud {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
