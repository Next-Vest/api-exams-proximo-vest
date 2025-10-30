
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
     datasourceUrl: process.env.DATABASE_URL, // prisma+postgr
}).$extends(withAccelerate())


export { prisma };
