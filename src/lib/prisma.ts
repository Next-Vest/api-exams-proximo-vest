import { PrismaClient } from "@prisma/client";
import { PrismaClient as EdgePrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const isAccelerate = process.env.DATABASE_URL?.startsWith("prisma://");

export const prisma = isAccelerate
  ? new EdgePrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
  : new PrismaClient();
