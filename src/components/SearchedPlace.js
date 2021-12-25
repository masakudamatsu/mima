import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const SearchedPlace = ({mapObject}) => {
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    setPlaceId('ChIJfwxa4v-pAWARQ-R4_cVAgAc');
  }, []);

  useEffect(() => {
    if (!placeId) return;
    const google = window.google;
    const service = new google.maps.places.PlacesService(mapObject);
    const request = {
      placeId: placeId,
      fields: [
        'name',
        'geometry',
        'formatted_address',
        'url',
        'business_status',
      ],
    };
    service.getDetails(request, callback);
    function callback(place, status) {
      if (status === 'OK') {
        console.log(place);
      }
    }
  }, [mapObject, placeId]);

  return (
    <>
      <div></div>
    </>
  );
};

SearchedPlace.propTypes = {
  mapObject: PropTypes.object,
};
