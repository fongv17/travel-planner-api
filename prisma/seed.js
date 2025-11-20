import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

try {
  await prisma.user.deleteMany();

  const usersData = [
    {
      email: 'Brandon@demo.com',
      password: await bcrypt.hash('brandon1234', 10),
      role: 'ADMIN',
    },
    {
      email: 'Trevor@demo.com',
      password: await bcrypt.hash('Trevor456', 10),
    },
  ];

  for (const user of usersData ){
    prisma.user.create({ data: user }),
  };

  
  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
