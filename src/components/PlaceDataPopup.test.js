import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {PlaceDataPopup} from './PlaceDataPopup';

const mockTitle = 'Mock Title';
const mockProps = {
  children: <h1 id="mock-title">{mockTitle}</h1>,
  titleId: 'mock-title',
  // setPlaceDataPopupHidden: jest.fn().mockName('setPlaceDataPopupHidden'),
};

describe('PlaceDataPopup component', () => {
  test('toggles visibility with hidden prop', () => {
    const {rerender} = render(<PlaceDataPopup {...mockProps} hidden />);
    expect(screen.getByRole('dialog', {hidden: true})).not.toBeVisible();
    rerender(<PlaceDataPopup {...mockProps} hidden={false} />);
    expect(screen.getByRole('dialog', {hidden: true})).toBeVisible();
  });
  test('has accessible name specified with titleId prop', () => {
    const {rerender} = render(<PlaceDataPopup {...mockProps} />);
    expect(screen.getByRole('heading')).toHaveTextContent(mockTitle);
    rerender(
      <PlaceDataPopup {...mockProps} titleId="new-title">
        <h1 id="new-title">New Mock Title</h1>
      </PlaceDataPopup>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('New Mock Title');
  });
  test('sets data-slide-from attribute value with slideFrom prop', () => {
    const {rerender} = render(
      <PlaceDataPopup {...mockProps} slideFrom="left" />,
    );
    expect(screen.getByRole('document')).toHaveAttribute(
      'data-slide-from',
      'left',
    );
    rerender(<PlaceDataPopup {...mockProps} slideFrom="right" />);
    expect(screen.getByRole('document')).toHaveAttribute(
      'data-slide-from',
      'right',
    );
  });
  test('renders child elements', () => {
    const mockContent = 'Mock content';
    const {rerender} = render(
      <PlaceDataPopup {...mockProps}>
        <p>{mockContent}</p>
      </PlaceDataPopup>,
    );
    expect(screen.getByText(mockContent)).toBeVisible();
    const mockHeading = 'Mock heading';
    rerender(
      <PlaceDataPopup {...mockProps}>
        <h2>{mockHeading}</h2>
      </PlaceDataPopup>,
    );
    expect(screen.getByRole('heading', {name: mockHeading})).toBeVisible();
  });
});
test('Accessibility checks', async () => {
  const {container} = render(<PlaceDataPopup {...mockProps} />);
  const results = await axe(container, {
    rules: {
      tabindex: {enabled: false},
      // react-focus-lock uses tabindex=1, which violates "Elements should not have tabindex greater than zero (tabindex)"
      // for detail on the rule, see https://dequeuniversity.com/rules/axe/4.1/tabindex?application=axeAPI
    },
  });
  expect(results).toHaveNoViolations();
});
