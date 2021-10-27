import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {ModalPopup} from './ModalPopup';

const mockTitle = 'Mock Title';
const mockProps = {
  children: <h1 id="mock-title">{mockTitle}</h1>,
  titleId: 'mock-title',
  // setModalPopupHidden: jest.fn().mockName('setModalPopupHidden'),
};

describe('ModalPopup component', () => {
  test('toggles visibility with hidden prop', () => {
    const {rerender} = render(<ModalPopup {...mockProps} hidden />);
    expect(screen.getByRole('dialog', {hidden: true})).not.toBeVisible();
    rerender(<ModalPopup {...mockProps} hidden={false} />);
    expect(screen.getByRole('dialog', {hidden: true})).toBeVisible();
  });
  test('has accessible name specified with titleId prop', () => {
    const {rerender} = render(<ModalPopup {...mockProps} />);
    expect(screen.getByRole('heading')).toHaveTextContent(mockTitle);
    rerender(
      <ModalPopup {...mockProps} titleId="new-title">
        <h1 id="new-title">New Mock Title</h1>
      </ModalPopup>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('New Mock Title');
  });
  test('renders child elements', () => {
    const mockContent = 'Mock content';
    const {rerender} = render(
      <ModalPopup {...mockProps}>
        <p>{mockContent}</p>
      </ModalPopup>,
    );
    expect(screen.getByText(mockContent)).toBeVisible();
    const mockHeading = 'Mock heading';
    rerender(
      <ModalPopup {...mockProps}>
        <h2>{mockHeading}</h2>
      </ModalPopup>,
    );
    expect(screen.getByRole('heading', {name: mockHeading})).toBeVisible();
  });
  test.skip('calls setModalPopupHidden(true) when the close button is clicked', () => {
    render(<ModalPopup {...mockProps} />);
    userEvent.click(screen.getByRole('button', {name: 'Close dialog'}));
    expect(mockProps.setModalPopupHidden).toHaveBeenCalledTimes(1);
    expect(mockProps.setModalPopupHidden).toHaveBeenCalledWith(true);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<ModalPopup {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
