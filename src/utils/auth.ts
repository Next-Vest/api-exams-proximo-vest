import {prisma} from '../lib/prisma'

export type PermissionInput =
  | string
  | { resource: string; action: string }
  | { [resource: string]: string[] }; // ex: { exam: ["publish","read"] }

function normalizeToKeys(input: PermissionInput): string[] {
  if (typeof input === "string") return [input];
  if ("resource" in input) return [`${input.resource}.${input.action}`];
  // objeto { resource: [actions] }
  return Object.entries(input).flatMap(([res, actions]) =>
    (actions as string[]).map(a => `${res}.${a}`)
  );
}

export async function getEffectivePermissionKeys(userId: string): Promise<Set<string>> {
  const [rolePerms, directPerms] = await Promise.all([
    prisma.permission.findMany({
      where: {
        roles: {
          some: { role: { users: { some: { userId } }, isActive: true } },
        },
        isActive: true,
      },
      select: { key: true },
    }),
    prisma.permission.findMany({
      where: {
        users: { some: { userId, granted: true } },
        isActive: true,
      },
      select: { key: true },
    }),
  ]);
  return new Set([...rolePerms, ...directPerms].map(p => p.key));
}

export async function can(userId: string, required: PermissionInput): Promise<boolean> {
  const requiredKeys = normalizeToKeys(required);
  const have = await getEffectivePermissionKeys(userId);
  return requiredKeys.every(k => have.has(k));
}

export async function hasRole(userId: string, roleName: string): Promise<boolean> {
  const hit = await prisma.userRole.findFirst({
    where: { userId, role: { name: roleName, isActive: true } },
    select: { userId: true },
  });
  return !!hit;
}

