import { PrismaClient } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

const prisma = new PrismaClient().$extends({
  name: "i18n",
  result: {
    post: {
      createdAt: {
        needs: { createdAt: true },
        compute(post) {
          return formatDistanceToNow(post.createdAt, { locale: de });
        },
      },
    },
  },
});

async function main() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
    },
    take: 5,
  });

  for (const post of posts) {
    console.info(`- ${post.title} (${post.createdAt})`);
  }
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
