import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "tef-user-id";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ tasks: [] });

    const tab = request.nextUrl.searchParams.get("tab") ?? "clb5";
    const tasks = await prisma.progress.findMany({
      where: { userId, tab },
      select: { dayIndex: true, slot: true },
    });
    return Response.json({ tasks });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "No user" }, { status: 401 });

    const { dayIndex, slot, tab } = await request.json();
    if (dayIndex == null || !slot || !tab) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.progress.upsert({
      where: { userId_tab_dayIndex_slot: { userId, tab, dayIndex, slot } },
      update: {},
      create: { userId, tab, dayIndex, slot },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}
