// import PropTypes from 'prop-types';

import {svgPlace} from 'src/utils/designtokens';

export const SvgPlace = () => {
  return (
    <svg
      aria-hidden="true"
      data-testid="svg" // used in SvgPlace.test.js
      height={svgPlace.heightOuter}
      style={{
        marginLeft: `-${svgPlace.marginLeft}`,
        marginRight: `-${svgPlace.marginRight}`,
      }} // trim whitespace
      viewBox="0 0 24 24"
      width={svgPlace.widthOuter}
    >
      <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
      {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aplace%3A */}
    </svg>
  );
};

// SvgPlace.propTypes = {};
