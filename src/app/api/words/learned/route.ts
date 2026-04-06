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
    if (!userId) return Response.json({ words: [] });

    const tab = request.nextUrl.searchParams.get("tab") ?? "clb5";
    const words = await prisma.learnedWord.findMany({
      where: { userId, tab },
      select: { word: true },
    });
    return Response.json({ words: words.map((w) => w.word) });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "No user" }, { status: 401 });

    const { word, tab } = await request.json();
    if (!word || !tab) return Response.json({ error: "Missing fields" }, { status: 400 });

    await prisma.learnedWord.upsert({
      where: { userId_word_tab: { userId, word, tab } },
      update: {},
      create: { userId, word, tab },
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "No user" }, { status: 401 });

    const { word, tab } = await request.json();
    if (!word || !tab) return Response.json({ error: "Missing fields" }, { status: 400 });

    await prisma.learnedWord.deleteMany({ where: { userId, word, tab } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
