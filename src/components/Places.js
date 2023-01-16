import {createContext, useContext} from 'react';
import PropTypes from 'prop-types';

import {useStateObject} from 'src/hooks/useStateObject';

const PlacesContext = createContext();
PlacesContext.displayName = 'PlacesContext'; // for React DevTools to show

export function Places({children, placeData}) {
  const [places, setPlaces] = useStateObject({
    ui: null,
    userData: placeData,
    selectedPlace: null,
    ripple: {
      diameter: null,
      positionLeft: null,
      positionTop: null,
    },
  });

  return (
    <PlacesContext.Provider value={{places, setPlaces}}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const context = useContext(PlacesContext);
  if (context === undefined) {
    throw new Error('usePlaces must be used within a <Places />'); // To give a meaninful error message when a compound component is wrongly used on its own
  }
  return context;
}

Places.propTypes = {
  children: PropTypes.node,
  placeData: PropTypes.array,
};
