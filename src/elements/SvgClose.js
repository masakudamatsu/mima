import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgClose = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="close"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 24 24"
      width={dimension.button['minimum target size 75']}
    >
      <title id="close">{title}</title>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
      {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aclose%3A */}
    </svg>
  );
};

SvgClose.propTypes = {
  title: PropTypes.string.isRequired,
};
