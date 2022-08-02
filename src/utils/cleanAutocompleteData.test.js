import cases from 'jest-in-case';

import {cleanAutocompleteData} from './cleanAutocompleteData';

cases(
  'cleanAutocompleteData() returns outputs as expected:',
  ({inputs, outputs}) => {
    expect(cleanAutocompleteData(inputs)).toEqual(outputs);
  },
  {
    'Bolded text perfectly matches input text': {
      inputs: {
        inputValue: 'fukuda',
        autocompleteText: 'Fukuda',
        length: 6,
        offset: 0,
      },
      outputs: {
        string: 'Fukuda',
        length: 6,
        offset: 0,
      },
    },
    'Bolded text does not include input text': {
      inputs: {
        inputValue: 'Fukuda Art',
        autocompleteText:
          '3-16 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto, Japan',
        length: 33,
        offset: 0,
      },
      outputs: {
        string: '3-16 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto, Japan',
        length: 0,
        offset: 0,
      },
    },
    'Bold text matches a character after space in the input': {
      inputs: {
        inputValue: 'Kyoto City H',
        autocompleteText: 'HOTEL SHE, KYOTO',
        length: 1,
        offset: 0,
      },
      outputs: {
        string: 'HOTEL SHE, KYOTO',
        length: 1,
        offset: 0,
      },
    },
    'Autocomplete text data is null': {
      inputs: {
        inputValue: 'Kyoto City H',
        autocompleteText: null,
        length: null,
        offset: null,
      },
      outputs: {
        string: null,
        length: null,
        offset: null,
      },
    },
  },
);

cases(
  'returns an error with an invalid input',
  ({inputs, outputs}) => {
    expect(() => {
      cleanAutocompleteData(inputs);
    }).toThrow(outputs);
  },
  {
    'inputValue is missing': {
      inputs: {
        inputValue: undefined,
        autocompleteText: 'Fukuda',
        length: 6,
        offset: 0,
      },
      outputs: 'cleanAutocompleteData() requires inputValue as its argument.',
    },
    'autocompleteText is missing': {
      inputs: {
        inputValue: 'fukuda',
        autocompleteText: undefined,
        length: 6,
        offset: 0,
      },
      outputs:
        'cleanAutocompleteData() requires autocompleteText as its argument.',
    },
    'length is missing': {
      inputs: {
        inputValue: 'fukuda',
        autocompleteText: 'Fukuda',
        length: undefined,
        offset: 0,
      },
      outputs: 'cleanAutocompleteData() requires length as its argument.',
    },
    'offset is missing': {
      inputs: {
        inputValue: 'fukuda',
        autocompleteText: 'Fukuda',
        length: 6,
        offset: undefined,
      },
      outputs: 'cleanAutocompleteData() requires offset as its argument.',
    },
  },
);
