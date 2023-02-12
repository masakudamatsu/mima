import React from 'react';
import PropTypes from 'prop-types';

import {DivAlertSearch} from 'src/elements/DivAlertSearch';
import {searchBoxLabel} from 'src/utils/uiCopies';

export const SearchErrorMessage = ({status}) => {
  // Docs on "status": https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesServiceStatus
  // TODO: #422 improve error messages
  return status === '' || status === 'OK' ? null : (
    <DivAlertSearch role="alert">
      {status === 'ZERO_RESULTS' ||
      status === 'INVALID_REQUEST' ||
      status === 'NOT_FOUND' ? (
        <p>{searchBoxLabel.noResult}</p>
      ) : status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED' ? (
        // TODO: #263 Include "Contact us" button
        <p>
          My Ideal Map is currently unable to use Google Maps search. Please
          contact us so we can fix the problem.
        </p>
      ) : (
        // This last case includes status === "UNKNOWN_ERROR"
        <p>
          {' '}
          Google Maps server is currently down.{' '}
          <a
            href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
            rel="noreferrer"
            target="_blank"
          >
            Please check its status
          </a>
          , and try again once they fix the problem (usually within a few
          hours).
        </p>
      )}
    </DivAlertSearch>
  );
};

SearchErrorMessage.propTypes = {
  status: PropTypes.string,
};
