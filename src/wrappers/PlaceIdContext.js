import {createContext, useMemo, useState} from 'react';

export const PlaceIdContext = createContext();

export function PlaceIdProvider({initialPlaceId = '', ...props}) {
  const [placeId, setPlaceId] = useState(initialPlaceId);
  const value = useMemo(() => [placeId, setPlaceId], [placeId]); // see https://github.com/kentcdodds/react-performance/blob/main/src/exercise/05.md
  return <PlaceIdContext.Provider value={value} {...props} />;
}
