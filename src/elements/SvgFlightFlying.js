import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgFlightFlying = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="flying"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 24 24"
      width={dimension.button['minimum target size 75']}
    >
      <title id="flying">{title}</title>
      <path
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"
      />
      {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Sharp%3Aflight%3A
       */}
    </svg>
  );
};

SvgFlightFlying.propTypes = {
  title: PropTypes.string,
};
