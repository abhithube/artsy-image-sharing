import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    publicId: 'avatar_default',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622329733/avatar_default.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_man1',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234180/avatar_man1.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_man2',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234180/avatar_man2.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_man3',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234181/avatar_man3.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_man4',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234181/avatar_man4.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_woman1',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234180/avatar_woman1.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_woman2',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234181/avatar_woman2.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_woman3',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234180/avatar_woman3.png',
    width: 750,
    height: 750,
  },
  {
    publicId: 'avatar_woman4',
    url: 'https://res.cloudinary.com/hnisqhgvp/image/upload/v1622234181/avatar_woman4.png',
    width: 750,
    height: 750,
  },
];

const main = async () => {
  const requests = data.map((image) =>
    prisma.image.upsert({
      where: { publicId: image.publicId },
      update: {},
      create: image,
    })
  );

  await prisma.$transaction(requests);
};

main()
  .catch(() => process.exit(1))
  .finally(() => prisma.$disconnect());
