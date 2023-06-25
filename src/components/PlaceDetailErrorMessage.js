import React from 'react';
import PropTypes from 'prop-types';

export const PlaceDetailErrorMessage = ({status}) => {
  // Docs on "status": https://developers.google.com/maps/documentation/javascript/reference/places-service#PlacesServiceStatus
  // TODO: #422 improve error messages
  return status === '' || status === 'OK' ? null : status === 'ZERO_RESULTS' ||
    status === 'INVALID_REQUEST' ||
    status === 'NOT_FOUND' ? (
    // TODO: #263 Include "Contact us" button
    // TODO: #468 Include Try Again button to fetch the place detail again
    <>
      <p>
        Google Maps server appears to be not operating correctly at this moment.
      </p>
      <p>
        Please try again. If you have seen this message for the second time,
        please contact us so we can fix the problem.
      </p>
    </>
  ) : status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED' ? (
    // TODO: #263 Include "Contact us" button
    <>
      <p>My Ideal Map is currently unable to use Google Maps search.</p>
      <p>Please contact us so we can fix the problem.</p>
    </>
  ) : (
    // This last case includes status === "UNKNOWN_ERROR"
    <>
      <p> Google Maps server is currently down. </p>
      <p>
        <a
          href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
          rel="noreferrer"
          target="_blank"
        >
          Please check its status
        </a>
        , and try again once they fix the problem (usually within a few hours).
      </p>
    </>
  );
};

PlaceDetailErrorMessage.propTypes = {
  status: PropTypes.string,
};
