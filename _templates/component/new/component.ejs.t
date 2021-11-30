---
to: src/components/<%= name %>.js
---
import React from 'react';
// import PropTypes from 'prop-types';

export const <%= name %> = ({children}) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

// <%= name %>.propTypes = {};


