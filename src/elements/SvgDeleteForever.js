import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgDeleteForever = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="delete-forever"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 48 48"
      width={dimension.button['minimum target size 75']}
    >
      <title id="delete-forever">{title}</title>
      <path d="M18.05 33.05 24 27l6 6.05 2.35-2.4-5.95-6.05 5.95-6.05-2.35-2.4-6 6.05-5.95-6.05-2.4 2.4 6 6.05-6 6.05Zm-5 8.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-21.9 0V39Z" />
      {/* source: https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Adelete_forever%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048 */}
    </svg>
  );
};

SvgDeleteForever.propTypes = {
  title: PropTypes.string,
};
