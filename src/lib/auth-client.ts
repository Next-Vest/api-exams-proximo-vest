import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, role_admin, role_user, role_moderator } from "./auth-permissions";

export const authClient = createAuthClient({
    plugins: [
        adminClient({
            ac,
            roles: {
                admin: role_admin,
                user: role_user,
                moderator: role_moderator,
            },
        }),
    ],
})