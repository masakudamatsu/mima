import React from 'react';
import PropTypes from 'prop-types';

import {DivAlertSearch} from 'src/elements/DivAlertSearch';
import {searchBoxLabel} from 'src/utils/uiCopies';

export const SearchErrorMessage = ({status}) => {
  // Docs on "status": https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesServiceStatus
  return status === '' || status === 'OK' ? null : (
    <DivAlertSearch role="alert">
      {status === 'ZERO_RESULTS' ||
      status === 'INVALID_REQUEST' ||
      status === 'NOT_FOUND' ? (
        <p>{searchBoxLabel.noResult}</p>
      ) : status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED' ? (
        <p>{searchBoxLabel.appError}</p>
      ) : (
        // This last case includes status === "UNKNOWN_ERROR"
        <p>{searchBoxLabel.serverError}</p>
      )}
    </DivAlertSearch>
  );
};

SearchErrorMessage.propTypes = {
  status: PropTypes.string,
};
