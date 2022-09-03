import cases from 'jest-in-case';

import {boldSubstring} from './boldSubstring';

cases(
  'returns the correct outputs:',
  options => {
    expect(boldSubstring(options.inputs)).toEqual(options.outputs);
  },
  {
    'First 2 characters': {
      inputs: {
        length: 2,
        offset: 0,
        string: 'string',
      },
      outputs: '<b>st</b>ring',
    },
    'Last 4 characters': {
      inputs: {
        length: 4,
        offset: 2,
        string: 'string',
      },
      outputs: 'st<b>ring</b>',
    },
    'Middle 3 characters': {
      inputs: {
        length: 3,
        offset: 2,
        string: 'string',
      },
      outputs: 'st<b>rin</b>g',
    },
    None: {
      inputs: {
        length: 0,
        offset: 0,
        string: 'string',
      },
      outputs: 'string',
    },
  },
);

cases(
  'returns an error with missing inputs',
  options => {
    expect(() => {
      boldSubstring(options.inputs);
    }).toThrow(options.outputs);
  },
  {
    'length missing': {
      inputs: {length: undefined, offset: 1, string: 'string'},
      outputs: 'The following argument for boldSubstring() is missing: length',
    },
    'offset missing': {
      inputs: {length: 3, offset: undefined, string: 'string'},
      outputs: 'The following argument for boldSubstring() is missing: offset',
    },
    'string missing': {
      inputs: {length: 3, offset: 1, string: undefined},
      outputs: 'The following argument for boldSubstring() is missing: string',
    },
    'length and offset missing': {
      inputs: {length: undefined, offset: undefined, string: 'string'},
      outputs:
        'The following arguments for boldSubstring() are missing: length, offset',
    },
    'length and string missing': {
      inputs: {length: undefined, offset: 1, string: undefined},
      outputs:
        'The following arguments for boldSubstring() are missing: length, string',
    },
    'offset and string missing': {
      inputs: {length: 3, offset: undefined, string: undefined},
      outputs:
        'The following arguments for boldSubstring() are missing: offset, string',
    },
    'all missing': {
      inputs: {length: undefined, offset: undefined, string: undefined},
      outputs:
        'The following arguments for boldSubstring() are missing: length, offset, string',
    },
  },
);

cases(
  'checks type of inputs',
  options => {
    expect(() => {
      boldSubstring(options.inputs);
    }).toThrow(options.outputs);
  },
  {
    'length is number': {
      inputs: {
        length: '3',
        offset: 2,
        string: 'string',
      },
      outputs: `Argument type of 'length' for boldSubstring() must be number, but string is provided`,
    },
    'offset is number': {
      inputs: {
        length: 3,
        offset: null,
        string: 'string',
      },
      outputs: `Argument type of 'offset' for boldSubstring() must be number, but null is provided`,
    },
    'string is string': {
      inputs: {
        length: 3,
        offset: 2,
        string: ['string'],
      },
      outputs: `Argument type of 'string' for boldSubstring() must be string, but array is provided`,
    },
    'both length and offset are wrong types': {
      inputs: {
        length: '3',
        offset: null,
        string: 'string',
      },
      outputs: `Argument type of 'length' for boldSubstring() must be number, but string is provided; Argument type of 'offset' for boldSubstring() must be number, but null is provided`,
    },
    'both length and string are wrong types': {
      inputs: {
        length: '3',
        offset: 1,
        string: ['string'],
      },
      outputs: `Argument type of 'length' for boldSubstring() must be number, but string is provided; Argument type of 'string' for boldSubstring() must be string, but array is provided`,
    },
    'both offset and string are wrong types': {
      inputs: {
        length: 3,
        offset: null,
        string: ['string'],
      },
      outputs: `Argument type of 'offset' for boldSubstring() must be number, but null is provided; Argument type of 'string' for boldSubstring() must be string, but array is provided`,
    },
    'all are wrong types': {
      inputs: {
        length: '3',
        offset: null,
        string: ['string'],
      },
      outputs: `Argument type of 'length' for boldSubstring() must be number, but string is provided; Argument type of 'offset' for boldSubstring() must be number, but null is provided; Argument type of 'string' for boldSubstring() must be string, but array is provided`,
    },
  },
);
