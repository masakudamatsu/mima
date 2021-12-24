// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchBox} from './SearchBox';

const mockProps = {};

test('Accessibility checks', async () => {
  // disable warning in console; see https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
  const {getComputedStyle} = window;
  window.getComputedStyle = elt => getComputedStyle(elt);

  const {container} = render(<SearchBox {...mockProps} />);
  const results = await axe(container, {
    rules: {
      tabindex: {enabled: false},
      // react-focus-lock uses tabindex=1, which violates "Elements should not have tabindex greater than zero (tabindex)"
      // for detail on the rule, see https://dequeuniversity.com/rules/axe/4.1/tabindex?application=axeAPI
    },
  });
  expect(results).toHaveNoViolations();
});
