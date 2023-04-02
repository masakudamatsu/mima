// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {PlaceDetailErrorMessage} from './PlaceDetailErrorMessage';

const mockProps = {
  status: '',
};

describe(`Display relevant error messages by prop value`, () => {
  test(`Default`, () => {
    const {container} = render(<PlaceDetailErrorMessage {...mockProps} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
  test(`OK`, () => {
    const {container} = render(<PlaceDetailErrorMessage status="OK" />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
  test(`ZERO_RESULTS`, () => {
    const {container} = render(
      <PlaceDetailErrorMessage status="ZERO_RESULTS" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    Google Maps server appears to be not operating correctly at this moment.
  </p>
  <p>
    Please try again. If you have seen this message for the second time, please contact us so we can fix the problem.
  </p>
</div>
`);
  });
  test(`INVALID_REQUEST`, () => {
    const {container} = render(
      <PlaceDetailErrorMessage status="INVALID_REQUEST" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    Google Maps server appears to be not operating correctly at this moment.
  </p>
  <p>
    Please try again. If you have seen this message for the second time, please contact us so we can fix the problem.
  </p>
</div>
`);
  });
  test(`NOT_FOUND`, () => {
    const {container} = render(<PlaceDetailErrorMessage status="NOT_FOUND" />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    Google Maps server appears to be not operating correctly at this moment.
  </p>
  <p>
    Please try again. If you have seen this message for the second time, please contact us so we can fix the problem.
  </p>
</div>
`);
  });
  test(`OVER_QUERY_LIMIT`, () => {
    const {container} = render(
      <PlaceDetailErrorMessage status="OVER_QUERY_LIMIT" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    My Ideal Map is currently unable to use Google Maps search.
  </p>
  <p>
    Please contact us so we can fix the problem.
  </p>
</div>
`);
  });
  test(`REQUEST_DENIED`, () => {
    const {container} = render(
      <PlaceDetailErrorMessage status="REQUEST_DENIED" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    My Ideal Map is currently unable to use Google Maps search.
  </p>
  <p>
    Please contact us so we can fix the problem.
  </p>
</div>
`);
  });
  test(`UNKNOWN_ERROR`, () => {
    const {container} = render(
      <PlaceDetailErrorMessage status="UNKNOWN_ERROR" />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
     Google Maps server is currently down. 
  </p>
  <p>
    <a
      href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
      rel="noreferrer"
      target="_blank"
    >
      Please check its status
    </a>
    , and try again once they fix the problem (usually within a few hours).
  </p>
</div>
`);
  });
  test(`Some random text`, () => {
    const crypto = require('crypto');
    const {container} = render(
      <PlaceDetailErrorMessage
        status={crypto.randomBytes(8).toString('hex')}
      />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
     Google Maps server is currently down. 
  </p>
  <p>
    <a
      href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
      rel="noreferrer"
      target="_blank"
    >
      Please check its status
    </a>
    , and try again once they fix the problem (usually within a few hours).
  </p>
</div>
`);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<PlaceDetailErrorMessage {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
