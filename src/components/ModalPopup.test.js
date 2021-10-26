import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {ModalPopup} from './ModalPopup';

const mockProps = {
  setModalPopupHidden: jest.fn().mockName('setModalPopupHidden'),
};

describe('ModalPopup component', () => {
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
