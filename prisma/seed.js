const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const {
  mockPlace1,
  mockPlace2,
  mockPlace3,
  mockPlace4,
  mockPlace5,
  mockPlace6,
  mockPlace7,
  mockPlace8,
} = require('../test/utils/mockData');

async function main() {
  const place1 = await prisma.place.create({
    data: mockPlace1,
  });

  const place2 = await prisma.place.create({
    data: mockPlace2,
  });
  const place3 = await prisma.place.create({
    data: mockPlace3,
  });
  const place4 = await prisma.place.create({
    data: mockPlace4,
  });
  const place5 = await prisma.place.create({
    data: mockPlace5,
  });
  const place6 = await prisma.place.create({
    data: mockPlace6,
  });
  const place7 = await prisma.place.create({
    data: mockPlace7,
  });
  const place8 = await prisma.place.create({
    data: mockPlace8,
  });
  console.log([place1, place2, place3, place4, place5, place6, place7, place8]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
