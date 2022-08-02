export const cleanAutocompleteData = ({
  inputValue,
  autocompleteText,
  length,
  offset,
}) => {
  validateInput({
    inputValue,
    autocompleteText,
    length,
    offset,
  });
  // null
  if (autocompleteText === null && length === null && offset === null) {
    return {string: null, length: null, offset: null};
  }
  // otherwise...
  const textBolded = autocompleteText.substring(offset, offset + length);
  // perfect match
  const isMatched = textBolded.match(new RegExp(inputValue, 'i'));
  if (isMatched) {
    return {string: autocompleteText, length, offset};
  }
  // only some words match
  const inputWords = inputValue.split(' ');
  const matched = Array(inputWords.length);
  inputWords.forEach((inputWord, index) => {
    const isPartlyMatched = textBolded.match(new RegExp(inputWord, 'i'));
    matched[index] = isPartlyMatched ? true : false;
  });
  if (matched.filter(item => item === true).length > 0) {
    return {string: autocompleteText, length, offset};
  }
  return {string: autocompleteText, length: 0, offset: 0};
};

function validateInput({inputValue, autocompleteText, length, offset}) {
  if (inputValue === undefined) {
    throw new Error(
      'cleanAutocompleteData() requires inputValue as its argument.',
    );
  }
  if (autocompleteText === undefined) {
    throw new Error(
      'cleanAutocompleteData() requires autocompleteText as its argument.',
    );
  }
  if (length === undefined) {
    throw new Error('cleanAutocompleteData() requires length as its argument.');
  }
  if (offset === undefined) {
    throw new Error('cleanAutocompleteData() requires offset as its argument.');
  }
}
