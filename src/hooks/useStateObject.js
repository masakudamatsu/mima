import {useReducer} from 'react';

const reducer = (state, action) => ({...state, ...action});

export const useStateObject = initialState => {
  const [state, setState] = useReducer(reducer, initialState);
  return [state, setState];
};
