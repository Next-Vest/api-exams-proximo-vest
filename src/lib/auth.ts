import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins"
import { ac, role_admin, role_user, role_moderator } from "./auth-permissions";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
      
        plugins: [
    admin({
      // Quando usa AC custom, você passa ac + roles:
      ac,
      roles: {
        admin: role_admin,
        user: role_user,
        moderator: role_moderator,
      },

      // opções úteis
      // defaultRole: "user",
      // adminUserIds: ["seeded-admin-user-id"], // sempre administrador
      // impersonationSessionDuration: 60 * 60 * 24, // 1 dia
    }),
  ],
 
});