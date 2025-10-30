import { auth } from '../lib/auth'

export async function requireUserIdFromRequest(req: Request): Promise<string> {
    const session = await auth.api.getSession({ headers: Object.fromEntries(req.headers) });
    if (!session?.user?.id) throw new Error("Unauthenticated");
    return session.user.id as string;
}
