import {createContext, useMemo, useState} from 'react';

export const PlaceIdContext = createContext();

export function PlaceIdProvider({initialPlaceId = '', ...props}) {
  const [placeId, setPlaceId] = useState(initialPlaceId);
  const value = useMemo(() => [placeId, setPlaceId], [placeId]);
  return <PlaceIdContext.Provider value={value} {...props} />;
}
