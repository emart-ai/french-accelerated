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
    if (!userId) return Response.json({ results: [] });

    const tab = request.nextUrl.searchParams.get("tab") ?? "clb5";
    const results = await prisma.quizResult.findMany({
      where: { userId, tab },
      orderBy: { takenAt: "desc" },
      take: 50,
    });
    return Response.json({ results });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ error: "No user" }, { status: 401 });

    const { tab, dayIndex, score, total } = await request.json();
    if (!tab || dayIndex == null || score == null || total == null) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await prisma.quizResult.create({
      data: {
        userId,
        tab,
        dayIndex,
        score,
        total,
        percentage: Math.round((score / total) * 100),
      },
    });
    return Response.json({ result });
  } catch {
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}
