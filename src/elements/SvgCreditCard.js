import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgCreditCard = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="credit-card"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 48 48"
      width={dimension.button['minimum target size 75']}
    >
      <title id="credit-card">{title}</title>
      <path d="M44 11v26q0 1.2-.9 2.1-.9.9-2.1.9H7q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1ZM7 16.45h34V11H7Zm0 6.45V37h34V22.9ZM7 37V11v26Z" />
      {/* source: https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acredit_card%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048 */}
    </svg>
  );
};

SvgCreditCard.propTypes = {
  title: PropTypes.string,
};
