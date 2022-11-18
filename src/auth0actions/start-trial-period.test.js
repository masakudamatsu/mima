import {addOneMonth} from './start-trial-period';

test('Days 1st to 28th', () => {
  const year = 2023;
  const month = 0; // January
  const day = 1;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, month + 1, day));
});

test('January 29th, 2023', () => {
  const year = 2023;
  const month = 0; // January
  const day = 29;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 1, 28)); // Feb 28, 2023
});

test('January 30th, 2023', () => {
  const year = 2023;
  const month = 0; // January
  const day = 30;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 1, 28)); // Feb 28, 2023
});

test('January 31st, 2023', () => {
  const year = 2023;
  const month = 0; // January
  const day = 31;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 1, 28)); // Feb 28, 2023
});

test('March 31st, 2023', () => {
  const year = 2023;
  const month = 2;
  const day = 31;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 3, 30)); // April 30, 2023
});

test('May 31st, 2023', () => {
  const year = 2023;
  const month = 4;
  const day = 31;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 5, 30)); // June 30, 2023
});

test('August 31st, 2023', () => {
  const year = 2023;
  const month = 7;
  const day = 31;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 8, 30)); // Sep 30, 2023
});

test('October 31st, 2023', () => {
  const year = 2023;
  const month = 9;
  const day = 31;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 10, 30)); // Nov 30, 2023
});

test('January 29th, 2024 (leap year)', () => {
  const year = 2024;
  const month = 0; // January
  const day = 29;
  const result = addOneMonth(new Date(year, month, day));
  expect(result).toEqual(new Date(year, 1, 29)); // Feb 28, 2024
});

// // Add 12 months to 29 Feb 2016 -> 28 Feb 2017
// console.log(addMonths(new Date(2016,1,29),12).toString());

// // Subtract 1 month from 1 Jan 2017 -> 1 Dec 2016
// console.log(addMonths(new Date(2017,0,1),-1).toString());

// // Subtract 2 months from 31 Jan 2017 -> 30 Nov 2016
// console.log(addMonths(new Date(2017,0,31),-2).toString());

// // Add 2 months to 31 Dec 2016 -> 28 Feb 2017
// console.log(addMonths(new Date(2016,11,31),2).toString());
