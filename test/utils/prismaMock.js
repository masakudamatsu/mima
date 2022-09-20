// adapted from https://github.com/OctobugDemo/nodejs-prisma-unit-test/blob/main/singleton.js

const {mockDeep, mockReset} = require('jest-mock-extended');

const prisma = require('src/utils/prisma');
const prismaMock = prisma;

jest.mock('src/utils/prisma', () => mockDeep());

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = {prismaMock};
