// .storybook/preview.js
import './globalstyle.css';

// Default setting
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Wrapper DIV
export const decorators = [
  Story => (
    <div
      style={{
        border: '1px solid black',
        borderRadius: 16,
        height: 568,
        position: 'relative',
        width: 320,
      }}
    >
      <Story />
    </div>
  ),
];
