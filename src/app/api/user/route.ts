import { cookies } from "next/headers";
import { hasDatabase, prisma } from "@/lib/prisma";

const COOKIE_NAME = "tef-user-id";

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function getOrCreateUserId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME);

  if (existing?.value) {
    if (hasDatabase) {
      const user = await prisma.user.findUnique({ where: { id: existing.value } });
      if (user) return user.id;
    } else {
      return existing.value;
    }
  }

  let userId: string;
  if (hasDatabase) {
    const user = await prisma.user.create({ data: {} });
    userId = user.id;
  } else {
    userId = generateId();
  }

  cookieStore.set(COOKIE_NAME, userId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return userId;
}

export async function GET() {
  try {
    const userId = await getOrCreateUserId();
    return Response.json({ userId });
  } catch {
    return Response.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export { getOrCreateUserId };
