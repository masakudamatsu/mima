import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgFlightLanding = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="landing"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 24 24"
      width={dimension.button['minimum target size 75']}
    >
      <title id="landing">{title}</title>
      <path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z" />
      {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aflight_land%3A
       */}
    </svg>
  );
};

SvgFlightLanding.propTypes = {
  title: PropTypes.string,
};
