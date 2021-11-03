import PropTypes from 'prop-types';

import {dimension} from 'src/utils/designtokens';

export const SvgAdd = ({title}) => {
  return (
    <svg
      role="img"
      aria-labelledby="add"
      height={dimension.button['minimum target size 75']}
      viewBox="0 0 24 24"
      width={dimension.button['minimum target size 75']}
    >
      <title id="add">{title}</title>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />{' '}
      {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aadd%3A 
      */}
    </svg>
  );
};

SvgAdd.propTypes = {
  title: PropTypes.string,
};
