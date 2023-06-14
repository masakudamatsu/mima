import cases from 'jest-in-case';

import {add14days} from './start-trial-period';

cases(
  'returns the correct outputs:',
  options => {
    expect(add14days(options.inputs)).toEqual(options.outputs);
  },
  {
    'Within the same month': {
      inputs: new Date(2023, 6, 14),
      outputs: new Date(2023, 6, 28),
    },
    'Next month': {
      inputs: new Date(2023, 7, 28), // August 28, 2023
      outputs: new Date(2023, 8, 11), // Sept 11, 2023
    },
    'Next year': {
      inputs: new Date(2023, 11, 20), // Dec 20 2023
      outputs: new Date(2024, 0, 3),
    },
  },
);

cases(
  'returns an error when the input is not a Date object',
  options => {
    expect(() => {
      add14days(options.inputs);
    }).toThrow(options.outputs);
  },
  {
    missing: {
      inputs: undefined,
      outputs: 'The input is missing. Provide a Date object.',
    },
    number: {
      inputs: 1686699076,
      outputs: 'The input must be a Date object, but you provided a number',
    },
    string: {
      inputs: '2023Jan13',
      outputs: 'The input must be a Date object, but you provided a string',
    },
  },
);
