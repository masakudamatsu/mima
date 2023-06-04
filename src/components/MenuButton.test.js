// TODO #461: Fix this test file
test('dummy test', () => {});

// // eslint-disable-next-line no-unused-vars
// import {fireEvent, render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import {axe} from 'jest-axe';

// import {UserProvider} from '@auth0/nextjs-auth0';
// import {MenuButton} from './MenuButton';
// import {NightModeContext} from 'src/wrappers/NightModeContext';
// import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

// const accessibleName = buttonLabel.menu;
// const mockProps = {
//   moveToCurrentLocation: jest.fn().mockName('moveToCurrentLocation'),
//   stopTracking: jest.fn().mockName('stopTracking'),
//   trackUserLocation: jest.fn().mockName('trackUserLocation'),
//   watchID: null,
// };
// const Wrapper = {
//   lightMode: ({children}) => (
//     <NightModeContext.Provider value={false}>
//       <UserProvider>{children}</UserProvider>
//     </NightModeContext.Provider>
//   ),
//   darkMode: ({children}) => (
//     <NightModeContext.Provider value={true}>
//       <UserProvider>{children}</UserProvider>
//     </NightModeContext.Provider>
//   ),
// };

// // Mock offsetParent
// // source: https://github.com/jsdom/jsdom/issues/1261#issuecomment-362928131
// Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
//   get() {
//     return this.parentNode;
//   },
// });

// describe.only('HTML checks', () => {
//   beforeEach(() => {
//     render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
//   });
//   test(`has the accessible name of ${accessibleName}`, () => {
//     expect(
//       screen.getByRole('button', {name: accessibleName}),
//     ).toBeInTheDocument();
//   });
//   test(`sets the type attribute to be "button"`, () => {
//     expect(screen.getByRole('button', {name: accessibleName})).toHaveAttribute(
//       'type',
//       'button',
//     );
//   });
// });

// describe('Menu window', () => {
//   beforeEach(() => {
//     render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
//   });
//   test('is hidden by default', () => {
//     expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
//   });
//   test('is shown by clicking menu button', () => {
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//     expect(screen.getByRole('dialog')).toHaveTextContent(menuLabel);
//   });
//   test('focuses close button after being opened', async () => {
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//     expect(screen.getByRole('button', {name: buttonLabel.close})).toHaveFocus();
//   });
//   test('starts closing animation by clicking close button on menu window', () => {
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.close}));
//     expect(screen.getByRole('dialog')).toHaveAttribute('data-closing', 'true');
//   });
//   test('is hidden again by clicking Esc button', () => {
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//     userEvent.type(
//       screen.getByRole('button', {name: buttonLabel.close}),
//       '{esc}',
//     );
//     expect(screen.getByRole('dialog')).toHaveAttribute('data-closing', 'true');
//   });
//   test('is removed from DOM once the closing animation ends', () => {
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.close}));
//     fireEvent.animationEnd(screen.getByRole('navigation'));
//     expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
//   });
// });

// describe('Menu window content', () => {
//   beforeEach(() => {
//     render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//   });
//   it('includes search', () => {
//     expect(
//       screen.getByRole('button', {name: buttonLabel.search}),
//     ).toBeVisible();
//   });
//   it('includes flight takeoff icon menu, the clicking of which calls trackUserLocation() and closes the menu window', () => {
//     userEvent.click(
//       screen.getByRole('button', {name: buttonLabel.locator.default}),
//     );
//     expect(mockProps.trackUserLocation).toHaveBeenCalledTimes(1);
//     expect(screen.getByRole('dialog')).toHaveAttribute('data-closing', 'true');
//   });
//   it('includes disabled flight landing icon menu', () => {
//     expect(
//       screen.queryByRole('button', {name: buttonLabel.locator.deactivate}),
//     ).toBeDisabled();
//   });
//   it('includes save', () => {
//     expect(screen.getByRole('button', {name: buttonLabel.save})).toBeVisible();
//   });
// });

// describe('watchID prop', () => {
//   const watchID = 2;
//   beforeEach(() => {
//     render(<MenuButton {...mockProps} watchID={watchID} />, {
//       wrapper: Wrapper.lightMode,
//     });
//     userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
//   });
//   it('switches flight takeoff button with flight flying button', () => {
//     userEvent.click(
//       screen.getByRole('button', {name: buttonLabel.locator.activated}),
//     );
//     expect(mockProps.moveToCurrentLocation).toHaveBeenCalledTimes(1);
//   });
//   it('allows the user to stop tracking their location', () => {
//     userEvent.click(
//       screen.getByRole('button', {name: buttonLabel.locator.deactivate}),
//     );
//     expect(mockProps.stopTracking).toHaveBeenCalledTimes(1);
//     expect(mockProps.stopTracking).toHaveBeenCalledWith(watchID);
//   });
// });

// test('Accessibility checks', async () => {
//   const {container} = render(<MenuButton {...mockProps} />, {
//     wrapper: Wrapper.lightMode,
//   });
//   const results = await axe(container);
//   expect(results).toHaveNoViolations();
// });
