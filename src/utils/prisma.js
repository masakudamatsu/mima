// Adapted from: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
// to solve the issue described in https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem

import {PrismaClient} from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
}
// `stg` or `dev`
else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

module.exports = prisma;
