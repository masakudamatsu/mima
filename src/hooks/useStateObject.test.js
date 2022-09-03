import {renderHook, act} from '@testing-library/react-hooks';
import {useStateObject} from './useStateObject';

test('updates the specified state only', () => {
  const initialState = {
    status: 'idle',
    data: null,
  };
  const {result} = renderHook(() => useStateObject(initialState));

  const newStatus = 'loading';
  act(() => result.current[1]({status: newStatus}));
  expect(result.current[0]).toStrictEqual({
    status: newStatus,
    data: initialState.data,
  });

  const newData = {id: 0, name: 'data'};
  act(() => result.current[1]({data: newData}));
  expect(result.current[0]).toStrictEqual({status: newStatus, data: newData});
});
