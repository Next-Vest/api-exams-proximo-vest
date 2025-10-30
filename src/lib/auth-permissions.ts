// src/auth/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
// Para manter as permissões padrão do Admin (banir, set-role, etc.)
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

/**
 * MERGE das permissões padrão do Admin com suas entidades
 * "as const" p/ types funcionarem
 */
export const statements = {
  ...defaultStatements,              // user/session: create|list|set-role|ban|impersonate|delete|set-password / session:list|revoke|delete
  project: ["create", "update", "delete", "share"],
  exam: ["create", "update", "publish", "delete"], // exemplo pro teu caso (vestibulares)
} as const;

const ac = createAccessControl(statements);

// Roles
export const role_user = ac.newRole({
  project: ["create"],
  exam: ["create"],
});

export const role_moderator = ac.newRole({
  project: ["create", "update"],
  exam: ["create", "update"],
});

export const role_admin = ac.newRole({
  // traz tb as permissões padrão de admin
  ...adminAc.statements,
  project: ["create", "update", "delete", "share"],
  exam: ["create", "update", "publish", "delete"],
});

// exporta o access controller
export { ac };
