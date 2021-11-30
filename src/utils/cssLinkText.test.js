import React from 'react';
import styled from 'styled-components';
import {render, screen} from '@testing-library/react';

import {cssLinkText} from './cssLinkText';

const inputs = {
  backgroundColor: '#000000',
  backgroundColorOnHover: '#aaaaaa',
  linkTextColor: '#ffffff',
  baselinePosition: 20,
  underlineWidth: 1,
  spaceBelowBaseline: 1,
};

test('applies CSS declarations as expected', () => {
  const MockComponent = styled.a`
    ${cssLinkText(inputs)}
  `;

  const {container} = render(<MockComponent data-testid="mock-component" />);

  expect(container).toMatchInlineSnapshot(`
.c0:link,
.c0:visited {
  background: #aaaaaa;
  background: linear-gradient( to bottom, currentColor 100%, currentColor );
  background-position: 0 1.3125rem;
  background-repeat: no-repeat;
  background-size: 100% 1px;
  color: #ffffff;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
  text-shadow: 0.03em 0 #000000,-0.03em 0 #000000, 0 0.03em #000000,0 -0.03em #000000;
}

.c0:focus,
.c0:hover {
  background: #aaaaaa;
  outline: none;
  text-shadow: none;
}

.c0:active {
  background: none;
}

.c0:visited:focus,
.c0:visited:hover {
  background: #aaaaaa;
  outline: none;
  text-shadow: none;
}

.c0:visited:active {
  background: none;
}

<div>
  <a
    class="c0"
    data-testid="mock-component"
  />
</div>
`);
});

test('changes the underline color by the underlineColor prop value', () => {
  const newInputs = {
    ...inputs,
    underlineColor: 'rgb(200, 200, 200)',
  };
  const UpdatedComponent = styled.a`
    ${cssLinkText(newInputs)}
  `;
  render(<UpdatedComponent data-testid="mock-component" />);
  expect(screen.getByTestId('mock-component')).toHaveStyle(`
    background: linear-gradient( to bottom, ${newInputs.underlineColor} 100%, ${newInputs.underlineColor} );
  `);
});
