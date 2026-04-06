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
    if (!userId) return Response.json({ currentIndex: 0 });

    const tab = request.nextUrl.searchParams.get("tab") ?? "clb5";
    const vocabDay = parseInt(request.nextUrl.searchParams.get("vocabDay") ?? "-1", 10);

    const pos = await prisma.flashcardPosition.findUnique({
      where: { userId_tab_vocabDay: { userId, tab, vocabDay } },
    });

    return Response.json({ currentIndex: pos?.currentIndex ?? 0 });
  } catch {
    return Response.json({ currentIndex: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "No user" }, { status: 401 });

    const { tab, vocabDay, currentIndex } = await request.json();
    if (tab == null || currentIndex == null) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.flashcardPosition.upsert({
      where: { userId_tab_vocabDay: { userId, tab, vocabDay: vocabDay ?? -1 } },
      update: { currentIndex },
      create: { userId, tab, vocabDay: vocabDay ?? -1, currentIndex },
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}
