import { cookies } from "next/headers";
import { prisma } from "./prisma";

const COOKIE_NAME = "tef-user-id";

export async function getOrCreateUser(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME);

  if (existing?.value) {
    const user = await prisma.user.findUnique({
      where: { id: existing.value },
    });
    if (user) return user.id;
  }

  const user = await prisma.user.create({ data: {} });
  cookieStore.set(COOKIE_NAME, user.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return user.id;
}
