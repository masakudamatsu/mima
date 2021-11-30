---
to: src/elements/<%= name %>.test.js
---
import {render} from '@testing-library/react';

import {<%= name %>} from './<%= name %>';

describe('<%= name %> component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<<%= name %> />);
    expect(container).toMatchInlineSnapshot();
  });
});
