export const boldSubstring = ({length, offset, string}) => {
  // sad path
  checkMissingArgs(length, offset, string);
  checkArgTypes(length, offset, string);
  // happy path
  if (length === 0 && offset === 0) {
    return string;
  }
  const substringToBold = string.substring(offset, offset + length);
  const stringBefore = string.substring(0, offset);
  const stringAfter = string.substring(offset + length);
  return `${stringBefore}<b>${substringToBold}</b>${stringAfter}`;
};

function checkMissingArgs(length, offset, string) {
  let missingArgs = [];
  if (length === undefined) {
    missingArgs.push('length');
  }
  if (offset === undefined) {
    missingArgs.push('offset');
  }
  if (string === undefined) {
    missingArgs.push('string');
  }
  if (missingArgs.length === 1) {
    throw new Error(
      `The following argument for boldSubstring() is missing: ${missingArgs.join(
        ', ',
      )}`,
    );
  } else if (missingArgs.length > 1) {
    throw new Error(
      `The following arguments for boldSubstring() are missing: ${missingArgs.join(
        ', ',
      )}`,
    );
  }
}

function checkArgTypes(length, offset, string) {
  const checkType = arg => {
    if (Array.isArray(arg)) {
      return 'array';
    } else if (arg === null) {
      return 'null';
    } else {
      return typeof arg;
    }
  };
  let errors = [];
  if (checkType(length) !== 'number') {
    errors.push(
      `Argument type of 'length' for boldSubstring() must be number, but ${checkType(
        length,
      )} is provided`,
    );
  }
  if (checkType(offset) !== 'number') {
    errors.push(
      `Argument type of 'offset' for boldSubstring() must be number, but ${checkType(
        offset,
      )} is provided`,
    );
  }
  if (checkType(string) !== 'string') {
    errors.push(
      `Argument type of 'string' for boldSubstring() must be string, but ${checkType(
        string,
      )} is provided`,
    );
  }
  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }
}
