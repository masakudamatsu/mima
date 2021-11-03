import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgFlightTakeoff = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="takeoff"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 24 24"
      width={dimension.button['minimum target size 75']}
    >
      <title id="takeoff">{title}</title>
      <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z" />
      {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aflight_takeoff%3A
       */}
    </svg>
  );
};

SvgFlightTakeoff.propTypes = {
  title: PropTypes.string,
};
