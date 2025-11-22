import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

try {
  await prisma.user.deleteMany();

  const usersData = [
    
    {
      email: 'Trevor@demo.com',
      password: await bcrypt.hash('Trevor456', 10),
    },
  ];

  const users = await Promise.all(
    usersData.map((user) => prisma.user.create({ data: user })),
  );

 for (const user of users) {
    await prisma.post.createMany({
      data: [
        {
         name: "Tokyo Trip",
         startDate: "06-07-2026",
          endDate: "06-10-2026",
          userId: user.id,
        },
      ],
    });
  }
  
  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
