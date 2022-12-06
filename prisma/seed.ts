import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing posts
  await prisma.post.deleteMany({});

  // Create 100 random posts
  await prisma.post.createMany({
    data: Array.from({ length: 100 }, () => ({
      title: faker.hacker.phrase(),
      createdAt: faker.date.recent(365),
    })),
  });

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
