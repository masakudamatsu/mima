import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgLogout = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="logout"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 48 48"
      width={dimension.button['minimum target size 75']}
    >
      <title id="logout">{title}</title>
      <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
      {/* source: https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Alogout%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048 */}
    </svg>
  );
};

SvgLogout.propTypes = {
  title: PropTypes.string,
};
